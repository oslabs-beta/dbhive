import * as React from 'react';
import Navbar from '../components/Navbar';
import ConnectDB from '../components/ConnectDB';

function Setup() {
  return (
    <div>
      <Navbar />
      <h2>Setup Page</h2>
      <ConnectDB />
    </div>
  );
}

export default Setup;
