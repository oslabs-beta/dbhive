import * as React from 'react';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { get } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
// import { isLiteralTypeNode } from 'typescript';
import { UserData } from '../clientTypes';

type Props = {
  username: string;
  setUsername: (eventTargetValue: string) => void;
  secret: string;
  setSecret: (eventTargetValue: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (eventTargetValue: boolean) => void;
  userData: UserData;
  setUserData: (eventTargetValue: UserData) => void;
};

function Login(props: Props) {
  const navigate = useNavigate();

  function submitHandler() {
    get(props.username)
      .then((data) => {
        const bytes = AES.decrypt(data, props.secret);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        if (originalText) {
          const parsedText = JSON.parse(originalText);
          if (parsedText.decryption === 'isValid') {
            props.setIsLoggedIn(true);
            props.setUserData(parsedText);
            console.log('login sucessful');
            navigate('/dashboard');
          } else {
            alert('username or password is incorrect');
          }
        } else {
          alert('username or password is incorrect');
        }
      })
      .catch((err) => {
        console.log('IndexedDB get failed', err);
        alert('username or password is incorrect');
      });
  }

  return (
    <div>
      <Navbar />
      <h2>Login Page</h2>
      <div className="form">
        <h3>Login</h3>
        <Input
          inputClass={'input-group'}
          label={'Username: '}
          setInput={props.setUsername}
          value={props.username}
        />
        <Input
          inputClass={'input-group'}
          inputType="password"
          label={'Password: '}
          setInput={props.setSecret}
          value={props.secret}
        />
        <button className="width-100-perc" onClick={submitHandler}>
          Submit
        </button>
        <button className="width-100-perc" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
