import React from 'react';
import { Box, Stack } from "@mui/material";
import PostCard from "../../../../../shared/components/postComponent/postComponent";
import CreatePost from "../../../../../shared/components/createPostButton/createPostButton";
import PostModalComponent from '../../../../../shared/components/postModal/postModal';
import { toggleBorder as isBorder } from "../../../../../core/styles/debugging-border";
import { useSelector } from 'react-redux';
import { modalAction } from '../../../../../core/constants/constants';

export default function UserPosts() {
    const dialogRef = React.useRef();
    const userPosts = useSelector((state) => state.profileSlice.posts);
    function createPost() {
        dialogRef.current.handleClickOpen(modalAction.create);
    }
    return (
        <Box sx={{border: isBorder ? '1px solid red' : 'none', width: '100%'}}>
            <Stack spacing={3}>
                <CreatePost createPost={createPost}/>
                {
                    userPosts.map((node, index) => (
                        <Box key={index} sx={{pl: .5, pr: .5}}>
                            <PostCard data={node} maxWidth={700}/>
                        </Box>
                    ))
                }
            </Stack>
            <PostModalComponent ref={dialogRef}/>
        </Box>
    )
}