// postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres

import * as React from 'react';
import { useState } from 'react';
import Input from './Input';
// import { set, get } from 'idb-keyval';
// import CryptoJS from 'crypto-js';
// import AES from 'crypto-js/aes';
import { UserData } from '../clientTypes';

import { Card, Button, Typography, Divider } from '@mui/material';

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

function ConnectDB(props: Props) {
  const [nickname, setNickname] = useState('');
  const [uri, setUri] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('5432');
  const [database, setDatabase] = useState('');
  const [dBUsername, setDBUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler(type: string) {
    if (type === 'uri') {
      const copyUserData = { ...props.userData };
      copyUserData.dbs.push({
        nickname: nickname,
        uri: uri,
      });
      props.setUserData(copyUserData);
    } else if (type === 'separate') {
      const copyUserData = { ...props.userData };
      copyUserData.dbs.push({
        nickname: nickname,
        uri: `postgres://${dBUsername}:${password}@${host}:${port}/${database}`,
      });
      props.setUserData(copyUserData);
    }

    // get(props.username)
    //   .then((data) => {
    //     const bytes = AES.decrypt(data, props.secret);
    //     const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //     if (originalText.dbs !== undefined) originalText.dbs.push(stateData);
    //     else originalText.dbs = [stateData];
    //     console.log(originalText);
    //     const ciphertext = AES.encrypt(
    //       JSON.stringify(originalText),
    //       props.secret
    //     ).toString();

    //     set(props.username, ciphertext)
    //       .then(() => {
    //         console.log('IndexedDB set successful');
    //         alert(stateData.nickname + ' has been added');
    //       })
    //       .catch((err) => {
    //         console.log('IndexedDB set failed', err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log('IndexedDB get failed', err);
    //   });

    setNickname('');
    setUri('');
    setHost('');
    setPort('5432');
    setDatabase('');
    setDBUsername('');
    setPassword('');
  }

  return (
    <Card
      sx={{
        textAlign: 'center',
        width: 400,
        mx: 'auto',
        my: '10rem',
        p: '4rem',
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, mb: '2rem' }}
        // color="primary"
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
  );
}

export default ConnectDB;
