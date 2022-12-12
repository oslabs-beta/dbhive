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
import CollapseList from './CollapseList';
import { Box, ListItemText, Typography, Divider } from '@mui/material';

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
  data?: any;
};

type Line = { labels: string[]; data: number[] };

function LineGraphType1(props: Props) {
  const dataProc: Line = { labels: [], data: [] };
  const detailsProc: JSX.Element[] = [];

  if (props.data) {
    props.data.all.rows.forEach(
      (element: { query: string; mean_exec_time: number }) => {
        dataProc.labels.push(element.query);
        dataProc.data.push(element.mean_exec_time);
      }
    );

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
          {props.data.mean.rows[0].averagequerytime.toFixed(4)} sec
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
          {props.data.median.rows[0].median.toFixed(4)} sec
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
    props.data.slowestQueries.rows.forEach(
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
              time: {element.mean_exec_time.toFixed(4)} sec
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
        // type: 'logarithmic',
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
    labels: dataProc.labels,
    datasets: [
      {
        label: 'queries',
        data: dataProc.data,
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
