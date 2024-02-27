import * as React from 'react';
import { Box, Button, Divider, Stack, Typography, IconButton } from "@mui/material";
import { toggleBorder as isBorder } from "../../../../core/styles/debugging-border";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import UserPosts from './components/posts';
import About from './components/about';
import Followers from './components/followers';
import Following from './components/following';
import ProductsAndServices from './components/productService';
import useMediaQuery from '@mui/material/useMediaQuery';
import { api } from '../../../../core/utils/interceptor';
import axios from 'axios';
import { catchAsync } from '../../../../core/utils/catchAsync';
import { httpMethod, apiRoute } from '../../../../core/constants/constants';
import { updatePostArray, updateUser } from '../../slice/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { titleCase } from '../../../../core/utils/titleCase';
import { useParams } from 'react-router-dom';
import { setUserDetails } from '../../../auth/slice/userSlice';
import EditProfileDialog from './dialogs/editProfile';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, pb: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function ProfileTabs() {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: matchesMobile ? window.innerWidth : '100%', bgcolor: 'background.paper', paddingX: 1 }}>
        <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons = {matchesMobile}
        allowScrollButtonsMobile
        >
            <Tab sx={{textTransform: 'none', fontWeight: 400}} label="Posts" {...a11yProps(0)} />
            <Tab sx={{textTransform: 'none', fontWeight: 400}} label="About" {...a11yProps(1)} />
            <Tab sx={{textTransform: 'none', fontWeight: 400}} label="Followers" {...a11yProps(2)} />
            <Tab sx={{textTransform: 'none', fontWeight: 400}} label="Following" {...a11yProps(3)} />
            <Tab sx={{textTransform: 'none', fontWeight: 400}} label="Products/Services" {...a11yProps(4)} />
        </Tabs>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UserPosts/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <About/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Followers/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Following/>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <ProductsAndServices/>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default function Profile() {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const dialogRef = React.useRef();
  const token = useSelector((state) => state.userSlice.token);
  const loggedInUser = useSelector((state) => state.userSlice.user);
  const user = useSelector((state) => state.profileSlice.user);
  const { id } = useParams();
  const [actionButtonBool, setActionButtonBool] = React.useState(false);
  const [followBool, setFollowBool] = React.useState(true);

  // edit profile
  function edit() {
    dialogRef.current.handleClickOpen();
  }
  
  // follow user
  let followUser = catchAsync(async () => {
    const res = await api({
        method: httpMethod.patch,
        url: apiRoute.following + `/${id}`,
        headers: {Authorization: `Bearer ${token}`},
    });
    dispatch(updateUser({user: res.data.data.friend}));
    dispatch(setUserDetails({user: res.data.data.user}));
  });

  // unfollow user
  let unfollowUser = catchAsync(async () => {
    const res = await api({
        method: httpMethod.delete,
        url: apiRoute.following + `/${id}`,
        headers: {Authorization: `Bearer ${token}`},
    });
    dispatch(updateUser({user: res.data.data.friend}));
    dispatch(setUserDetails({user: res.data.data.user}));
  });

  React.useMemo(() => 
  (() => {
    if (!loggedInUser.following || !loggedInUser._id) return;
    // show follow button if user hasn't followed the other guy otherwise show unfollow button
    setFollowBool(loggedInUser.following.findIndex(x => x._id === id) !== -1 ? false : true);
    // show action buttons if a user has opened someone else's profile
    id === loggedInUser._id ? setActionButtonBool(false) : setActionButtonBool(true);
  })(), [loggedInUser.following, loggedInUser._id, id]);

  React.useEffect(() => {
    let getUserDetailsAndPosts = catchAsync(async () => {
      const data = await axios.all([
        api({
          method: httpMethod.get,
          url: apiRoute.user+`/${id}`,
          headers: {Authorization: `Bearer ${token}`},
        }),
        api({
          method: httpMethod.get,
          url: apiRoute.userFeed+`/${id}`,
          headers: {Authorization: `Bearer ${token}`},
        })
      ]);
      dispatch(updateUser({user: data[0].data.data.user}));
      dispatch(updatePostArray({posts: data[1].data.data.posts}));
    });
    getUserDetailsAndPosts();
  }, [token, dispatch, id]);
    return (
        <Box sx={{border: isBorder ? '1px solid red' : 'none', maxWidth: '700px', width: '100%', paddingY:2, mb:4}}>
            <Stack spacing={3}>
                {/* user */}
                <Stack direction={matchesMobile ? 'column' : 'row'} spacing={4} alignItems='start' paddingX={1}>
                    {
                      user.media &&
                      <Box component="img" sx={{objectFit: 'cover', height: 140, width: 140, borderRadius: 20}} src={user.media}/>
                    }
                    {
                      !user.media &&
                      <Avatar sx={{ bgcolor: '#bdbdbd', width: 140, height: 140, fontSize: 48 }}>
                        {user.name ? user.name.charAt(0).toUpperCase() : ''}
                      </Avatar>
                    }                   
                    <Stack spacing={2}>
                        <Stack>
                            <Typography variant='h6'>{ user.name ? titleCase(user.name) : ''}</Typography>
                            <Typography color='GrayText' variant='body2'>{user.email}</Typography>
                        </Stack>
                        <Typography variant='body2' paragraph>
                            {user.bio}
                        </Typography>
                        {
                          actionButtonBool &&
                          <Stack direction='row' spacing={2}>
                            <Button onClick={followBool ? followUser : unfollowUser}  variant="contained" sx={{color: 'white', borderRadius: 10, fontSize: 10}} size='small' disableElevation>
                              {followBool ? 'Follow' : 'Unfollow'}
                            </Button>
                            <Button variant="outlined" size='small' sx={{borderRadius: 10, fontSize: 10}}>Collab</Button>
                          </Stack>
                        }
                    </Stack>
                    {
                      !actionButtonBool &&
                      <IconButton size="small" onClick={edit}>
                        <EditOutlinedIcon/>
                      </IconButton>
                    }
                </Stack>
                {/* tabs */}
                <Box>
                  <Divider/>
                  <ProfileTabs/>
                </Box>               
            </Stack>
            <EditProfileDialog ref={dialogRef}/>
        </Box>
    )
}