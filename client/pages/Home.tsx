import * as React from 'react';
import Navbar from '../components/Navbar';
import { UserData } from '../clientTypes';

import { Box, Card, Typography } from '@mui/material';

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

function Home(props: Props) {
  return (
    <>
      <Navbar
        secret={props.secret}
        setSecret={props.setSecret}
        username={props.username}
        setUsername={props.setUsername}
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
        userData={props.userData}
        setUserData={props.setUserData}
      />
      <Card
        sx={{
          textAlign: 'center',
          ml: '12rem',
          mr: '1rem',
          my: '5rem',
          p: '4rem',
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            flexGrow: 1,
            mb: '2rem',
            textShadow: '2px 2px 4px #cbc51a',
            color: 'rgb(255, 255, 255)',
          }}
        >
          <Box
            className="pulse-animation"
            component="img"
            sx={{
              pt: 1,
              mr: 1,
              height: 50,
              filter:
                'invert(85%) sepia(25%) saturate(4135%) hue-rotate(1deg) brightness(105%) contrast(106%)',
            }}
            alt="dbHive icon"
            src="https://img.icons8.com/ios-glyphs/512/bumblebee.png"
          />
          Welcome to dbHive
        </Typography>
        <Box>
          <p>
            DbHive is a database monitoring and analysis tool for PostgreSQL
            databases.
          </p>
          <p>
            DbHive is highly configurable, capable of monitoring multiple
            databases, and is committed to the open source community!
          </p>
        </Box>
        {/* <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            mt: '4rem',
            mb: '2rem',
          }}
        >
          DOCS
        </Typography>
        <Box sx={{ textAlign: 'left' }}>
          <p>DbHive currently only supports PostgreSQL databases.</p>
          <p>Click to Get Started!</p>
        </Box>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            mt: '4rem',
            mb: '2rem',
          }}
        >
          GET STARTED
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            mt: '4rem',
            mb: '2rem',
          }}
        >
          FAQ
        </Typography> */}
      </Card>
    </>
  );
}

export default Home;
