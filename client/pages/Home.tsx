import * as React from 'react';
import Navbar from '../components/Navbar';

import { Box, Card, Typography } from '@mui/material';

function Home() {
  return (
    <>
      <Navbar />
      <Card
        sx={{
          textAlign: 'center',
          ml: '13rem',
          mr: '1.5rem',
          my: '5.5rem',
          p: '2rem',
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
          // color="primary"
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
          />{' '}
          Welcome to dbHive{' '}
        </Typography>
      </Card>

      {/* <img
        className="postgres-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1280px-Postgresql_elephant.svg.png"
        alt="postgres-logo"
      ></img> */}
    </>
  );
}

export default Home;
