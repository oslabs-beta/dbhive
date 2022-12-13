// import dependencies
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { set } from 'idb-keyval';
import AES from 'crypto-js/aes';
import { Card, Typography, ListItemText, List, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// import react components
import Navbar from '../components/Navbar';
import ConnectDB from '../components/ConnectDB';

// import utilities
import useAppStore from '../store/appStore';
import { UserData } from '../clientTypes';

function Setup() {
  const navigate = useNavigate();

  const username = useAppStore((state) => state.username);
  const secret = useAppStore((state) => state.secret);
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const userData = useAppStore((state) => state.userData);
  const updateUserData = useAppStore((state) => state.updateUserData);

  // check user authorization
  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, []);

  function deleteHandler(dbName: string) {
    const copyUserData = { ...userData };
    copyUserData.dbs = copyUserData.dbs.filter((db) => db.nickname !== dbName);
    updateUserData(copyUserData);
    storeDelete(copyUserData);
  }

  function storeDelete(userData: UserData) {
    const ciphertext = AES.encrypt(JSON.stringify(userData), secret).toString();
    set(username, ciphertext).catch((err) => {
      console.log('IndexedDB: set failed', err);
    });
  }

  // render a list of databases associated with the user
  const connectedDBs: JSX.Element[] = [];
  userData.dbs.reverse().forEach((db) => {
    connectedDBs.push(
      <ListItemText
        key={db.nickname}
        sx={{
          position: 'relative',
          borderRadius: '6px',
          bgcolor: '#134e00',
          p: '.5rem',
          m: '1rem',
        }}
      >
        <Box
          sx={{
            color: 'white',
            position: 'absolute',
            right: '5px',
            top: '5px',
          }}
          onClick={() => {
            deleteHandler(db.nickname);
          }}
        >
          <DeleteForeverIcon />
        </Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223Z" />
          <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
          <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
          <path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
        </svg>
        <Typography>{db.nickname}</Typography>
      </ListItemText>
    );
  });

  return (
    <Box
      sx={{
        pl: '11rem',
      }}
    >
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
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Connected Databases ({userData.dbs.length})
        </Typography>
        <List>{connectedDBs}</List>
      </Card>
    </Box>
  );
}

export default Setup;
