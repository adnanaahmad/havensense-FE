import * as React from 'react';
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { orange } from '@mui/material/colors';
import { toggleBorder as isBorder } from "../../../../../core/styles/debugging-border";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import {titleCase} from '../../../../../core/utils/titleCase';
import { api as axios } from '../../../../../core/utils/interceptor';
import { httpMethod, apiRoute } from '../../../../../core/constants/constants';
import { catchAsync } from '../../../../../core/utils/catchAsync';
import { setUserDetails } from '../../../../auth/slice/userSlice';
import { updateUser } from '../../../slice/profileSlice';
import { useNavigate } from 'react-router-dom';

export default function Followers() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [removeBool, setRemoveBool] = React.useState(false);
    const token = useSelector((state) => state.userSlice.token);
    const user = useSelector((state) => state.profileSlice.user);
    const loggedInUser = useSelector((state) => state.userSlice.user);
    const dispatch = useDispatch();
    const removeFollower = catchAsync(async (id) => {
        const res = await axios({
            method: httpMethod.delete,
            url: apiRoute.follower + `/${id}`,
            headers: {Authorization: `Bearer ${token}`},
        });
        // update profile page
        dispatch(updateUser({user: res.data.data.user}));
        // update loggedin user
        dispatch(setUserDetails({user: res.data.data.user}));
    });
    const getUserAvatar = (user, color, height, width, borderRadius, fontSize) => {
        const onClickHandler = () => navigate(`/home/profile/${user._id}`);
        return user.media ? 
        <Box onClick={() => onClickHandler()} component="img" sx={{objectFit: 'cover', height, width, borderRadius, cursor: 'pointer'}} src={user.media}/>:
        <Avatar onClick={() => onClickHandler()} sx={{ bgcolor: color[500], height, width, cursor: 'pointer', fontSize }} aria-label="img">{user.name ? user.name.charAt(0).toUpperCase() : ''}</Avatar>
    }
    React.useEffect(() => {
        // show remove button if a user has opened his own profile
        id === loggedInUser._id ? setRemoveBool(true) : setRemoveBool(false);
    },[id, loggedInUser._id]);
    return(
        <Box sx={{border: isBorder ? '1px solid red' : 'none', width: '100%'}}>
            <Stack spacing={2}>
                {
                    user.followers.map((node, index) => (
                        <Stack key={index} direction='row' justifyContent='space-between'>
                            <Stack direction='row' spacing={2} alignItems='center'>
                                {getUserAvatar(node, orange, 38, 38, 20)}
                                <Stack>
                                    <Typography variant='body2' fontWeight={500}>{node.name ? titleCase(node.name) : node.name}</Typography>
                                    <Typography color='text.secondary' variant='body2'>{node.email}</Typography>
                                </Stack>                              
                            </Stack>
                            {
                                removeBool &&
                                <IconButton fontSize='small' onClick={() => removeFollower(node._id)}>
                                    <DeleteOutlineOutlinedIcon/>
                                </IconButton>
                            }
                        </Stack>
                    ))
                }
            </Stack>
        </Box>
    )
}