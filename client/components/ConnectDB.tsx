import React, { useState } from 'react';
import Input from './Input';

// URI
// Host name
// Port
// Database
// Username
// Password
function ConnectDB() {
  const [uri, setUri] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="connect-db-form">
      <Input inputClass={'input-group'} label={'Uri: '} setInput={setUri} />
      <Input inputClass={'input-group'} label={'Host: '} setInput={setHost} />
      <Input inputClass={'input-group'} label={'Port: '} setInput={setPort} />
      <Input inputClass={'input-group'} label={'Database: '} setInput={setDatabase} />
      <Input inputClass={'input-group'} label={'Username: '} setInput={setUsername} />
      <Input inputClass={'input-group'} inputType="password" label={'Password: '} setInput={setPassword} />
      <button className="width-100-perc">Submit</button>
    </div>
  );
}

export default ConnectDB;
