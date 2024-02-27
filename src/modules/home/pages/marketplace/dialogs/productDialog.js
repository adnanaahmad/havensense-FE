import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { InputAdornment, TextField } from '@mui/material';
import { Stack, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { api as axios } from '../../../../../core/utils/interceptor';
import { apiRoute, httpMethod, productCategory } from '../../../../../core/constants/constants';
import { catchAsync } from '../../../../../core/utils/catchAsync';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { modalAction as modalType } from '../../../../../core/constants/constants'; 
import { Select, MenuItem } from '@mui/material';
import {createProduct, updateProduct} from '../../../slice/marketplaceSlice';

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
};
  
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Input = styled('input')({
    display: 'none',
});

const ProductDialog = React.forwardRef((props, ref) => {
    // modal
    const [open, setOpen] = React.useState(false);
    const scroll = 'body';

    // backdrop
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const dispatch = useDispatch();
    const [uploadFile, setUploadFile] = React.useState(null);
    const [s3File, setS3File] = React.useState(null);
    const token = useSelector((state) => state.userSlice.token);
    const user = useSelector((state) => state.userSlice.user);
    const [action, setAction] = React.useState(null);
    const [product, setProduct] = React.useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
            category: ''
        },
        onSubmit: (form) => {
            form['media'] = s3File;
            action === modalType.create ? addProduct(form) : editProduct(form);
        },
    });

    React.useImperativeHandle(ref, () => ({
        handleClickOpen (modalAction, product=null) {
            setOpen(true);
            if(modalAction === modalType.create) {
                setAction(modalType.create);
            } else {
                setAction(modalType.edit);
                setProduct(product);
                setS3File(product.media);   
                formik.setFieldValue('name', product.name);
                formik.setFieldValue('description', product.description);
                formik.setFieldValue('price', product.price);
                formik.setFieldValue('category', product.category);
            }
        }
    }));

    const handleClose = () => {
        setOpen(false);
    };

    const addProduct = catchAsync(async (form) => {
        const res = await axios({
            method: httpMethod.post,
            url: apiRoute.marketplace,
            headers: {Authorization: `Bearer ${token}`},
            data: form
        });
        dispatch(createProduct({product: {...res.data.data.product, user}}));
        handleClose();
    });

    const editProduct = catchAsync(async (form) => {
        const res = await axios({
            method: httpMethod.patch,
            url: apiRoute.marketplace+`/${product._id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: form
        });
        dispatch(updateProduct({product: {...res.data.data.product, user}}));
        handleClose();
    });

    // On file select (from the pop up)
    const onFileChange = event => {
        // Update the state
        setUploadFile(event.target.files[0]);
    };

    const removeMedia = () => {
        setS3File(null);
    }


    React.useEffect(() => {
        let uploadFiletoS3 = catchAsync(async (url) => {
            const res = await fetch(url, {
                method: httpMethod.put,
                headers: {
                  "Content-Type": "multipart/form-data"
                },
                body: uploadFile
            });
            const fileUrl = res.url.split('?')[0];
            setS3File(fileUrl);
            setOpenBackdrop(false);
        });
        let getSignedUrl = catchAsync(async () => {
            const res = await axios({
                method: httpMethod.get,
                url: apiRoute.s3Url,
                headers: {Authorization: `Bearer ${token}`},
            });
            //console.log('url , ', res.data.data);
            uploadFiletoS3(res.data.data);
        });
        if(uploadFile) {
            setOpenBackdrop(true);
            getSignedUrl();
        }    
    }, [uploadFile, token]);

    return (
        <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        >
            <BootstrapDialogTitle id="product-dialog-title" onClose={handleClose}>
            Sell Product
            </BootstrapDialogTitle>
            <DialogContent>
                {
                    s3File &&
                    <Box sx={{position:'relative', minHeight: 200}}>
                        <Box component='img' sx={{objectFit: 'cover', height: '100%', width: '100%', maxWidth: '600px'}} src={s3File}/>
                        <Box>
                            <Box sx={{position: 'absolute', right: '5%', top: '5%', width: 107, height: 36, background: 'white', opacity: .5, borderRadius: 1}}></Box>                    
                            <Button color='error' onClick={removeMedia} variant="outlined" startIcon={<DeleteIcon />} sx={{position: 'absolute', right: '5%', top: '5%'}}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                }
                {
                    !s3File &&
                    <Card sx={{ maxWidth: '600px', mb:3}} variant='outlined'>
                        <CardActionArea>
                            <label htmlFor="product-media" onChange={onFileChange}>
                                <CardContent sx={{height: 200, p:0, cursor: 'pointer'}}>
                                    <Stack sx={{height: '100%', p:2}} justifyContent={'center'} alignItems={'center'} spacing={2}>
                                        <Input accept="image/*" id="product-media" type="file"/>
                                        <ImageOutlinedIcon fontSize='large' sx={{color: '#666666'}}/>
                                        <Typography color='text.secondary'>Browse image on your device</Typography>
                                    </Stack>
                                </CardContent>
                            </label>
                        </CardActionArea>
                    </Card>
                }
                <TextField
                autoFocus
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                fullWidth
                variant="standard"
                sx={{mb:3}}
                />
                <TextField
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                fullWidth
                variant="standard"
                multiline
                rows={4}
                sx={{mb:3}}
                />
                <FormControl variant="standard" fullWidth sx={{ mb: 3}}>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                    labelId="category-label"
                    name='category'
                    id='category'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    label="Category"
                    >
                    <MenuItem value={productCategory.product}>Product</MenuItem>
                    <MenuItem value={productCategory.service}>Service</MenuItem>
                    <MenuItem value={productCategory.digital}>NFT, Digital Collectible</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                autoFocus
                id="price"
                name="price"
                label="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                fullWidth
                variant="standard"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={formik.handleSubmit}>Save</Button>
            </DialogActions>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
})
export default ProductDialog;