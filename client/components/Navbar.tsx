import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/login')}>Login</button>
      <button onClick={() => navigate('/setup')}>Setup</button>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
    </nav>
  );
}

export default Navbar;
