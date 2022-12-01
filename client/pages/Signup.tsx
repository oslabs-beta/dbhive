import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { set, get } from 'idb-keyval';
import AES from 'crypto-js/aes';
// import SHA3 from 'crypto-js/sha3';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');

  function submitHandler() {
    // Encrypt
    const ciphertext = AES.encrypt(
      JSON.stringify({ decryption: 'isValid' }),
      secret
    ).toString();

    get(username)
      .then((data) => {
        if (data === undefined) {
          set(username, ciphertext)
            .then(() => {
              alert('user added successfully');
              navigate('/login');
            })
            .catch((err) => {
              console.log('IndexedDB set failed', err);
            });
        } else {
          alert('username already taken');
        }
      })
      .catch((err) => {
        console.log('IndexedDB get failed', err);
      });

    setUsername('');
    setSecret('');
  }

  return (
    <div>
      <Navbar />
      <h2>Sign Up Page</h2>
      <div className="form">
        <h3>Sign Up</h3>
        <Input
          inputClass={'input-group'}
          label={'Username: '}
          setInput={setUsername}
          value={username}
        />
        <Input
          inputClass={'input-group'}
          inputType="password"
          label={'Password: '}
          setInput={setSecret}
          value={secret}
        />
        <button className="width-100-perc" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Signup;
