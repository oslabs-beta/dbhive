// import dependencies
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { set, get } from 'idb-keyval';
import AES from 'crypto-js/aes';
import { Card, Button, Typography, Box } from '@mui/material';

// import react components
import Navbar from '../components/Navbar';
import Input from '../components/Input';

// import utilities
import { UserData } from '../clientTypes';

function Signup() {
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [signupErrorText, setSignupErrorText] = useState<null | string>(null);

  function submitHandler() {
    /* check to see if the username is available by searching IndexedDB
    if available, add username as key to IndexedDB and populate value with an encrypted
    JSON object using the password as the AES secret
    */
    const initialUserData: UserData = { decryption: 'isValid', dbs: [] };
    const ciphertext = AES.encrypt(
      JSON.stringify(initialUserData),
      secretInput
    ).toString();

    get(usernameInput)
      .then((data) => {
        if (data === undefined) {
          set(usernameInput, ciphertext)
            .then(() => {
              navigate('/login');
            })
            .catch((err) => {
              console.log('IndexedDB: set failed', err);
            });
        } else {
          setSignupErrorText('incorrect username or password');
        }
      })
      .catch((err) => {
        console.log('IndexedDB: get failed', err);
      });

    setUsernameInput('');
    setSecretInput('');
    setSignupErrorText(null);
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
            data-testid="signup-header"
            component="div"
            sx={{ flexGrow: 1, mb: '2rem' }}
          >
            Sign Up
          </Typography>
          <Input
            inputClass={'input-group'}
            label={'Username: '}
            setInput={setUsernameInput}
            value={usernameInput}
            error={signupErrorText !== null}
          />
          <Input
            inputClass={'input-group'}
            inputType="password"
            label={'Password: '}
            setInput={setSecretInput}
            value={secretInput}
            error={signupErrorText !== null}
            errorText={signupErrorText}
          />
          <Button
            variant="contained"
            sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Card>
      </Box>
    </div>
  );
}

export default Signup;
