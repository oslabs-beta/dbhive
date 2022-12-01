import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InfoIcon from '@mui/icons-material/Info';
import TuneIcon from '@mui/icons-material/Tune';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  const drawerWidth = 180;
  return (
    <nav>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Box
            component="img"
            sx={{
              m: 1,
              height: 30,
            }}
            alt="dbHive icon"
            src="https://cdn-icons-png.flaticon.com/512/541/541384.png"
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            color="primary"
          >
            dbHive
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Box
            component="img"
            sx={{
              m: 1,
              height: 30,
              mx: 'auto',
            }}
            alt="PostgreSQL logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1280px-Postgresql_elephant.svg.png"
          />
        </Toolbar>
        <Divider />
        <List>
          <ListItem
            disablePadding
            selected={pathname === '/login/' || pathname === '/login'}
          >
            <ListItemButton onClick={() => navigate('/login')}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={pathname === '/signup/' || pathname === '/signup'}
          >
            <ListItemButton onClick={() => navigate('/signup')}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding selected={pathname === '/'}>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={pathname === '/setup/' || pathname === '/setup'}
          >
            <ListItemButton onClick={() => navigate('/setup')}>
              <ListItemIcon>
                <TuneIcon />
              </ListItemIcon>
              <ListItemText primary="Setup" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            selected={pathname === '/dashboard/' || pathname === '/dashboard'}
          >
            <ListItemButton onClick={() => navigate('/dashboard')}>
              <ListItemIcon>
                <MonitorHeartIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {/* <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/setup')}>Setup</button>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button> */}
    </nav>
  );
}

export default Navbar;
