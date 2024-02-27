import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
//import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Divider, Stack } from '@mui/material';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { titleCase } from '../../../core/utils/titleCase';
import InputAdornment from '@mui/material/InputAdornment';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { api as axios } from '../../../core/utils/interceptor';
import { apiRoute, httpMethod } from '../../../core/constants/constants';
import { catchAsync } from '../../../core/utils/catchAsync';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePost, deletePost } from '../../../modules/home/slice/playByPlaySlice';
import { updatePost as updateUserPost, deletePost as deleteUserPost } from '../../../modules/home/slice/profileSlice';
import { useFormik } from 'formik';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { ListItemIcon } from '@mui/material';
import { modalAction } from '../../../core/constants/constants';
import PostModalComponent from '../postModal/postModal';
import { reactionType } from '../../../core/constants/constants';
import { useNavigate } from 'react-router-dom';

const reactions = [
  { icon: <ThumbDownIcon />, name: reactionType.unlike, actionIcon: <ThumbDownIcon/>},
  { icon: <ThumbUpIcon />, name: reactionType.like, actionIcon: <ThumbUpIcon color='primary'/>},
  { icon: <FavoriteIcon />, name: reactionType.love, actionIcon: <FavoriteIcon color='error'/>},
  { icon: <HandshakeIcon />, name: reactionType.collab, actionIcon: <HandshakeIcon color='success'/>},
];
const reactionsMap = {
  unlike: <ThumbUpOutlinedIcon sx={{color: '#757575'}} />,
  like: <ThumbUpIcon color='primary'/>,
  love: <FavoriteIcon color='error'/>,
  collab: <HandshakeIcon color='success'/>
}

const reactionSpeedDialStyle = {
  sx: {
    bgcolor: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      bgcolor: 'transparent',
    },
    "&:focus": {
      color: "transparent",
      boxShadow: 'none'
    }
  }
}

