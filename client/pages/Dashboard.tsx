import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DBTab from '../components/DBTab';
import { UserData } from '../clientTypes';
import { toggleDashboardAuth } from '../clientMode';

import { Box, Card, Tabs, Tab, Typography, Button } from '@mui/material';

import useAppStore from '../store/appStore';

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

function Dashboard(props: Props) {
  const navigate = useNavigate();

  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!isLoggedIn && toggleDashboardAuth) navigate('/login');
  }, []);

  if (props.userData.dbs[0] === undefined) {
    return (
      <div>
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
  } else {
    type TabList = JSX.Element[];
    const tabList: TabList = [];
    const tabPanel: TabList = [];
    props.userData.dbs.forEach((db, index) => {
      tabPanel.push(
        <div key={db.nickname + index} hidden={activeTab !== index}>
          <DBTab dbUri={db.uri}></DBTab>
        </div>
      );
      tabList.push(
        <Tab
          key={db.nickname + index}
          label={db.nickname}
          onClick={() => {
            setActiveTab(index);
          }}
        />
      );
    });

    return (
      <div>
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
