import * as React from 'react';
import { useState } from 'react';
import Input from './Input';
import { set, get } from 'idb-keyval';
import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

type Props = {
  username: string;
  setUsername: (eventTargetValue: string) => void;
  secret: string;
  setSecret: (eventTargetValue: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (eventTargetValue: boolean) => void;
};

function ConnectDB(props: Props) {
  const [nickname, setNickname] = useState('');
  const [uri, setUri] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('5432');
  const [database, setDatabase] = useState('');
  const [dBUsername, setDBUsername] = useState('');
  const [password, setPassword] = useState('');

  function submitHandler(type: string) {
    let stateData: {
      nickname: string;
      uri?: string;
      host?: string;
      port?: number;
      database?: string;
      dbUsername?: string;
      password?: string;
    };

    if (type === 'uri') {
      stateData = {
        nickname: nickname,
        uri: uri,
      };
    } else if (type === 'separate') {
      stateData = {
        nickname: nickname,
        uri: `postgres://${dBUsername}:${password}@${host}:${port}/${database}`,
      };
    }

    get(props.username)
      .then((data) => {
        const bytes = AES.decrypt(data, props.secret);
        const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (originalText.dbs !== undefined) originalText.dbs.push(stateData);
        else originalText.dbs = [stateData];
        console.log(originalText);
        const ciphertext = AES.encrypt(
          JSON.stringify(originalText),
          props.secret
        ).toString();

        // set(props.username, ciphertext)
        //   .then(() => {
        //     console.log('IndexedDB set successful');
        //   })
        //   .catch((err) => {
        //     console.log('IndexedDB set failed', err);
        //   });
      })
      .catch((err) => {
        console.log('IndexedDB get failed', err);
      });

    setNickname('');
    setUri('');
    setHost('');
    setPort('5432');
    setDatabase('');
    setDBUsername('');
    setPassword('');
  }

  return (
    <div className="form">
      <h3>Connect DB</h3>
      <Input
        inputClass={'input-group'}
        label={'Nickname: '}
        value={nickname}
        setInput={setNickname}
      />
      <hr />
      <Input
        inputClass={'input-group'}
        label={'Uri String: '}
        value={uri}
        setInput={setUri}
      />
      <button className="width-100-perc" onClick={() => submitHandler('uri')}>
        Submit
      </button>
      <hr />
      <Input
        inputClass={'input-group'}
        label={'Host: '}
        setInput={setHost}
        value={host}
      />
      <Input
        inputClass={'input-group'}
        label={'Port: '}
        setInput={setPort}
        value={port}
      />
      <Input
        inputClass={'input-group'}
        label={'Database: '}
        value={database}
        setInput={setDatabase}
      />
      <Input
        inputClass={'input-group'}
        label={'Username: '}
        value={dBUsername}
        setInput={setDBUsername}
      />
      <Input
        inputClass={'input-group'}
        inputType="password"
        label={'Password: '}
        value={password}
        setInput={setPassword}
      />
      <button
        className="width-100-perc"
        onClick={() => submitHandler('separate')}
      >
        Submit
      </button>
    </div>
  );
}

export default ConnectDB;
