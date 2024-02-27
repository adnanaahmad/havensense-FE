import React from 'react';
import { Box, Stack } from "@mui/material";
import PostCard from "../../../shared/components/postComponent/postComponent";
import CreatePost from "../../../shared/components/createPostButton/createPostButton";
import PostModalComponent from '../../../shared/components/postModal/postModal';
import { toggleBorder as isBorder } from "../../../core/styles/debugging-border";
import { api as axios } from '../../../core/utils/interceptor';
import { apiRoute, httpMethod } from '../../../core/constants/constants';
import { catchAsync } from '../../../core/utils/catchAsync';
import { useSelector } from 'react-redux';
import { updateNewsFeed } from '../slice/playByPlaySlice';
import { useDispatch } from 'react-redux';
import { modalAction } from '../../../core/constants/constants';

export default function PlayByPlay() {
    const dialogRef = React.useRef();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userSlice.token);
    const newsFeed = useSelector((state) => state.playByPlaySlice.newsFeed);
    function createPost() {
        dialogRef.current.handleClickOpen(modalAction.create);
    }

    React.useEffect(() => {
        let getNewsFeed = catchAsync(async () => {
            const res = await axios({
                method: httpMethod.get,
                url: apiRoute.newsFeed,
                headers: {Authorization: `Bearer ${token}`},
            });
            dispatch(updateNewsFeed({newsFeed: res.data.data.post}));
        });
        getNewsFeed();
    }, [token, dispatch]);

    return (
        <Box sx={{border: isBorder ? '1px solid red' : 'none', maxWidth: '600px', width: '100%', paddingX:1, paddingY: 2, mb:4}}>
            <Stack spacing={3}>
                <CreatePost createPost={createPost}/>
                {
                    newsFeed.map((node, index) => (
                        <PostCard key={index} data={node} maxWidth={600}/>
                    ))
                }
            </Stack>
            <PostModalComponent ref={dialogRef}/>
        </Box>
    )
}