import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { set, get } from 'idb-keyval';
import AES from 'crypto-js/aes';
import { UserData } from '../clientTypes';

import { Card, Button, Typography, Box } from '@mui/material';

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

function Signup(props: Props) {
  const navigate = useNavigate();

  const [usernameInput, setUsernameInput] = useState('');
  const [secretInput, setSecretInput] = useState('');
  const [signupErrorText, setSignupErrorText] = useState<null | string>(null);

  const initialUserData: UserData = { decryption: 'isValid', dbs: [] };

  function submitHandler() {
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

// function Signup(props: Props) {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [secret, setSecret] = useState('');
//   const [signupError, setSignupError] = useState(false);
//   const [signupErrorText, setSignupErrorText] = useState('');

//   const initialUserData: UserData = { decryption: 'isValid', dbs: [] };

//   function submitHandler() {
//     const ciphertext = AES.encrypt(
//       JSON.stringify(initialUserData),
//       secret
//     ).toString();

//     get(username)
//       .then((data) => {
//         if (data === undefined) {
//           set(username, ciphertext)
//             .then(() => {
//               navigate('/login');
//             })
//             .catch((err) => {
//               console.log('IndexedDB: set failed', err);
//             });
//         } else {
//           setSignupError(true);
//           setSignupErrorText('incorrect username or password');
//         }
//       })
//       .catch((err) => {
//         console.log('IndexedDB: get failed', err);
//       });

//     setUsername('');
//     setSecret('');
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
//       <Box
//         sx={{
//           pl: '11rem',
//         }}
//       >
//         <Card
//           sx={{
//             textAlign: 'center',
//             width: 400,
//             mx: 'auto',
//             my: '10rem',
//             p: '4rem',
//           }}
//         >
//           <Typography
//             variant="h5"
//             component="div"
//             sx={{ flexGrow: 1, mb: '2rem' }}
//           >
//             Sign Up
//           </Typography>
//           <Input
//             inputClass={'input-group'}
//             label={'Username: '}
//             setInput={setUsername}
//             value={username}
//             error={signupError}
//           />
//           <Input
//             inputClass={'input-group'}
//             inputType="password"
//             label={'Password: '}
//             setInput={setSecret}
//             value={secret}
//             error={signupError}
//             errorText={signupErrorText}
//           />
//           <Button
//             variant="contained"
//             sx={{ mt: '1rem', mb: '3rem', width: '100%' }}
//             onClick={submitHandler}
//           >
//             Submit
//           </Button>
//         </Card>
//       </Box>
//     </div>
//   );
// }

// export default Signup;
