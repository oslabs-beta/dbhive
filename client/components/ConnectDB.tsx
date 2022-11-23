import React, { useState } from 'react';
import Input from './Input';

function ConnectDB() {
  const [uri, setUri] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler() {
    fetch('/api/placeholder', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        uri: uri,
        host: host,
        port: port,
        database: database,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
  }

  return (
    <div className="form">
      <h3>Connect DB</h3>
      <Input inputClass={'input-group'} label={'Uri String: '} setInput={setUri} />
      <hr />
      <Input inputClass={'input-group'} label={'Host: '} setInput={setHost} />
      <Input inputClass={'input-group'} label={'Port: '} setInput={setPort} />
      <Input inputClass={'input-group'} label={'Database: '} setInput={setDatabase} />
      <Input inputClass={'input-group'} label={'Username: '} setInput={setUsername} />
      <Input inputClass={'input-group'} inputType="password" label={'Password: '} setInput={setPassword} />
      <button className="width-100-perc" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
}

export default ConnectDB;
