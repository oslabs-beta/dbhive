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
import { set, get } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import { UserData } from './clientTypes';

function App() {
  const initialUserData: UserData = { decryption: 'isValid', dbs: [] };
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  // console.log('username', username);
  // console.log('secret', secret);

  function handleUserData() {
    const ciphertext = AES.encrypt(JSON.stringify(userData), secret).toString();
    set(username, ciphertext)
      .then(() => {
        console.log('IndexedDB: userData set successful');
      })
      .catch((err) => {
        console.log('IndexedDB: set failed', err);
      });
  }

  useEffect(() => {
    handleUserData();
    console.log('user data update!');
  }, [userData]);

  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
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
      element: <Signup />,
    },
    {
      path: '/dashboard',
      element: <Dashboard secret={secret} setSecret={setSecret} />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
