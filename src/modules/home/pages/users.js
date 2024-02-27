import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toggleBorder as isBorder } from '../../../core/styles/debugging-border';
import { Box, Stack, Switch, Typography } from '@mui/material';
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

function UserTable() {
    const token = useSelector((state) => state.userSlice.token);
    const [block, setBlock] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const navigate = useNavigate();

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
    React.useEffect(() => {
        let getUsers = catchAsync(async () => {
            let res = await axios({
                method: httpMethod.get,
                url: apiRoute.getAllUsers,
                headers: {Authorization: `Bearer ${token}`},
            });
            res = res.data.data.users;
            setRows(res);
            setBlock(res.map(x => x.block));
        });
        getUsers();
    }, [token, navigate]);

    let changeBlockStatus = catchAsync(async (url) => {
        await axios({
            method: httpMethod.patch,
            url,
            headers: {Authorization: `Bearer ${token}`},
        });
    });

    function handleBlock(node, index) {
        let blockArray = [...block];
        blockArray[index] = !blockArray[index]
        setBlock(blockArray);
        // block or unblock the user
        if (blockArray[index]) {
            changeBlockStatus(apiRoute.blockUser+`/${node._id}`);
        } else {
            changeBlockStatus(apiRoute.unblockUser+`/${node._id}`);
        }
    }
    return(
        <React.Fragment>
            {
                rows.length > 0 &&
                <TableContainer component={Paper} sx={{backgroundColor: '#fafafb'}}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>User</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="center">Block</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((node, index) => (
                            <TableRow
                                key={node._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {getUserAvatar({_id: node._id, name: node.name, media: node.media})}
                                </TableCell>
                                <TableCell align="left">
                                    {node.email}
                                </TableCell>
                                <TableCell align="left">{(new Date(node.dateCreated)).toLocaleDateString("en-US")}</TableCell>
                                <TableCell align="center"> 
                                    <Switch
                                    checked={block[index]}
                                    onChange={() => handleBlock(node, index)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                  />
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </React.Fragment>
    )
}

export default function Users() {
  return (
    <Box sx={{border: isBorder ? '1px solid red' : 'none', maxWidth: '850px', width: '100%', paddingY: 2, paddingX: 1}}>
        <Typography variant="h6" sx={{mb: 4}}>Admin Panel</Typography>
        <OrderBox>
            <UserTable/>
        </OrderBox>
    </Box>
  );
}
