import * as React from 'react';
import { Box, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { api as axios } from "../../../../../core/utils/interceptor";
import { apiRoute, httpMethod } from "../../../../../core/constants/constants";
import { catchAsync } from "../../../../../core/utils/catchAsync";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { updateProduct } from '../../../slice/marketplaceSlice';
import ProductDialog from '../dialogs/productDialog';
import { addToCart } from '../../../slice/cartSlice';

export default function Item() {
    const [item, setItem] = React.useState(null);
    const [userType, setUserType] = React.useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dialogRef = React.useRef();
    const { id } = useParams();
    const token = useSelector((state) => state.userSlice.token);
    const user = useSelector((state) => state.userSlice.user);
    const marketplace = useSelector((state) => state.marketplaceSlice.marketplace);

    const deleteItem = catchAsync(async () => {
        let res = await axios({
            method: httpMethod.delete,
            url: apiRoute.marketplace+`/${id}`,
            headers: {Authorization: `Bearer ${token}`},
        });
        //dispatch(deleteProduct({id}));
        dispatch(updateProduct({product: {...res.data.data.product, user}}));
        navigate(-1);
    });

    function editProduct() {
        dialogRef.current.handleClickOpen('edit', item);
    }

    function addItemToCart() {
        addItemToCartApi();
    }

    let addItemToCartApi = catchAsync(async (product) => {
        const res = await axios({
            method: httpMethod.post,
            url: apiRoute.cart+`/${id}`,
            headers: {Authorization: `Bearer ${token}`},
        });
        dispatch(addToCart({item: {...res.data.data.product, product: item}}));
    });

    React.useMemo(() => 
    (() => {
        setItem(marketplace.find(x => x._id === id));
    })(), [marketplace, id]);

    React.useMemo(() => 
    (() => {
        if (!item) return;
        if (user && Object.keys(user).length === 0) return;

        if (item.user._id === user._id) {
            setUserType('seller');
        } else if (item.user._id !== user._id) {
            setUserType('buyer');
        }
    })(), [user, item]);

    return(
        <Box sx={{width: '100%', paddingX:1}}>
            <Button sx={{mb: 2}} variant="text" onClick={() => navigate(-1)} startIcon={<KeyboardBackspaceOutlinedIcon />}>Back</Button>
            {
                item && Object.keys(item).length !== 0 &&
                <Stack sx={{mb: 4}}>
                    <Box component="img" sx={{objectFit: 'cover', width: '100%', borderRadius: '10px', mb:1}} src={item.media}/>
                    <Typography variant='h5' color='primary' fontWeight={500} sx={{mb:4}}>USD {item.price}</Typography>
                    <Typography color='primary' variant='subtitle2'>Name</Typography>
                    <Typography variant='h5' fontWeight={500} sx={{mb:4}}>{item.name}</Typography>
                    <Typography color='primary' variant='subtitle2'>Description</Typography>
                    <Typography variant='body2' fontWeight={500}>{item.description}</Typography>
                </Stack>
            }
            {
                item && !item.removed &&
                <React.Fragment>
                    {
                        userType === 'seller' &&
                        <Stack spacing={2} direction={'row'}>
                            <Button onClick={() => editProduct()} variant="contained" sx={{color: 'white'}} size='small'>Edit</Button>
                            <Button onClick={() => deleteItem()} variant="contained" sx={{color: 'white'}} size='small'>Remove</Button>
                        </Stack>
                    }
                    {
                        userType === 'buyer' &&
                        <Button onClick={() => addItemToCart()}  variant="contained" sx={{color: 'white'}} size='small'>Buy Now</Button>
                    }
                </React.Fragment>
            }
            <ProductDialog ref={dialogRef}/>
        </Box>
    )
}