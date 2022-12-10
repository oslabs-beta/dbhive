import * as React from 'react';
import { useState, useEffect } from 'react';
import GraphCard from './GraphCard';
import LineGraph1 from './LineGraph1';
import LineGraph2 from './LineGraph2';
import GraphPie1 from './GraphPie1';
import { Box } from '@mui/material';

type Props = {
  dbUri: string;
};

function DBTab(props: Props) {
  type FetchData = {
    [key: string]: any;
  } | null;

  const initialFetchData: FetchData = null;

  const [fetchData, setFetchData] = useState(initialFetchData);
  const [connectStatus, setConnectStatus] = useState('connecting to db...');
  const [lineGraph1, setLineGraph1] = useState();
  const [lineGraph2, setLineGraph2] = useState();
  const [pieGraph1, setPieGraph1] = useState();
  const [datName, setDatName] = useState<string>();
  const [datID, setDatID] = useState<string>();
  const [chr, setChr] = useState<string | number>();
  const [conflicts, setConflicts] = useState<string>();
  const [deadlocks, setDeadlocks] = useState<string>();
  const [rbt, setRbt] = useState<string>();
  const [tc, setTc] = useState<string>();
  const [brt, setBrt] = useState<string>();
  const [bwt, setBwt] = useState<string>();
  const [bh, setBh] = useState<string>();
  const [br, setBr] = useState<string>();
  const [cf, setCf] = useState<string>();

  function getMetrics(uri: string) {
    fetch('/api/querytimes', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ uri: uri }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('fetched data', data);
        if (typeof data === 'object') setFetchData(data);
        else setConnectStatus('db connection failed...');
      })
      .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
  }

  function formatData(fetchData: FetchData) {
    try {
      setLineGraph1(fetchData.allTimes);
      setPieGraph1(fetchData.allTimes.all.rows);
    } catch {
      console.log('fetchData.allTimes unavailable');
    }

    try {
      setLineGraph2(fetchData.avgTimeTopAllCalls);
    } catch {
      console.log('fetchData.avgTimeTopAllCalls unavailable');
    }

    try {
      setDatName(fetchData.dbStats[0].datname);
    } catch {
      setDatName('unavailable');
    }

    try {
      setDatID(fetchData.dbStats[0].datid);
    } catch {
      setDatID('unavailable');
    }

    try {
      setChr(Number(fetchData.cacheHitRatio[0].ratio).toFixed(4));
    } catch {
      setChr('unavailable');
    }

    try {
      setConflicts(fetchData.conflicts);
    } catch {
      setConflicts('unavailable');
    }

    try {
      setDeadlocks(fetchData.deadlocks);
    } catch {
      setDeadlocks('unavailable');
    }

    try {
      setRbt(fetchData.rolledBackTransactions);
    } catch {
      setRbt('unavailable');
    }

    try {
      setTc(fetchData.transactionsCommitted);
    } catch {
      setTc('unavailable');
    }

    try {
      setBrt(fetchData.dbStats[0].blk_read_time);
    } catch {
      setBrt('unavailable');
    }

    try {
      setBwt(fetchData.dbStats[0].blk_write_time);
    } catch {
      setBwt('unavailable');
    }

    try {
      setBh(fetchData.dbStats[0].blks_hit);
    } catch {
      setBh('unavailable');
    }

    try {
      setBr(fetchData.dbStats[0].blks_read);
    } catch {
      setBr('unavailable');
    }

    try {
      setCf(fetchData.dbStats[0].checksum_failures);
    } catch {
      setCf('unavailable');
    }
  }

  useEffect(() => {
    getMetrics(props.dbUri);

    // Turn off Interval
    // const fetchInterval = setInterval(() => {
    //   getMetrics(props.dbUri);
    // }, 20000);

    // return () => {
    //   clearInterval(fetchInterval);
    // };
  }, []);

  useEffect(() => {
    if (fetchData) {
      formatData(fetchData);
    }
  }, [fetchData]);

  if (fetchData) {
    return (
      <div>
        <Box
          sx={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            pl: '11rem',
            float: 'right',
          }}
        >
          <GraphCard cardLabel={'Query Times - All Queries'}>
            <LineGraph1 data={lineGraph1} />
          </GraphCard>
          <GraphCard cardLabel={'Query Times - Top 5 Queries'}>
            <LineGraph2 data={lineGraph2} />
          </GraphCard>
          <GraphCard cardLabel={'Query Times - Intervals'}>
            <GraphPie1 data={pieGraph1} />
          </GraphCard>

          <GraphCard cardLabel="Database Name">
            <>
              name: {datName}
              <br />
              id: {datID}
            </>
          </GraphCard>
          <GraphCard cardLabel="Conflicts">{conflicts}</GraphCard>
          <GraphCard cardLabel="Deadlocks">{deadlocks}</GraphCard>
          <GraphCard cardLabel="Rolled Back Transactions">{rbt}</GraphCard>
          <GraphCard cardLabel="Transactions Committed">{tc}</GraphCard>
          <GraphCard cardLabel="Cache Hit Ratio">{chr}</GraphCard>
          <GraphCard cardLabel="Block Read Time">{brt}</GraphCard>
          <GraphCard cardLabel="Block Write Time">{bwt}</GraphCard>
          <GraphCard cardLabel="Block Hits">{bh}</GraphCard>
          <GraphCard cardLabel="Block Reads">{br}</GraphCard>
          <GraphCard cardLabel="Checksum Failures">{cf}</GraphCard>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <Box
          sx={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            pl: '12rem',
            pt: '1rem',
          }}
        >
          status: {connectStatus}
        </Box>
      </div>
    );
  }
}

export default DBTab;
