import * as React from 'react';
import Navbar from '../components/Navbar';
import {
  Button,
  Box,
  Card,
  Typography,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import dbhive_logo_transparent from '../assets/dbhive_logo_transparent.png';

function Docs() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          pl: '11rem',
        }}
      >
        <Card
          id="about"
          sx={{
            textAlign: 'center',
            width: 800,
            mx: 'auto',
            mt: '5rem',
            mb: '1rem',
            py: '4rem',
            px: '10rem',
          }}
        >
          <Box
            component="img"
            sx={{
              height: 200,
            }}
            alt="dbHive icon"
            src={dbhive_logo_transparent}
          />
          <Typography
            variant="h3"
            component="div"
            sx={{
              flexGrow: 1,
              my: '2rem',
              textShadow: '2px 2px 4px #cbc51a',
              color: 'rgb(255, 255, 255)',
            }}
          >
            Welcome to dbHive
            <Box
              className="pulse-animation"
              component="img"
              sx={{
                pt: '1rem',
                ml: '1rem',
                height: 50,
                filter:
                  'invert(85%) sepia(25%) saturate(4135%) hue-rotate(1deg) brightness(105%) contrast(106%)',
              }}
              alt="dbHive icon"
              src="https://img.icons8.com/ios-glyphs/512/bumblebee.png"
            />
          </Typography>
          <Box sx={{ color: 'rgb(255,255,255,.6)' }}>
            dbHive offers an interactive dashboard to visualize the performance
            of one or more PostgreSQL databases. By providing easily accessible
            information about the health and activity of a database, dbHive
            enables developers to make informed decisions that optimize the way
            they store their data.
          </Box>
          <a href="https://dbhive.net">
            <Button variant="contained" sx={{ mt: '4rem', width: '100%' }}>
              Learn More
            </Button>
          </a>
        </Card>
        <Card
          sx={{
            textAlign: 'center',
            width: 800,
            mx: 'auto',
            mb: '1rem',
            px: '4rem',
            py: '2rem',
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              textShadow: '2px 2px 4px #cbc51a',
              color: 'rgb(255, 255, 255)',
            }}
          >
            Get Started
          </Typography>
          <Divider sx={{ my: '1.5rem' }} />
          <Stepper orientation="vertical" sx={{ ml: '6rem' }}>
            <Step active={true}>
              <StepLabel>
                <Typography variant="h6">Sign Up</Typography>
              </StepLabel>
              <StepContent
                sx={{ px: '10rem', py: '1rem', color: 'rgb(255,255,255,.6)' }}
              >
                <Typography>
                  Create an account that can be utilized by one or more users.
                </Typography>
              </StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>
                <Typography variant="h6">Login</Typography>
              </StepLabel>
              <StepContent
                sx={{ px: '10rem', py: '1rem', color: 'rgb(255,255,255,.6)' }}
              >
                <Typography>
                  Login with your username and password information.
                </Typography>
              </StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>
                <Typography variant="h6">Connect Databases</Typography>
              </StepLabel>
              <StepContent
                sx={{ px: '10rem', py: '1rem', color: 'rgb(255,255,255,.6)' }}
              >
                <Typography>
                  Connect one or more PostgreSQL databases using either the URI
                  string or individual credentials.
                </Typography>
              </StepContent>
            </Step>
            <Step active={true}>
              <StepLabel>
                <Typography variant="h6">
                  Use the Dashboard to monitor your databases!
                </Typography>
              </StepLabel>
              <StepContent
                sx={{ px: '10rem', py: '1rem', color: 'rgb(255,255,255,.6)' }}
              >
                <Typography>
                  Access query execution times, most frequent queries,
                  conflicts, deadlocks, rolled back transactions, cache hit
                  ratio, block hits, and more.
                </Typography>
              </StepContent>
            </Step>
          </Stepper>
        </Card>
        <Card
          sx={{
            textAlign: 'center',
            width: 800,
            mx: 'auto',
            mb: '1rem',
            px: '10rem',
            py: '2rem',
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              textShadow: '2px 2px 4px #cbc51a',
              color: 'rgb(255, 255, 255)',
            }}
          >
            Troubleshooting
          </Typography>
          <Divider sx={{ my: '1.5rem' }} />
          <Typography sx={{ color: 'rgb(255,255,255,.6)' }}>
            If certain database metrics are not showing up in the dashboard,
            look into the database user's permissions. User permissions and
            admin privileges can vary depending on the database hosting service
            used.
          </Typography>
        </Card>
      </Box>
    </>
  );
}

export default Docs;
