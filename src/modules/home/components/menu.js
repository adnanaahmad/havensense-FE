import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartDialog from '../dialogs/cart';

export default function AccountMenu() {
  const user = useSelector((state) => state.userSlice.user);
  const dialogRef = React.useRef();
  const menuList = [
    {name: 'Profile', icon: <PersonOutlinedIcon fontSize="small"/>, route: `profile/${user._id}`},
    {name: 'Logout', icon: <Logout fontSize="small"/>, route: '/login'}
  ];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function openCart() {
    dialogRef.current.handleClickOpen();
  }
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Cart">
          <IconButton size="small" onClick={() => openCart()}>
            <ShoppingCartOutlinedIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 29, height: 29, fontSize: 17 }}>{user.name ? user.name.charAt(0).toUpperCase() : ''}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      {
        open &&
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            minWidth: 150,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {
            menuList.map((node, index) => (
              <MenuItem key={index} component={Link} to={node.route}>
                <ListItemIcon>
                  {node.icon}
                </ListItemIcon>
                {node.name}
              </MenuItem>
            ))
          }
        </Menu>
      }
      <CartDialog ref={dialogRef}/>
    </React.Fragment>
  );
}
