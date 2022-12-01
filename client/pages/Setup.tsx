import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ConnectDB from '../components/ConnectDB';

type Props = {
  username: string;
  setUsername: (eventTargetValue: string) => void;
  secret: string;
  setSecret: (eventTargetValue: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (eventTargetValue: boolean) => void;
};

function Setup(props: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isLoggedIn) navigate('/');
  }, []);

  if (props.isLoggedIn) {
    return (
      <div>
        <Navbar />
        <h2>Setup Page</h2>
        <ConnectDB
          secret={props.secret}
          setSecret={props.setSecret}
          username={props.username}
          setUsername={props.setUsername}
          isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Setup;