export default function PostCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogRef = React.useRef();
  const token = useSelector((state) => state.userSlice.token);
  const user = useSelector((state) => state.userSlice.user);
  const [post, setPost] = React.useState(props.data);
  // comments
  const formik = useFormik({
    initialValues: {
        comment: '',
    },
    onSubmit: (form) => {
        addComment(form);
        formik.setFieldValue('comment', '');
    },
});
  const [expanded, setExpanded] = React.useState(props.modal ? true : false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleMouseDownComment = (event) => {
    event.preventDefault();
  };
  let addComment = catchAsync(async (form) => {
    const res = await axios({
        method: httpMethod.post,
        url: apiRoute.comment+'/'+post._id,
        headers: {Authorization: `Bearer ${token}`},
        data: form
    });
    if (props.modal) {setPost(res.data.data.post)}

    dispatch(updatePost({post: res.data.data.post}));
    dispatch(updateUserPost({post: res.data.data.post}));
  });

  // reaction
  const [userReaction, setUserReaction] = React.useState(reactionsMap['unlike']);
  const [uniqueReactions, setUniqueReactions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (reaction) => {
    setOpen(false);
    if (reactionsMap[reaction]) {
      reaction  !== 'unlike' ? addReaction({reaction}) : removeReaction();
      setUserReaction(reactionsMap[reaction]);
    }
  };
  let addReaction = catchAsync(async (form) => {
    const res = await axios({
        method: httpMethod.post,
        url: apiRoute.reaction+'/'+post._id,
        headers: {Authorization: `Bearer ${token}`},
        data: form
    });
    if (props.modal) {setPost(res.data.data.post)}

    dispatch(updatePost({post: res.data.data.post}));
    dispatch(updateUserPost({post: res.data.data.post}));
  });
  let removeReaction = catchAsync(async () => {
    const res = await axios({
        method: httpMethod.delete,
        url: apiRoute.reaction+'/'+post._id,
        headers: {Authorization: `Bearer ${token}`},
    });
    if (props.modal) {setPost(res.data.data.post)}
    
    dispatch(updatePost({post: res.data.data.post}));
    dispatch(updateUserPost({post: res.data.data.post}));
  });
  
  // post 
  function editPost() {
    dialogRef.current.handleClickOpen(modalAction.edit, post);
  }

  let deletePostApi = catchAsync(async () => {
    await axios({
        method: httpMethod.delete,
        url: apiRoute.post+'/'+post._id,
        headers: {Authorization: `Bearer ${token}`},
    });

    dispatch(deletePost({id: post._id}));
    dispatch(deleteUserPost({id: post._id}));
  });

  // menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const menuButton =
  <IconButton 
  aria-label="settings"
  aria-controls={open ? 'menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  onClick={handleClickMenu}
  >
    <MoreVertIcon />
  </IconButton>;
  
  const menuList = [
    {name: 'Edit', icon: <EditOutlinedIcon fontSize="small"/>, function: () => {handleCloseMenu(); editPost()}},
    {name: 'Delete', icon: <DeleteOutlineOutlinedIcon fontSize="small"/>, function: () => {handleCloseMenu(); deletePostApi();}}
  ];

  // user avatar
  const getUserAvatar = (user, color, height, width, borderRadius, fontSize) => {
    const onClickHandler = () => routeTo(`/home/profile/${user._id}`);
    return user.media ? 
    <Box onClick={!props.modal ? () => onClickHandler() : null} component="img" sx={{objectFit: 'cover', height, width, borderRadius, cursor: props.modal ? 'default':'pointer'}} src={user.media}/>:
    <Avatar onClick={!props.modal ? () => onClickHandler() : null} sx={{ bgcolor: color[500], height, width, cursor: props.modal ? 'default':'pointer', fontSize }} aria-label="img">{user.name ? user.name.charAt(0).toUpperCase(): ''}</Avatar>
  }

  React.useEffect(() => {
    let getUserReaction = () => {
      const index = post.reactions.findIndex(x => x.user._id === user._id);
      if (index !== -1) {
        return reactionsMap[post.reactions[index].reaction];
      } else {
        return reactionsMap['unlike'];
      }
    }
    let getUniqueReactions = () => {
      const uniqueReaction = [];
      const reactionArray = [reactionType.like, reactionType.love, reactionType.collab];
  
      post.reactions.some((node) => {
        if (reactionArray.includes(node.reaction) && !uniqueReaction.includes(node.reaction)) {
          uniqueReaction.push(node.reaction);
        }
        return uniqueReaction.length === 3;
      });
      return uniqueReaction;
    }
    if (user._id){
      const reaction = getUserReaction();
      setUserReaction(reaction);
      setUniqueReactions(getUniqueReactions());
    }
  }, [user, post.reactions]);

    React.useMemo(() => 
    (() => {
      setPost(props.data);
    })(), [props.data]);

    const routeTo = (path)=> {
      // if modal is opened close it
      navigate(path);
    }

  return (
    <Card sx={{ maxWidth : props.maxWidth ? props.maxWidth : 345 }}>
        {/* header */}
        <CardHeader
        avatar={getUserAvatar(post.user, red, 40, 40, 10, 20)}
        action={!props.modal ? post.user._id === user._id ? menuButton : null : null}
        title={titleCase(post.user.name)}
        subheader={(new Date(post.dateCreated)).toDateString()}
        sx={{'.MuiCardHeader-title': {fontWeight: 500}}}
      />
      <Menu
      id="menu"
      aria-labelledby="menu-button"
      anchorEl={anchorEl}
      open={openMenu}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      >
        {
          menuList.map((node, index) => (
            <MenuItem key={index} onClick={node.function}>
              <ListItemIcon>
                {node.icon}
              </ListItemIcon>
              {node.name}
            </MenuItem>
          ))
        }
      </Menu>
      {/* media */}
      {
        (!props.modal ? post.media : false) &&
        <CardMedia component="video" image={post.media} controls/>
      }
      {/* content */}
      <CardContent>
        <Typography variant="body2" color="text.primary">
            {post.description}
        </Typography>
      </CardContent>
      {/* action stats */}
      <CardActions>
          <Stack direction='row' justifyContent='space-between' width='100%'>
            <Stack direction='row'>
                {
                  uniqueReactions.includes(reactionType.like) &&
                  <ThumbUpIcon color='primary' fontSize='small'/>
                }
                {
                  uniqueReactions.includes(reactionType.love) &&
                  <FavoriteIcon color='error' fontSize='small'/>
                }
                {
                  uniqueReactions.includes(reactionType.collab) &&
                  <HandshakeIcon color='success' fontSize='small'/>
                }
                <Typography ml={1} variant='body2' color='text.secondary'>{post.reactions.length}</Typography>
            </Stack>
            <Stack direction='row'>
                <Stack direction='row' spacing={1}>
                    <Typography ml={1} variant='body2' color='text.secondary'>{post.comments.length} comments</Typography>
                    {/* <Typography ml={1} variant='body2' color='text.secondary'>50 shares</Typography> */}
                </Stack>
            </Stack>
          </Stack>
      </CardActions>
      <Divider/>
      {/* action buttons */}
      <CardActions disableSpacing sx={{position: 'relative'}}>
        <Stack direction='row' justifyContent='space-between' width='100%'>
            <SpeedDial
            ariaLabel="Reaction speed dial"
            sx={{ position: 'absolute', bottom: 0, left: 0 }}
            icon={userReaction}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            FabProps={{...reactionSpeedDialStyle}}
            direction={'right'}
            >
              {reactions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={titleCase(action.name)}
                  onClick={() => handleClose(action.name)}
                />
              ))}
            </SpeedDial>
            <IconButton sx={{opacity: 0}}>
                <ThumbUpOutlinedIcon/>
            </IconButton>
            <IconButton onClick={handleExpandClick} >
                <ModeCommentOutlinedIcon/>
            </IconButton>
            <div style={{width: 2}}></div>
            {/* <IconButton>
                <ShareIcon />
            </IconButton> */}
        </Stack>
      </CardActions>
      {/* comments */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider/>
        <CardContent sx={props.modal ? {maxHeight: 550, overflowY: 'auto'} : {}}>
            <Stack spacing={2}>
                {/* user comment */}
                <Stack direction='row' spacing={2} alignItems='center'>
                    {getUserAvatar(user, red, 28, 28, 10, 18)}
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                      <OutlinedInput
                      id="comment"
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      error={formik.touched.comment && Boolean(formik.errors.comment)}
                      type='text'
                      size='small'
                      placeholder='Write a comment ...'
                      fullWidth
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                          aria-label="add comment"
                          onClick={formik.handleSubmit}
                          onMouseDown={handleMouseDownComment}
                          edge="end"
                          >
                            <SendOutlinedIcon fontSize='small' />
                          </IconButton>
                        </InputAdornment>
                      }
                      sx={{".MuiOutlinedInput-notchedOutline": {borderRadius: '20px'}}}
                      />
                    </FormControl>
                </Stack>
                {/* other comments */}
                {
                  post.comments.map((node, index) => (
                    <Stack direction='row' key={index} spacing={2}>
                      {getUserAvatar(node.user, green, 28, 28, 10, 18)}
                      <Stack>
                          <Typography variant="body2" color="text.primary" fontWeight={500}>{titleCase(node.user.name)}</Typography>
                          <Typography paragraph variant="body2" color="text.primary">
                            {node.comment}
                          </Typography>
                      </Stack>
                    </Stack>
                  ))
                }
            </Stack>
        </CardContent>
      </Collapse>
      <PostModalComponent ref={dialogRef}/>
    </Card>
  );
}
