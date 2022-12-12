import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { get } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { UserData } from '../clientTypes';

import { Card, Button, Typography, Box } from '@mui/material';
import useAppStore from '../store/appStore';

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
  const logInUser = useAppStore((state) => state.logInUser);
  // const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  const [usernameInput, setUsernameInput] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [loginErrorText, setLoginErrorText] = useState<null | string>(null);
  // const didMount = useRef(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!didMount.current) {
  //     didMount.current = true;
  //   } else {
  //     if (isLoggedIn) navigate('/dashboard');
  //   }
  // }, [isLoggedIn]);

  function submitHandler() {
    get(usernameInput)
      .then((data) => {
        const bytes = AES.decrypt(data, secretInput);
        const decryptResponse = bytes.toString(CryptoJS.enc.Utf8);
        const originalText = JSON.parse(decryptResponse);
        if (originalText.decryption === 'isValid') {
          // props.setIsLoggedIn(true);
          // props.setUserData(originalText);
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
      <Navbar
        secret={props.secret}
        setSecret={props.setSecret}
        username={props.username}
        setUsername={props.setUsername}
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
        userData={props.userData}
        setUserData={props.setUserData}
      />
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

// type Props = {
//   username: string;
//   setUsername: (eventTargetValue: string) => void;
//   secret: string;
//   setSecret: (eventTargetValue: string) => void;
//   isLoggedIn: boolean;
//   setIsLoggedIn: (eventTargetValue: boolean) => void;
//   userData: UserData;
//   setUserData: (eventTargetValue: UserData) => void;
// };

// function Login(props: Props) {
//   const userData2 = useAppStore((state) => state.userData);
//   console.log('from useAppStore', userData2);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!didMount.current) {
//       didMount.current = true;
//     } else {
//       if (props.isLoggedIn) navigate('/dashboard');
//     }
//   }, [props.isLoggedIn]);

//   const [loginError, setLoginError] = useState(false);
//   const [loginErrorText, setLoginErrorText] = useState('');
//   const didMount = useRef(false);

//   function submitHandler() {
//     get(props.username)
//       .then((data) => {
//         const bytes = AES.decrypt(data, props.secret);
//         const decryptResponse = bytes.toString(CryptoJS.enc.Utf8);
//         if (decryptResponse) {
//           const originalText = JSON.parse(decryptResponse);
//           if (originalText.decryption === 'isValid') {
//             props.setIsLoggedIn(true);
//             props.setUserData(originalText);
//           } else {
//             setLoginError(true);
//             setLoginErrorText('incorrect username or password');
//           }
//         } else {
//           setLoginError(true);
//           setLoginErrorText('incorrect username or password');
//         }
//       })
//       .catch((err) => {
//         console.log('IndexedDB get failed', err);
//         setLoginError(true);
//         setLoginErrorText('incorrect username or password');
//       });
//   }

//   return (
//     <div>
//       <Navbar
//         secret={props.secret}
//         setSecret={props.setSecret}
//         username={props.username}
//         setUsername={props.setUsername}
//         isLoggedIn={props.isLoggedIn}
//         setIsLoggedIn={props.setIsLoggedIn}
//         userData={props.userData}
//         setUserData={props.setUserData}
//       />
//       <Card
//         sx={{
//           textAlign: 'center',
//           width: 400,
//           mx: 'auto',
//           my: '10rem',
//           p: '4rem',
//         }}
//       >
//         <Typography
//           variant="h5"
//           component="div"
//           sx={{ flexGrow: 1, mb: '2rem' }}
//         >
//           Login
//         </Typography>
//         <Input
//           inputClass={'input-group'}
//           label={'Username: '}
//           setInput={props.setUsername}
//           value={props.username}
//           error={loginError}
//         />
//         <Input
//           inputClass={'input-group'}
//           inputType="password"
//           label={'Password: '}
//           setInput={props.setSecret}
//           value={props.secret}
//           error={loginError}
//           errorText={loginErrorText}
//         />
//         <Button
//           variant="contained"
//           sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
//           onClick={submitHandler}
//         >
//           Submit
//         </Button>
//         <Button
//           variant="text"
//           sx={{ width: '100%' }}
//           onClick={() => navigate('/signup')}
//         >
//           Sign Up
//         </Button>
//       </Card>
//     </div>
//   );
// }

// export default Login;
