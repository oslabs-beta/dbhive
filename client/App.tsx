// import dependencies
import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// import react components
import Docs from './pages/Docs';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Setup from './pages/Setup';

// import utilities
import useAppStore from './store/appStore';
import { UserData } from './clientTypes';
import { seedDBs } from './clientMode';

// custom MUI theme
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
  const queryClient = new QueryClient();

  // update user data with seed data if given
  const updateUserData = useAppStore((state) => state.updateUserData);
  const initialUserData: UserData = {
    decryption: 'isValid',
    dbs: seedDBs,
  };
  updateUserData(initialUserData);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Docs />,
    },
    {
      path: '/setup',
      element: <Setup />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
  ]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
