import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { set, get } from 'idb-keyval';
import AES from 'crypto-js/aes';
import { UserData } from '../clientTypes';

import { Card, Button, Typography } from '@mui/material';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [signupError, setSignupError] = useState(false);
  const [signupErrorText, setSignupErrorText] = useState('');

  const initialUserData: UserData = { decryption: 'isValid', dbs: [] };

  function submitHandler() {
    const ciphertext = AES.encrypt(
      JSON.stringify(initialUserData),
      secret
    ).toString();

    get(username)
      .then((data) => {
        if (data === undefined) {
          set(username, ciphertext)
            .then(() => {
              navigate('/login');
            })
            .catch((err) => {
              console.log('IndexedDB: set failed', err);
            });
        } else {
          setSignupError(true);
          setSignupErrorText('incorrect username or password');
        }
      })
      .catch((err) => {
        console.log('IndexedDB: get failed', err);
      });

    setUsername('');
    setSecret('');
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
          Sign Up
        </Typography>
        <Input
          inputClass={'input-group'}
          label={'Username: '}
          setInput={setUsername}
          value={username}
          error={signupError}
        />
        <Input
          inputClass={'input-group'}
          inputType="password"
          label={'Password: '}
          setInput={setSecret}
          value={secret}
          error={signupError}
          errorText={signupErrorText}
        />
        <Button
          variant="contained"
          sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
          className="width-100-perc"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Card>
    </div>
  );
}

export default Signup;
