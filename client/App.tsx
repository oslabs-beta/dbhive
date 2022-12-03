// Signup page, submit handler needs to set encrypted username key in IDB. Holds its own state.
// Login page, on submit, needs to looks in IDB for encrypted username, if succesful set loggedIn state, if not return incorrect message
// Loggedin and secret state passed to dashboard. Dashboard is conditionally rendered based on loggedin state, if not loggedin redirect to login page.
// Navbar, should also exclude page navigation buttons based on loggedin state.
// Logout button, change state of loggedin

import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Setup from './pages/Setup';
import { useState, useEffect } from 'react';
import { set } from 'idb-keyval';
import AES from 'crypto-js/aes';
import { UserData } from './clientTypes';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd900',
    },
    secondary: {
      main: '#134e00',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  // ---COMMENT OUT FOR DASHBOARD TESTING---
  // const initialUserData: UserData = {
  //   decryption: 'isValid',
  //   dbs: [],
  // };

  // ---UNCOMMENT FOR DASHBOARD TESTING---
  const initialUserData: UserData = {
    decryption: 'isValid',
    dbs: [
      {
        nickname: 'dbTest',
        uri: 'postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres',
      },
      {
        nickname: 'dbTest2',
        uri: 'postgres://n00bs:testallcaps@dbhive.cxjwyi85ug6q.us-east-1.rds.amazonaws.com:5432/postgres',
      },
    ],
  };

  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const globalState = {
    username: username,
    secret: secret,
    isLoggedIn: isLoggedIn,
    userData: userData,
  };

  function handleUserData() {
    const ciphertext = AES.encrypt(JSON.stringify(userData), secret).toString();
    set(username, ciphertext).catch((err) => {
      console.log('IndexedDB: set failed', err);
    });
  }

  useEffect(() => {
    handleUserData();
    console.log('globalState:', globalState);
  }, [userData]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Home
          secret={secret}
          setSecret={setSecret}
          username={username}
          setUsername={setUsername}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userData={userData}
          setUserData={setUserData}
        />
      ),
    },
    {
      path: '/setup',
      element: (
        <Setup
          secret={secret}
          setSecret={setSecret}
          username={username}
          setUsername={setUsername}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userData={userData}
          setUserData={setUserData}
        />
      ),
    },
    {
      path: '/login',
      element: (
        <Login
          secret={secret}
          setSecret={setSecret}
          username={username}
          setUsername={setUsername}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userData={userData}
          setUserData={setUserData}
        />
      ),
    },
    {
      path: '/signup',
      element: (
        <Signup
          secret={secret}
          setSecret={setSecret}
          username={username}
          setUsername={setUsername}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userData={userData}
          setUserData={setUserData}
        />
      ),
    },
    {
      path: '/dashboard',
      element: (
        <Dashboard
          secret={secret}
          setSecret={setSecret}
          username={username}
          setUsername={setUsername}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userData={userData}
          setUserData={setUserData}
        />
      ),
    },
  ]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
