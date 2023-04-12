// import dependencies
import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';

// import react components
import MetricCard from './MetricCard';
import LineGraphType1 from './LineGraphType1';
import LineGraphType2 from './LineGraphType2';
import PieGraphType1 from './PieGraphType1';

// import utilities
import { useQueryMetrics } from '../store/rqHooks';

type Props = {
  dbUri: string;
};

function DBTab(props: Props) {
  const [refetchInterval, setRefetchInterval] = useState(15000);

  // react-query custom hook for fetching db metrics from backend
  const { isLoading, isError, data } = useQueryMetrics(
    ['dbMetrics', props.dbUri],
    props.dbUri,
    refetchInterval
  );

  const handleChangeInterval = (event: SelectChangeEvent) => {
    setRefetchInterval(Number(event.target.value));
  };

  // coniditonal rendering if error received from fetch
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
    // coniditonal rendering if fetch has not returned yet
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
    /* coniditonal rendering if fetch has returned successfully
  data sent to child components utilizes optional chaining operators to protect
  from fatal errors when nested properties are being accessed in data returned from fetch */
    return (
      <div>
        <Box
          sx={{
            zIndex: 'tooltip',
            position: 'fixed',
            left: '1.2rem',
            top: '30rem',
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Polling Interval
          </InputLabel>
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
            <LineGraphType1 data={data.allQueries} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - All Queries Time Intervals'}>
            <PieGraphType1 data={data.allQueries?.all} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - All Select Queries'}>
            <LineGraphType1 data={data.selectQueries} />
          </MetricCard>
          <MetricCard
            cardLabel={'Query Times - All Select Queries Time Intervals'}
          >
            <PieGraphType1 data={data.selectQueries?.all} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - All Insert Queries'}>
            <LineGraphType1 data={data.insertQueries} />
          </MetricCard>
          <MetricCard
            cardLabel={'Query Times - All Insert Queries Time Intervals'}
          >
            <PieGraphType1 data={data.insertQueries?.all} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - All Update Queries'}>
            <LineGraphType1 data={data.updateQueries} />
          </MetricCard>
          <MetricCard
            cardLabel={'Query Times - All Update Queries Time Intervals'}
          >
            <PieGraphType1 data={data.updateQueries?.all} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - All Delete Queries'}>
            <LineGraphType1 data={data.deleteQueries} />
          </MetricCard>
          <MetricCard
            cardLabel={'Query Times - All Delete Queries Time Intervals'}
          >
            <PieGraphType1 data={data.deleteQueries?.all} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top 5 Queries'}>
            <LineGraphType2 data={data.topAllCalls} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top Select Queries'}>
            <LineGraphType2 data={data.topSelectCalls} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top Insert Queries'}>
            <LineGraphType2 data={data.topInsertCalls} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top Update Queries'}>
            <LineGraphType2 data={data.topUpdateCalls} />
          </MetricCard>
          <MetricCard cardLabel={'Query Times - Top Delete Queries'}>
            <LineGraphType2 data={data.topDeleteCalls} />
          </MetricCard>
          <MetricCard cardLabel="Database Name">
            <>
              name: {data.dbStats?.datname}
              <br />
              id: {data.dbStats?.datid}
            </>
          </MetricCard>
          <MetricCard cardLabel="Active Sessions">
            {data.statActivity}
          </MetricCard>
          <MetricCard cardLabel="Conflicts">
            {data.dbStats?.conflicts}
          </MetricCard>
          <MetricCard cardLabel="Deadlocks">
            {data.dbStats?.deadlocks}
          </MetricCard>
          <MetricCard cardLabel="Rolled Back Transactions">
            {data.dbStats?.xact_rollback}
          </MetricCard>
          <MetricCard cardLabel="Transactions Committed">
            {data.dbStats?.xact_commit}
          </MetricCard>
          <MetricCard cardLabel="Cache Hit Ratio">
            {Number(data.cacheHitRatio?.ratio).toFixed(4)}
          </MetricCard>
          <MetricCard cardLabel="Block Read Time">
            {data.dbStats?.blk_read_time}
          </MetricCard>
          <MetricCard cardLabel="Block Write Time">
            {data.dbStats?.blk_write_time}
          </MetricCard>
          <MetricCard cardLabel="Block Hits">
            {data.dbStats?.blks_hit}
          </MetricCard>
          <MetricCard cardLabel="Block Reads">
            {data.dbStats?.blks_read}
          </MetricCard>
          <MetricCard cardLabel="Checksum Failures">
            {data.dbStats?.checksum_failures}
          </MetricCard>
        </Box>
      </div>
    );
  }
}

export default DBTab;
