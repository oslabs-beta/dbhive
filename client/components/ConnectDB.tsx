import * as React from 'react';
import { useState } from 'react';
import Input from './Input';
import { set } from 'idb-keyval';
import AES from 'crypto-js/aes';

import { Card, Button, Typography, Divider, Alert } from '@mui/material';

import useAppStore from '../store/appStore';

function ConnectDB() {
  const username = useAppStore((state) => state.username);
  const secret = useAppStore((state) => state.secret);
  const userData = useAppStore((state) => state.userData);
  const updateUserData = useAppStore((state) => state.updateUserData);

  const [submitAlert, setSubmitAlert] = useState<JSX.Element | null>(null);
  const [nickname, setNickname] = useState('');
  const [uri, setUri] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('5432');
  const [database, setDatabase] = useState('');
  const [dBUsername, setDBUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler(type: string) {
    const copyUserData = { ...userData };
    if (type === 'uri') {
      copyUserData.dbs.push({
        nickname: nickname,
        uri: uri,
      });
    } else if (type === 'separate') {
      copyUserData.dbs.push({
        nickname: nickname,
        uri: `postgres://${dBUsername}:${password}@${host}:${port}/${database}`,
      });
    }

    updateUserData(copyUserData);

    const ciphertext = AES.encrypt(
      JSON.stringify(copyUserData),
      secret
    ).toString();
    set(username, ciphertext).catch((err) => {
      console.log('IndexedDB: set failed', err);
    });

    setNickname('');
    setUri('');
    setHost('');
    setPort('5432');
    setDatabase('');
    setDBUsername('');
    setPassword('');
    setSubmitAlert(
      <Alert
        severity="success"
        sx={{
          left: '30rem',
          top: '.5rem',
          position: 'fixed',
          zIndex: 'tooltip',
        }}
      >
        A new DB has been added
      </Alert>
    );
    setTimeout(() => {
      setSubmitAlert(null);
    }, 5000);
  }

  return (
    <>
      {submitAlert}
      <Card
        sx={{
          textAlign: 'center',
          width: 400,
          mx: 'auto',
          mt: '10rem',
          p: '2rem',
          pb: '0rem',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, mb: '2rem' }}
        >
          Connect to new DB
        </Typography>
        <Input
          inputClass={'input-group'}
          label={'Nickname: '}
          value={nickname}
          setInput={setNickname}
        />
        <Divider sx={{ my: '2rem' }} color="primary" />
        <Input
          inputClass={'input-group'}
          label={'Uri String: '}
          value={uri}
          setInput={setUri}
        />
        <Button
          variant="contained"
          sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
          onClick={() => submitHandler('uri')}
        >
          Submit
        </Button>
        <Input
          inputClass={'input-group'}
          label={'Host: '}
          setInput={setHost}
          value={host}
        />
        <Input
          inputClass={'input-group'}
          label={'Port: '}
          setInput={setPort}
          value={port}
        />
        <Input
          inputClass={'input-group'}
          label={'Database: '}
          value={database}
          setInput={setDatabase}
        />
        <Input
          inputClass={'input-group'}
          label={'Username: '}
          value={dBUsername}
          setInput={setDBUsername}
        />
        <Input
          inputClass={'input-group'}
          inputType="password"
          label={'Password: '}
          value={password}
          setInput={setPassword}
        />
        <Button
          variant="contained"
          sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
          onClick={() => submitHandler('separate')}
        >
          Submit
        </Button>
      </Card>
    </>
  );
}

export default ConnectDB;
