import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Setup from './pages/Setup';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/setup', element: <Setup /> },
    { path: '/login', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
