// import dependencies
import * as React from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, ListItemText, Typography, Divider } from '@mui/material';
import { AllQueries } from '../clientTypes';

// import react components
import CollapseList from './CollapseList';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
);

type Props = {
  title?: string;
  data?: AllQueries;
};

function LineGraphType1(props: Props) {
  const detailsProc: JSX.Element[] = [];
  const graphLabels: string[] = [];
  const graphData: number[] = [];

  if (props.data?.all) {
    props.data.all.forEach(
      (element: { query: string; mean_exec_time: number }) => {
        graphLabels.push(element.query);
        graphData.push(element.mean_exec_time);
      }
    );

    // used to populate collapsing details list
    detailsProc.push(
      <ListItemText
        sx={{ bgcolor: 'RGB(255, 255, 255, .05)', my: '.2rem', px: '.5rem' }}
        key="mean"
      >
        <Typography sx={{ flexGrow: 1, my: '.5rem', fontSize: '1.2rem' }}>
          mean
        </Typography>
        <Divider />
        <Typography sx={{ flexGrow: 1, my: '.5rem', fontSize: '.8rem' }}>
          {props.data.mean.toFixed(4)} sec
        </Typography>
      </ListItemText>
    );
    detailsProc.push(
      <ListItemText
        sx={{
          bgcolor: 'RGB(255, 255, 255, .05)',
          my: '.2rem',
          px: '.5rem',
        }}
        key="median"
      >
        <Typography sx={{ flexGrow: 1, my: '.5rem', fontSize: '1.2rem' }}>
          median
        </Typography>
        <Divider />
        <Typography sx={{ flexGrow: 1, my: '.5rem', fontSize: '.8rem' }}>
          {props.data.median.toFixed(4)} sec
        </Typography>
      </ListItemText>
    );

    const slowQueries: JSX.Element[] = [];
    slowQueries.push(
      <Box key="sqHeading">
        <Typography sx={{ flexGrow: 1, my: '.5rem', fontSize: '1.2rem' }}>
          slowest queries
        </Typography>
        <Divider />
      </Box>
    );
    props.data.slowestQueries.forEach(
      (element: { query: string; mean_exec_time: number }, index: number) => {
        slowQueries.push(
          <Box
            sx={{
              overflowX: 'scroll',
              whiteSpace: 'nowrap',
              my: '.7rem',
            }}
            key={'sq' + index}
          >
            <Typography sx={{ flexGrow: 1, fontSize: '.8rem' }}>
              query {index}: {element.query}
            </Typography>
            <Typography sx={{ flexGrow: 1, fontSize: '.8rem' }}>
              time: {element.mean_exec_time?.toFixed(4)} sec
            </Typography>
          </Box>
        );
      }
    );
    detailsProc.push(
      <ListItemText
        sx={{
          bgcolor: 'RGB(255, 255, 255, .05)',
          my: '0',
          px: '.5rem',
        }}
        key="slowQ"
      >
        {slowQueries}
      </ListItemText>
    );
  }

  // configure ChartJS graph options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 20,
        display: true,
        title: {
          display: true,
          text: 'query times [seconds]',
        },
      },
      x: {
        display: false,
      },
    },
  };

  const data = {
    labels: graphLabels,
    datasets: [
      {
        label: 'queries',
        data: graphData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />{' '}
      <CollapseList label="more details..." content={detailsProc} />
    </>
  );
}

export default LineGraphType1;
