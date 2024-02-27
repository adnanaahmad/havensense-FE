import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Grow, Stack, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { titleCase } from '../../../core/utils/titleCase';
import { addToCart, removeFromCart, removeOneFromCart } from '../slice/cartSlice';
import { catchAsync } from '../../../core/utils/catchAsync';
import { httpMethod, apiRoute, stripePublicKey } from '../../../core/constants/constants';
import { api as axios } from '../../../core/utils/interceptor';
const stripe = window.Stripe(stripePublicKey);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

const CartDialog = React.forwardRef((props, ref) => {
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down('md'));
    const matchesMobileSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const token = useSelector((state) => state.userSlice.token);
    const cart = useSelector((state) => state.cartSlice.cart);
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    React.useImperativeHandle(ref, () => ({
        handleClickOpen () {
            setOpen(true);
        }
    }));

    const boxStyleOne = {
        background: '#F8FBFF',
        width: '100%', 
        height: '100%',
        paddingY: 4,
        paddingX: matchesMobileSmall ? 1 : 4,
        overflowY: 'auto'
    }

    const addItemToCart = (product) => {
        dispatch(addToCart({item: product}));
        addItemToCartApi(product.product);
    }

    const removeOneItemFromCart = (product) => {
        dispatch(removeOneFromCart({product}));
        removeItemFromCartApi(product, false);
    }

    const removeItemFromCart = (product) => {
        dispatch(removeFromCart({product}));
        removeItemFromCartApi(product, true);
    }

    let addItemToCartApi = catchAsync(async (product) => {
        await axios({
            method: httpMethod.post,
            url: apiRoute.cart+`/${product._id}`,
            headers: {Authorization: `Bearer ${token}`},
        });
    });

    let removeItemFromCartApi = catchAsync(async (product, remove=false) => {
        await axios({
            method: httpMethod.delete,
            url: remove ? apiRoute.cart+`/${product._id}/true` : apiRoute.cart+`/${product._id}`,
            headers: {Authorization: `Bearer ${token}`},
        });
    });

    let getCheckoutSession = catchAsync(async (data) => {
        const res = await axios({
            method: httpMethod.get,
            url: apiRoute.cartPayment,
            headers: {Authorization: `Bearer ${token}`},
        });
        //console.log(res.data.data);
        //handleClose();
        stripe.redirectToCheckout({
          sessionId: res.data.data.id
        });
      });

  return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Stack direction={matchesMobile ? 'column' : 'row'} width='100%' height='100%'>
            <Box sx={{...boxStyleOne}}>
                <Button sx={{mb: 1}} variant="text" onClick={() => handleClose()} startIcon={<KeyboardBackspaceOutlinedIcon />}>Back</Button>
                <Stack spacing={3}>
                    <Stack direction={'row'} justifyContent='space-between'>
                        <Typography color='text.primary' variant='h5' fontWeight={500}>Shopping Cart</Typography>
                        <Typography color='text.primary' variant='h5' fontWeight={500}>{cart.length} Item{cart.length > 1 ? 's' : ''}</Typography>
                    </Stack>
                    <Divider/>
                    <Grid container spacing={0}>
                        <Grid item xs={5}>
                            <Box>
                                <Typography variant='subtitle2'>Product Details</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box>
                                <Typography variant='subtitle2' textAlign='center'>Quantity</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box>
                                <Typography variant='subtitle2' textAlign='center'>Price</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        {
                            cart.map((node, index) => (
                              <React.Fragment key={index}>
                                <Grid item xs={5} sx={{mb:2}}>
                                    <Stack direction={matchesMobileSmall ? 'column' : 'row'} spacing={2}>
                                        <Box sx={{width: 100, height: 100, objectFit: 'cover', borderRadius: 5}} component='img' src={node.product.media}/>
                                        <Stack>
                                            <Typography variant='body1' fontWeight={500}>{titleCase(node.product.name)}</Typography>
                                            <Typography variant='caption' color='primary'>{titleCase(node.product.category)}</Typography>
                                            <Typography onClick={() => removeItemFromCart(node.product)} variant='caption' color='text.secondary' sx={{mt: 'auto', cursor: 'pointer'}}>
                                                Remove
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={4} sx={{mb:2}}>
                                    <Stack direction={'row'} alignItems='center' justifyContent={'center'} spacing={.5}>
                                        <IconButton aria-label="remove" component="span" onClick={() => removeOneItemFromCart(node.product)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Box sx={{border: '1px solid #c7c8cf', height: 'fit-content', padding: '2px 10px'}}>
                                            <Typography>{node.quantity}</Typography>
                                        </Box>
                                        <IconButton aria-label="add" component="span" onClick={() => addItemToCart(node)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Stack>
                                </Grid>
                                <Grid item xs={3} sx={{mb:2}}>
                                    <Box>
                                        <Typography variant='subtitle2' textAlign='center'>${node.product.price*node.quantity}</Typography>
                                    </Box>
                                </Grid>
                              </React.Fragment>  
                            ))
                        }
                    </Grid>
                    {
                        cart.length > 0 &&
                        <Button onClick={() => getCheckoutSession()} variant="contained" sx={{borderRadius: 10, width: 'fit-content', color: 'white', alignSelf: 'end'}}>
                            Proceed
                        </Button>
                    }
                </Stack>
            </Box>
        </Stack>
      </Dialog>
  );
})

export default CartDialog;