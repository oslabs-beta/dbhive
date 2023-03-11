// import dependencies
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InfoIcon from '@mui/icons-material/Info';
import TuneIcon from '@mui/icons-material/Tune';
import LogoutIcon from '@mui/icons-material/Logout';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import utilities
import useAppStore from '../store/appStore';
import postgresql_elephant from '../assets/postgresql_elephant.png';
import yellow_hex from '../assets/yellow_hex.png';

function Navbar() {
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
            src={yellow_hex}
          />
          <Typography variant="h5" component="div" color="primary">
            dbHive
          </Typography>
          {isLoggedIn && (
            <>
              <Box sx={{ display: 'flex', ml: 'auto', mr: '1rem' }}>
                <AccountCircleIcon />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    opacity: '70%',
                    fontSize: '1rem',
                    ml: '.5rem',
                    mr: '2rem',
                  }}
                >
                  {username}
                </Typography>
                <LogoutIcon
                  onClick={() => {
                    logOutUser();
                    navigate('/login');
                  }}
                />
              </Box>
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
              src={yellow_hex}
            />
            <Typography variant="h6" component="div" sx={{ mx: '1rem' }}>
              for
            </Typography>
            <Box
              component="img"
              sx={{
                my: '1.5rem',
                height: 20,
              }}
              alt="PostgreSQL logo"
              src={postgresql_elephant}
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
                <PersonAddIcon />
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
              <ListItemText primary="Docs" />
            </ListItemButton>
          </ListItem>
          {isLoggedIn && (
            <>
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
                selected={
                  pathname === '/dashboard/' || pathname === '/dashboard'
                }
              >
                <ListItemButton onClick={() => navigate('/dashboard')}>
                  <ListItemIcon>
                    <MonitorHeartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            </>
          )}
          <Divider />
        </List>
      </Drawer>
    </nav>
  );
}

export default Navbar;
