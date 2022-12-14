// import dependencies
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, Tabs, Tab, Typography, Button } from '@mui/material';

// import react components
import Navbar from '../components/Navbar';
import DBTab from '../components/DBTab';

// import utilities
import { toggleDashboardAuth } from '../clientMode';
import useAppStore from '../store/appStore';

function Dashboard() {
  const navigate = useNavigate();

  const isLoggedIn = useAppStore((state) => state.isLoggedIn);
  const userData = useAppStore((state) => state.userData);

  const [activeTab, setActiveTab] = useState(0);

  // check user authorization
  useEffect(() => {
    if (!isLoggedIn && toggleDashboardAuth) navigate('/login');
  }, []);

  // conditional rendering for when user has not added any databases
  if (userData.dbs[0] === undefined) {
    return (
      <div>
        <Navbar />
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mt: '4rem',
            ml: '11rem',
            backgroundColor: 'grey',
          }}
        >
          <Tabs value={0} aria-label="db tabs"></Tabs>
        </Box>
        <Card
          sx={{
            textAlign: 'center',
            ml: '12rem',
            mr: '1rem',
            my: '1rem',
            p: '2rem',
          }}
        >
          <Typography variant="h6" component="div" sx={{ mx: '1rem' }}>
            Please connect a database
          </Typography>
          <Button
            variant="contained"
            sx={{ my: '1rem', width: '30%' }}
            onClick={() => navigate('/setup')}
          >
            Setup
          </Button>
        </Card>
      </div>
    );
  }
  // default rendering for when user has already added databases
  else {
    type TabList = JSX.Element[];
    const tabList: TabList = [];
    const tabPanel: TabList = [];
    userData.dbs.forEach((db, index) => {
      tabPanel.push(
        <div key={db.nickname + index} hidden={activeTab !== index}>
          <DBTab dbUri={db.uri}></DBTab>
        </div>
      );
      tabList.push(
        <Tab
          key={db.nickname + index}
          label={
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223Z" />
                  <path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
                  <path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
                  <path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972Z" />
                </svg>
                {db.nickname}
              </Box>
            </>
          }
          onClick={() => {
            setActiveTab(index);
          }}
        />
      );
    });

    return (
      <div>
        <Navbar />
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mt: '4rem',
            ml: '11rem',
            backgroundColor: 'grey',
          }}
        >
          <Tabs value={activeTab} aria-label="db tabs">
            {tabList}
          </Tabs>
        </Box>
        {tabPanel}
      </div>
    );
  }
}

export default Dashboard;
