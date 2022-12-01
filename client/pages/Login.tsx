import * as React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { get } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { UserData } from '../clientTypes';

import { Card, Button, Typography } from '@mui/material';

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

function Login(props: Props) {
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);
  const [loginErrorText, setLoginErrorText] = useState('');

  function submitHandler() {
    get(props.username)
      .then((data) => {
        const bytes = AES.decrypt(data, props.secret);
        const decryptResponse = bytes.toString(CryptoJS.enc.Utf8);
        if (decryptResponse) {
          const originalText = JSON.parse(decryptResponse);
          if (originalText.decryption === 'isValid') {
            props.setIsLoggedIn(true);
            props.setUserData(originalText);
            navigate('/dashboard');
          } else {
            setLoginError(true);
            setLoginErrorText('incorrect username or password');
          }
        } else {
          setLoginError(true);
          setLoginErrorText('incorrect username or password');
        }
      })
      .catch((err) => {
        console.log('IndexedDB get failed', err);
        setLoginError(true);
        setLoginErrorText('incorrect username or password');
      });

    props.setUsername('');
    props.setSecret('');
  }

  return (
    <div>
      <Navbar />
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
          Login
        </Typography>
        <Input
          inputClass={'input-group'}
          label={'Username: '}
          setInput={props.setUsername}
          value={props.username}
          error={loginError}
        />
        <Input
          inputClass={'input-group'}
          inputType="password"
          label={'Password: '}
          setInput={props.setSecret}
          value={props.secret}
          error={loginError}
          errorText={loginErrorText}
        />
        <Button
          variant="contained"
          sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
          className="width-100-perc"
          onClick={submitHandler}
        >
          Submit
        </Button>
        <Button
          variant="text"
          sx={{ width: '100%' }}
          className="width-100-perc"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </Card>
    </div>
  );
}

export default Login;
