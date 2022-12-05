import * as React from 'react';
import { useState, useEffect } from 'react';
import GraphCard from './GraphCard';
import GraphLine from './GraphLine';
import GraphPie from './GraphPie';
import { Box, Popover } from '@mui/material';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

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
  const [popup, setPopup] = useState<JSX.Element>();
  const [graph1, setGraph1] = useState<JSX.Element>();
  const [graph2, setGraph2] = useState<JSX.Element>();
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

    if (fetchData.selectQueryTime) {
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
    }

    setGraph1(<GraphLine labels={labels} data={data} />);
    setGraph2(<GraphPie labels={Object.keys(pie)} data={Object.values(pie)} />);

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

  useEffect(() => {
    if (fetchData) {
      formatData(fetchData);
    }
  }, [fetchData]);

  if (fetchData) {
    return (
      <div>
        <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', pl: '11rem' }}>
          {popup}
          {graph1}
          {graph2}
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
