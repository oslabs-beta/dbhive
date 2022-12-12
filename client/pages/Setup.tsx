import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ConnectDB from '../components/ConnectDB';

import useAppStore from '../store/appStore';

function Setup() {
  const navigate = useNavigate();

  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
  }, []);

  return (
    <div>
      <Navbar />
      <ConnectDB />
    </div>
  );
}

export default Setup;
