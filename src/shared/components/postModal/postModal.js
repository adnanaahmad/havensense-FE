import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { Avatar, Grow, TextField } from '@mui/material';
import { Stack, Box } from '@mui/material';
import { toggleBorder as isBorder } from '../../../core/styles/debugging-border';
import VideoIcon from '../../../assets/video.svg';
import { red } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { api as axios } from '../../../core/utils/interceptor';
import { apiRoute, httpMethod } from '../../../core/constants/constants';
import { catchAsync } from '../../../core/utils/catchAsync';
import { useSelector, useDispatch } from 'react-redux';
import { createPost as createUserPost, updatePost as updateUserPost } from '../../../modules/home/slice/profileSlice';
import { createPost as createNewsFeedPost, updatePost } from '../../../modules/home/slice/playByPlaySlice';
import {titleCase} from '../../../core/utils/titleCase';
import { modalAction as modalType } from '../../../core/constants/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import PostCard from '../postComponent/postComponent';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});
const Input = styled('input')({
    display: 'none',
});

const PostModalComponent = React.forwardRef((props, ref) => {
    // modal
    const [open, setOpen] = React.useState(false);
    // backdrop
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const dispatch = useDispatch();
    const [uploadFile, setUploadFile] = React.useState(null);
    const [s3File, setS3File] = React.useState(null);
    const token = useSelector((state) => state.userSlice.token);
    const user = useSelector((state) => state.userSlice.user);
    const theme = useTheme();
    const matchesMobile = useMediaQuery(theme.breakpoints.down('md'));
    const matchesMobileSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [action, setAction] = React.useState(null);
    const [post, setPost] = React.useState(null);

    const formik = useFormik({
        initialValues: {
            description: '',
        },
        onSubmit: (form) => {
            form['media'] = s3File;
            action === modalType.create ? createPost(form) : editPost(form);
        },
    });

    React.useImperativeHandle(ref, () => ({
        handleClickOpen(modalAction, post = null) {
            // initialize
            formik.setFieldValue('description', '');
            setPost(null);
            setS3File(null);
            setUploadFile(null);
            setOpen(true);
            switch (modalAction) {
                case modalType.create:
                    setAction(modalType.create);
                    break;
                case modalType.edit:
                    setAction(modalType.edit);
                    setPost(post);
                    formik.setFieldValue('description', post.description);
                    setS3File(post.media);                   
                    break;
                default:
                    setAction(modalType.view);
                    setPost(post);
                    setS3File(post.media);
            }
        }
    }));

    const handleClose = () => {
        setOpen(false);
    };

    // On file select (from the pop up)
    const onFileChange = event => {
        // Update the state
        setUploadFile(event.target.files[0]);
    };

    const createPost = catchAsync(async (form) => {
        const res = await axios({
            method: httpMethod.post,
            url: apiRoute.post,
            headers: {Authorization: `Bearer ${token}`},
            data: form
        });
        dispatch(createNewsFeedPost({post: {...res.data.data.post, user}}));
        dispatch(createUserPost({post: {...res.data.data.post, user}}));
        handleClose();
    });

    const editPost = catchAsync(async (form) => {
        const res = await axios({
            method: httpMethod.patch,
            url: apiRoute.post+`/${post._id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: form
        });
        dispatch(updatePost({post: {...res.data.data.post, user}}));
        dispatch(updateUserPost({post: {...res.data.data.post, user}}));
        handleClose();
    });

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
            // check video is than 60 sec
            const inputVideo = uploadFile;
            const video = document.createElement('video');
            video.src   = window.URL.createObjectURL(inputVideo);
            video.preload = 'metadata';
            video.onloadedmetadata =  ()=> {
              if (video.duration < 61) {
                setOpenBackdrop(true);
                getSignedUrl();
              } else {
                alert('videos length should be less than 1 minute');
              }
            }
        }    
    }, [uploadFile, token]);

    return (
        <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }} color='transparent' elevation={0} variant='outlined'>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color='default'
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ml: 1, flex: 1 }} variant="h6" component="div" textAlign='center'>
                        {action === modalType.create ? 'Create New ' : titleCase(action)} Post
                    </Typography>
                    {
                        action !== modalType.view &&
                        <Button autoFocus color='primary' onClick={formik.handleSubmit}>
                            Post
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            {/* Dialog content */}
            <Stack direction={matchesMobile ? 'column' : 'row'} alignItems="stretch" height='100%'>
                {/* media attachment */}
                <Box sx={{border: isBorder ? '1px solid red' : 'none', width: matchesMobile ? '100%' : '50%', background: '#F8FBFF', height: matchesMobile ? '50%' : '100%', position: 'relative'}}>
                    {
                        s3File &&
                        <React.Fragment>
                            <Box component='video' sx={{objectFit: 'cover', height: '100%', width: '100%'}} src={s3File} autoPlay controls/>
                            {
                                action !== modalType.view &&
                                <React.Fragment>
                                    <Box sx={{position: 'absolute', right: matchesMobileSmall ? '35%' : '45%', top: '50%', width: 107, height: 36, background: 'white', opacity: .5, borderRadius: 1}}></Box>                    
                                    <Button color='error' onClick={removeMedia} variant="outlined" startIcon={<DeleteIcon />} sx={{position: 'absolute', right:  matchesMobileSmall ? '35%' : '45%', top: '50%'}}>
                                        Delete
                                    </Button>
                                </React.Fragment>
                            }
                        </React.Fragment>
                    }
                    {
                        !s3File &&
                        <React.Fragment>
                            {
                                action !== modalType.view &&
                                <Stack justifyContent='center' alignItems='center' height='100%'>
                                    <label htmlFor="contained-button-file">
                                        <Input accept="video/mp4,video/x-m4v,video/*" id="contained-button-file" multiple type="file" onChange={onFileChange} />
                                        <Stack spacing={2} alignItems='center' sx={{cursor: 'pointer'}}>
                                            <Box component="img" sx={{objectFit: 'cover', height: '66px', width: '85px'}} src={VideoIcon}/>
                                            <Typography sx={{textDecoration: 'underline'}}>Add a video clip of 60 seconds or less</Typography>
                                        </Stack>
                                    </label>
                                </Stack>
                            }
                        </React.Fragment>
                    }
                </Box>
                {/* description */}
                <Stack spacing={4} sx={{border: isBorder ? '1px solid orange' : 'none', width: matchesMobile ? '100%' : '50%', p: action === modalType.view && matchesMobileSmall ? 1 :  5, height: matchesMobile ? '50%' : '100%'}} >
                    {

                        action !== modalType.view &&
                        <React.Fragment>
                            <Stack direction='row' spacing={2} alignItems='center'>
                                <Avatar sx={{ bgcolor: red[500], width: 32, height: 32, fontSize: 18 }}>{user.name ? user.name.charAt(0).toUpperCase() : ''}</Avatar>
                                <Stack>
                                    <Typography variant="body2" color="text.primary" fontWeight={500}>{user.name ? titleCase(user.name) : ''}</Typography>
                                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                                </Stack>
                            </Stack>
                        
                            <TextField
                            id="description"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            type="text"
                            placeholder="Write a caption..." 
                            multiline
                            variant="standard"
                            />

                        </React.Fragment>
                    }
                    {
                        action === modalType.view &&
                        <PostCard modal={true} maxWidth={'100%'} data={post}/>
                    }
                </Stack>
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Dialog>
    );
})
export default PostModalComponent;