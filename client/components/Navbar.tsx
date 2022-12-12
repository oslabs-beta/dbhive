import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserData } from '../clientTypes';

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
import LogoutIcon from '@mui/icons-material/Logout';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import useAppStore from '../store/appStore';

type Props = {
  username: string;
  setUsername: (eventTargetValue: string) => void;
  secret: string;
  setSecret: (eventTargetValue: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (eventTargetValue: boolean) => void;
  userData: UserData;
  setUserData: (eventTargetValue: UserData) => void;
};

function Navbar(props: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const username = useAppStore((state) => state.username);
  const logOutUser = useAppStore((state) => state.logOutUser);

  const drawerWidth = '11rem';
  return (
    <nav>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth})`,
          ml: drawerWidth,
          height: '4rem',
        }}
      >
        <Toolbar>
          <Box
            component="img"
            sx={{
              mx: '1.5rem',
              height: 30,
            }}
            alt="dbHive icon"
            src="https://cdn-icons-png.flaticon.com/512/541/541384.png"
          />
          <Typography variant="h5" component="div" color="primary">
            dbHive
          </Typography>
          {isLoggedIn && (
            <>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  ml: 'auto',
                  mr: '1rem',
                  opacity: '70%',
                  fontSize: '1rem',
                }}
              >
                {username}
              </Typography>
              <LogoutIcon
                onClick={() => {
                  logOutUser();
                }}
              />
            </>
          )}
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
        <Toolbar></Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ justifyContent: 'center' }}>
            <Box
              component="img"
              sx={{
                height: 20,
              }}
              alt="dbHive icon"
              src="https://cdn-icons-png.flaticon.com/512/541/541384.png"
            />
            <Typography variant="h6" component="div" sx={{ mx: '1rem' }}>
              for
            </Typography>
            <Box
              component="img"
              sx={{
                my: '1.5rem',
                height: 20,
                // mx: 'auto',
              }}
              alt="PostgreSQL logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1280px-Postgresql_elephant.svg.png"
            />
          </ListItem>
          <Divider />
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
