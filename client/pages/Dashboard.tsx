import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Graph1 from '../components/Graph1';
import Graph2 from '../components/Graph2';
// import DBTab from '../components/DBTab';
import { UserData } from '../clientTypes';

import { Box, Card, Tabs, Tab, Typography, Button } from '@mui/material';

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

  if (!props.isLoggedIn) navigate('/login');

  useEffect(() => {
    if (!props.isLoggedIn) navigate('/login');
  }, []);

  type FetchData = {
    averageQueryTime?: [];
    cacheHitRatio?: [{ heap_read: string; heap_hit: string }];
    conflicts?: string;
    dbStats?: [];
    deadlocks?: string;
    deleteQueryTime?: [];
    insertQueryTime?: [];
    numOfRows?: [];
    rolledBackTransactions?: string;
    transactionsCommitted?: string;
    selectQueryTime?: [];
    times?: [];
  };

  const initialFetchData: FetchData = {
    averageQueryTime: [],
    cacheHitRatio: [{ heap_read: '', heap_hit: '' }],
    conflicts: '',
    dbStats: [],
    deadlocks: '',
    deleteQueryTime: [],
    insertQueryTime: [],
    numOfRows: [],
    rolledBackTransactions: '',
    transactionsCommitted: '',
    selectQueryTime: [],
    times: [],
  };

  const [graph1, setGraph1] = useState<JSX.Element>();
  const [graph2, setGraph2] = useState<JSX.Element>();
  const [graph3, setGraph3] = useState<string>();
  const [graph4, setGraph4] = useState<string>();
  const [graph5, setGraph5] = useState<string>();
  const [graph6, setGraph6] = useState<string>();
  const [fetchData, setFetchData] = useState(initialFetchData);
  const [activeTab, setActiveTab] = useState(0);

  function getQueryTimes() {
    fetch('/api/querytimes', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ uri: props.userData.dbs[0].uri }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFetchData(data);
        parseData(data);
      })
      .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
  }

  function parseData(fetchData: FetchData) {
    const labels: string[] = [];
    const data: number[] = [];
    const pie: {
      'time < .1s'?: number;
      '.1s > time < .5s'?: number;
      '.5s > time < 1s'?: number;
      '1s < time'?: number;
    } = {
      'time < .1s': 0,
      '.1s > time < .5s': 0,
      '.5s > time < 1s': 0,
      '1s < time': 0,
    };
    fetchData.selectQueryTime.forEach(
      (element: { query: string; mean_exec_time: number }) => {
        labels.push(element.query);
        data.push(element.mean_exec_time);
        if (element.mean_exec_time < 0.1) {
          pie['time < .1s']++;
        } else if (
          element.mean_exec_time > 0.1 &&
          element.mean_exec_time < 0.5
        ) {
          pie['.1s > time < .5s']++;
        } else if (element.mean_exec_time > 0.5 && element.mean_exec_time < 1) {
          pie['.5s > time < 1s']++;
        } else if (element.mean_exec_time > 1) {
          pie['1s < time']++;
        }
      }
    );
    setGraph1(<Graph1 labels={labels} data={data} />);
    setGraph2(<Graph2 labels={Object.keys(pie)} data={Object.values(pie)} />);
    setGraph3(fetchData.conflicts);
    setGraph4(fetchData.deadlocks);
    setGraph5(fetchData.rolledBackTransactions);
    setGraph6(fetchData.transactionsCommitted);
  }

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
    useEffect(() => {
      getQueryTimes();
    }, []);

    // useEffect(() => {
    //   const labels: string[] = [];
    //   const data: number[] = [];
    //   const pie: {
    //     'time < .1s'?: number;
    //     '.1s > time < .5s'?: number;
    //     '.5s > time < 1s'?: number;
    //     '1s < time'?: number;
    //   } = {
    //     'time < .1s': 0,
    //     '.1s > time < .5s': 0,
    //     '.5s > time < 1s': 0,
    //     '1s < time': 0,
    //   };
    //   if (fetchData.times) {
    //     fetchData.times.forEach(
    //       (element: { query: string; mean_exec_time: number }) => {
    //         labels.push(element.query);
    //         data.push(element.mean_exec_time);
    //         if (element.mean_exec_time < 0.1) {
    //           pie['time < .1s']++;
    //         } else if (
    //           element.mean_exec_time > 0.1 &&
    //           element.mean_exec_time < 0.5
    //         ) {
    //           pie['.1s > time < .5s']++;
    //         } else if (
    //           element.mean_exec_time > 0.5 &&
    //           element.mean_exec_time < 1
    //         ) {
    //           pie['.5s > time < 1s']++;
    //         } else if (element.mean_exec_time > 1) {
    //           pie['1s < time']++;
    //         }
    //       }
    //     );
    //     setGraph1(<Graph1 labels={labels} data={data} />);
    //     setGraph2(
    //       <Graph2 labels={Object.keys(pie)} data={Object.values(pie)} />
    //     );
    //   }
    // }, [fetchData]);

    type TabList = JSX.Element[];
    const tabList: TabList = [];
    if (props.userData.dbs[0] !== undefined) {
      props.userData.dbs.forEach((db, index) => {
        tabList.push(
          <Tab
            key={db.nickname}
            label={db.nickname}
            onClick={() => setActiveTab(index)}
          />
        );
      });
    }

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
        <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', pl: '11rem' }}>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Execution Time for SELECT Queries</p>
            {graph1}
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Query time interval distribution</p>
            {graph2}
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Conflicts</p>
            <Typography
              variant="h1"
              component="div"
              sx={{ mx: '1rem', color: 'green' }}
            >
              {graph3}
            </Typography>
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Deadlocks</p>
            <Typography
              variant="h1"
              component="div"
              sx={{ mx: '1rem', color: 'green' }}
            >
              {graph4}
            </Typography>
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Rolled Back Transactions</p>
            <Typography
              variant="h1"
              component="div"
              sx={{ mx: '1rem', color: 'yellow' }}
            >
              {graph5}
            </Typography>
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Transactions Committed</p>
            <Typography variant="h1" component="div" sx={{ mx: '1rem' }}>
              {graph6}
            </Typography>
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Query time interval distribution</p>
            {graph2}
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Execution Time for SELECT Queries</p>
            {graph1}
          </Card>

          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Execution Time for SELECT Queries</p>
            {graph1}
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Query time interval distribution</p>
            {graph2}
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Execution Time for SELECT Queries</p>
            {graph1}
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Query time interval distribution</p>
            {graph2}
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Execution Time for SELECT Queries</p>
            {graph1}
          </Card>
          <Card
            sx={{
              textAlign: 'center',
              mx: '1rem',
              mt: '1rem',
              p: '1rem',
              minWidth: '400px',
              maxWidth: '700px',
            }}
          >
            <p>Query time interval distribution</p>
            {graph2}
          </Card>
        </Box>
      </div>
    );
  }
}

export default Dashboard;
