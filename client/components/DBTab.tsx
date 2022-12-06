import * as React from 'react';
import { useState, useEffect } from 'react';
import GraphCard from './GraphCard';
import GraphLine from './GraphLine';
import GraphPie from './GraphPie';
import { Box } from '@mui/material';

type Props = {
  dbUri: string;
};

type Pie = {
  'time < .1s'?: number;
  '.1s > time < .5s'?: number;
  '.5s > time < 1s'?: number;
  '1s < time'?: number;
};

type Line = { labels: string[]; data: number[] };

function DBTab(props: Props) {
  type FetchData = {
    [key: string]: any;
  } | null;

  const initialFetchData: FetchData = null;

  const [fetchData, setFetchData] = useState(initialFetchData);
  const [connectStatus, setConnectStatus] = useState('connecting to db...');
  const [lineGraph1, setLineGraph1] = useState({ labels: [''], data: [0] });
  const [lineGraph2, setLineGraph2] = useState({ labels: [''], data: [0] });
  const [pieGraph1, setPieGraph1] = useState<Pie>({
    'time < .1s': 0,
    '.1s > time < .5s': 0,
    '.5s > time < 1s': 0,
    '1s < time': 0,
  });
  // const [graph1, setGraph1] = useState<JSX.Element>();
  // const [graph2, setGraph2] = useState<JSX.Element>();
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
    const line1: Line = { labels: [], data: [] };
    const line2: Line = { labels: [], data: [] };
    const pie: Pie = {
      'time < .1s': 0,
      '.1s > time < .5s': 0,
      '.5s > time < 1s': 0,
      '1s < time': 0,
    };

    try {
      fetchData.allTimes.all.rows.forEach(
        (element: { query: string; mean_exec_time: number }) => {
          line1.labels.push(element.query);
          line1.data.push(element.mean_exec_time);
          if (element.mean_exec_time < 0.1) {
            pie['time < .1s']++;
          } else if (
            element.mean_exec_time > 0.1 &&
            element.mean_exec_time < 0.5
          ) {
            pie['.1s > time < .5s']++;
          } else if (
            element.mean_exec_time > 0.5 &&
            element.mean_exec_time < 1
          ) {
            pie['.5s > time < 1s']++;
          } else if (element.mean_exec_time > 1) {
            pie['1s < time']++;
          }
        }
      );
      setLineGraph1(line1);
      setPieGraph1(pie);
    } catch {
      console.log('fetchData.allTimes unavailable');
    }

    try {
      fetchData.avgTimeTopAllCalls.forEach(
        (element: { query: string; mean_exec_time: number }) => {
          line2.labels.push(element.query);
          line2.data.push(element.mean_exec_time);
        }
      );
      setLineGraph2(line2);
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
  }, []);

  setInterval(() => {
    formatData(fetchData);
  }, 20000);

  useEffect(() => {
    if (fetchData) {
      formatData(fetchData);
    }
  }, []);

  if (fetchData) {
    return (
      <div>
        <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', pl: '11rem' }}>
          <GraphLine
            title="Query Times - All Queries"
            label="All Queries"
            data={lineGraph1}
          />
          <GraphLine
            title="Query Times - Top 5 Queries"
            label="Top 5 Queries"
            data={lineGraph2}
          />
          <GraphPie
            labels={Object.keys(pieGraph1)}
            data={Object.values(pieGraph1)}
          />
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
