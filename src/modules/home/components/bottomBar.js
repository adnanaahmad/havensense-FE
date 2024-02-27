import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { navigationItems as items } from '../../../core/constants/constants';
import { useNavigate, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';

export default function BottomBar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  let routeTo = (path) => navigate(path);

  // highlight tab based on location
  React.useMemo(() => 
  (() => {
    const index = items.findIndex(x => location.pathname === x.pathName);
    setValue(index !== -1 ? items[index].id : false);
  })(), [location]);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} variant='outlined'>
          {
            items.map((node, index) => (
              <BottomNavigationAction key={index} icon={node.icon} onClick={() => routeTo(node.route)}/>
            ))
          }         
        </BottomNavigation>
    </Paper>
  );
}
