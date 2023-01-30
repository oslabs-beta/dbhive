// import dependencies
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { Card, Button, Typography, Box } from '@mui/material';

// import react components
import Navbar from '../components/Navbar';
import Input from '../components/Input';

// import utilities
import useAppStore from '../store/appStore';

function Login() {
  const navigate = useNavigate();

  const logInUser = useAppStore((state) => state.logInUser);

  const [usernameInput, setUsernameInput] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [loginErrorText, setLoginErrorText] = useState<null | string>(null);

  function submitHandler() {
    /* authenticate by checking for a username key within IndexedDB
    if there is a user, use the password as the AES encryption secret, 
    and look for a verifiable property on the value object
    */
    get(usernameInput)
      .then((data) => {
        const bytes = AES.decrypt(data, secretInput);
        const decryptResponse = bytes.toString(CryptoJS.enc.Utf8);
        const originalText = JSON.parse(decryptResponse);
        if (originalText.decryption === 'isValid') {
          // populate global state store with decrypted IDB value, which holds user data
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
            data-testid="login-header"
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
          />
          <Button
            variant="contained"
            sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
            onClick={submitHandler}
          >
            Submit
          </Button>
          <Button
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
