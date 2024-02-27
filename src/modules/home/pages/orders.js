import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toggleBorder as isBorder } from '../../../core/styles/debugging-border';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { catchAsync } from '../../../core/utils/catchAsync';
import { httpMethod, apiRoute } from '../../../core/constants/constants';
import { useSelector } from 'react-redux';
import { api as axios } from '../../../core/utils/interceptor';

const OrderBox = styled(Box)(({ theme }) => ({
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
        maxWidth: 850,
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 740,
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
    },
}));

function OrderTable() {
    const token = useSelector((state) => state.userSlice.token);
    const [rows, setRows] = React.useState([]);
    const navigate = useNavigate();
    function createData(product, customer, amount, date, quantity, id) {
        return { product, customer, amount, date, quantity, id };
    }
    React.useEffect(() => {
        const getUserAvatar = (user) => {
            const onClickHandler = () => navigate(`/home/profile/${user._id}`);
            let media = user.media ? 
            <Box component="img" sx={{objectFit: 'cover', height: 30, width: 30, borderRadius: 10}} src={user.media}/>:
            <Avatar sx={{ height: 30, width: 30, fontSize: 'small' }} aria-label="img">{user.name ? user.name.charAt(0).toUpperCase(): ''}</Avatar>;
            return <Stack onClick={() => onClickHandler()} direction='row' alignItems='center' spacing={2} sx={{cursor: 'pointer'}}>
                {media}
                <Typography>{user.name}</Typography>
            </Stack>
        }
        let getSellerOrder = catchAsync(async () => {
            let res = await axios({
                method: httpMethod.get,
                url: apiRoute.sellerOrder,
                headers: {Authorization: `Bearer ${token}`},
            });
            res = res.data.data.order;
            let data = [];
            res.forEach(node => {
                data.push(
                    createData(
                        <Typography onClick={() => navigate(`/home/marketplace/item/${node.product._id}`)} sx={{cursor: 'pointer'}} >{node.product.name}</Typography>, 
                        getUserAvatar({_id: node.buyer._id, name: node.buyer.name, media: node.buyer.media}),
                        node.price*node.quantity,
                        (new Date(node.dateCreated)).toLocaleDateString("en-US"),
                        node.quantity,
                        node._id
                    )
                );
            });
            setRows(data);
        });
        getSellerOrder();
    }, [token, navigate]);
    return(
        <React.Fragment>
            {
                rows.length > 0 &&
                <TableContainer component={Paper} sx={{backgroundColor: '#fafafb'}}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Product/Service Name</TableCell>
                            <TableCell align="left">Customer</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Net Amount</TableCell>
                            <TableCell align="center">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.product}
                                </TableCell>
                                <TableCell align="left">{row.customer}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="right">${row.amount}</TableCell>
                                <TableCell align="center">${row.amount*.95}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </React.Fragment>
    )
}

export default function Orders() {
  return (
    <Box sx={{border: isBorder ? '1px solid red' : 'none', maxWidth: '850px', width: '100%', paddingY: 2, paddingX: 1}}>
        <Typography variant="h6" sx={{mb: 4}}>Orders Received</Typography>
        <OrderBox>
            <OrderTable/>
        </OrderBox>
    </Box>
  );
}
