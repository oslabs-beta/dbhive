import * as React from 'react';
import MetricCard from './MetricCard';
import LineGraphType1 from './LineGraphType1';
import LineGraphType2 from './LineGraphType2';
import PieGraphType1 from './PieGraphType1';
import { Box } from '@mui/material';
import { useQuery } from 'react-query';

type Props = {
  dbUri: string;
};

function DBTab(props: Props) {
  const { isLoading, isError, data } = useQuery(props.dbUri, async () => {
    const res = await fetch('/api/querytimes', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ uri: props.dbUri }),
    });
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });

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
