import * as React from 'react';
import Navbar from '../components/Navbar';

import { Card, Typography } from '@mui/material';

function Home() {
  return (
    <>
      <Navbar />
      <Card
        sx={{
          textAlign: 'center',
          width: 400,
          mx: 'auto',
          my: '10rem',
          p: '4rem',
        }}
      >
        <Typography
          variant="h2"
          component="div"
          sx={{
            flexGrow: 1,
            mb: '2rem',
            textShadow: '2px 2px 4px #cbc51a',
            color: 'rgb(255, 255, 255)',
          }}
          // color="primary"
        >
          <span className="spin">🐝</span> We are dbHive{' '}
          <span className="spin">🔍</span>
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
