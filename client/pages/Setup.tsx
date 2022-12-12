import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ConnectDB from '../components/ConnectDB';
import { Card, Typography, ListItemText, List } from '@mui/material';

import useAppStore from '../store/appStore';

function Setup() {
  const navigate = useNavigate();

  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  // useEffect(() => {
  //   if (!isLoggedIn) navigate('/login');
  // }, []);

  return (
    <div>
      <Navbar />
      <ConnectDB />
      <Card
        sx={{
          textAlign: 'center',
          width: 400,
          mx: 'auto',
          my: '2rem',
          p: '4rem',
        }}
      >
        <List>
          <ListItemText key="mean">
            <Typography>db1</Typography>
          </ListItemText>
          <ListItemText key="mean">
            <Typography>db2</Typography>
          </ListItemText>
          <ListItemText key="mean">
            <Typography>db2</Typography>
          </ListItemText>
          <ListItemText key="mean">
            <Typography>db4</Typography>
          </ListItemText>
        </List>
      </Card>
    </div>
  );
}

export default Setup;
