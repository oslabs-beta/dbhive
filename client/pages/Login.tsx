import * as React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { get } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

import { Card, Button, Typography, Box } from '@mui/material';
import useAppStore from '../store/appStore';

function Login() {
  const logInUser = useAppStore((state) => state.logInUser);

  const [usernameInput, setUsernameInput] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [loginErrorText, setLoginErrorText] = useState<null | string>(null);

  const navigate = useNavigate();

  function submitHandler() {
    get(usernameInput)
      .then((data) => {
        const bytes = AES.decrypt(data, secretInput);
        const decryptResponse = bytes.toString(CryptoJS.enc.Utf8);
        const originalText = JSON.parse(decryptResponse);
        if (originalText.decryption === 'isValid') {
          logInUser(usernameInput, secretInput, originalText);
          setUsernameInput('');
          setSecretInput('');
          setLoginErrorText(null);
          navigate('/dashboard');
        } else {
          setLoginErrorText('incorrect username or password');
        }
      })
      .catch(() => {
        setLoginErrorText('incorrect username or password');
      });
  }

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          pl: '11rem',
        }}
      >
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
          >
            Login
          </Typography>
          <Input
            inputClass={'input-group'}
            label={'Username: '}
            setInput={setUsernameInput}
            value={usernameInput}
            error={loginErrorText !== null}
          />
          <Input
            inputClass={'input-group'}
            inputType="password"
            label={'Password: '}
            setInput={setSecretInput}
            value={secretInput}
            error={loginErrorText !== null}
            errorText={loginErrorText}
            data-testid = 'password-input'
          />
          <Button
            variant="contained"
            sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
            onClick={submitHandler}
          >
            Submit
          </Button>
          <Button
            data-testid ='official-signup-btn'
            variant="text"
            sx={{ width: '100%' }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </Card>
      </Box>
    </div>
  );
}

export default Login;
