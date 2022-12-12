import * as React from 'react';
import { useState } from 'react';
import MetricCard from './MetricCard';
import LineGraphType1 from './LineGraphType1';
import LineGraphType2 from './LineGraphType2';
import PieGraphType1 from './PieGraphType1';
import {
  Box,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { useQueryMetrics } from '../store/rqHooks';

type Props = {
  dbUri: string;
};

function DBTab(props: Props) {
  const [refetchInterval, setRefetchInterval] = useState(15000);

  const { isLoading, isError, data } = useQueryMetrics(
    ['dbMetrics', props.dbUri],
    props.dbUri,
    refetchInterval
  );

  const handleChangeInterval = (event: SelectChangeEvent) => {
    setRefetchInterval(Number(event.target.value));
  };

  if (isError) {
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
          status: request failed!
        </Box>
      </div>
    );
  } else if (isLoading) {
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
          status: connecting to db...
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <Box
          sx={{
            zIndex: 'tooltip',
            position: 'absolute',
            left: '1.2rem',
            top: '30rem',
          }}
        >
          <InputLabel id="demo-simple-select-label">Fetch Interval</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={refetchInterval.toString()}
            onChange={handleChangeInterval}
          >
            <MenuItem value={10000}>10 Seconds</MenuItem>
            <MenuItem value={15000}>15 Seconds</MenuItem>
            <MenuItem value={20000}>20 Seconds</MenuItem>
            <MenuItem value={30000}>30 Seconds</MenuItem>
            <MenuItem value={60000}>1 Minute</MenuItem>
            <MenuItem value={300000}>5 Minutes</MenuItem>
          </Select>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            pl: '11rem',
            float: 'right',
          }}
        >
          <MetricCard cardLabel={'Query Times - All Queries'}>
            <LineGraphType1 data={data.allTimes} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - All Queries Time Intervals'}>
            <PieGraphType1 data={data.allTimes?.all.rows} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top 5 Queries'}>
            <LineGraphType2 data={data.avgTimeTopAllCalls} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top Delete Queries'}>
            <LineGraphType2 data={data.avgTimeTopDeleteCalls} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top Insert Queries'}>
            <LineGraphType2 data={data.avgTimeTopInsertCalls} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top Select Queries'}>
            <LineGraphType2 data={data.avgTimeTopSelectCalls} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top Update Queries'}>
            <LineGraphType2 data={data.avgTimeTopUpdateCalls} />
          </MetricCard>
          <MetricCard cardLabel="Database Name">
            <>
              name: {data.dbStats?.[0].datname}
              <br />
              id: {data.dbStats?.[0].datid}
            </>
          </MetricCard>
          <MetricCard cardLabel="Conflicts">{data.conflicts}</MetricCard>
          <MetricCard cardLabel="Deadlocks">{data.deadlocks}</MetricCard>
          <MetricCard cardLabel="Rolled Back Transactions">
            {data.rolledBackTransactions}
          </MetricCard>
          <MetricCard cardLabel="Transactions Committed">
            {data.transactionsCommitted}
          </MetricCard>
          <MetricCard cardLabel="Cache Hit Ratio">
            {Number(data.cacheHitRatio?.[0].ratio).toFixed(4)}
          </MetricCard>
          <MetricCard cardLabel="Block Read Time">
            {data.dbStats?.[0].blk_read_time}
          </MetricCard>
          <MetricCard cardLabel="Block Write Time">
            {data.dbStats?.[0].blk_write_time}
          </MetricCard>
          <MetricCard cardLabel="Block Hits">
            {data.dbStats?.[0].blks_hit}
          </MetricCard>
          <MetricCard cardLabel="Block Reads">
            {data.dbStats?.[0].blks_read}
          </MetricCard>
          <MetricCard cardLabel="Checksum Failures">
            {data.dbStats?.[0].checksum_failures}
          </MetricCard>
        </Box>
      </div>
    );
  }
}

export default DBTab;
