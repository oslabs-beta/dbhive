import React from 'react';
import Navbar from '../components/Navbar';
import ConnectDB from '../components/ConnectDB';

function Setup() {
  return (
    <div>
      <Navbar />
      <h1>Setup Page</h1>
      <ConnectDB />
    </div>
  );
}

export default Setup;
