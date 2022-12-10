import * as React from 'react';
import { useState, useEffect } from 'react';
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

function LineGraph1(props: Props) {
  const [dataProc, setDataProc] = useState<Line>({ labels: [], data: [] });
  const [detailsProc, setDetailsProc] = useState<JSX.Element[]>();

  useEffect(() => {
    if (props.data) {
      const line: Line = { labels: [], data: [] };
      props.data.all.rows.forEach(
        (element: { query: string; mean_exec_time: number }) => {
          line.labels.push(element.query);
          line.data.push(element.mean_exec_time);
        }
      );
      setDataProc(line);

      const details: any[] = [];
      details.push(
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
      details.push(
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
                query {index}: {element.query} sec
              </Typography>
              <Typography sx={{ flexGrow: 1, fontSize: '.8rem' }}>
                time: {element.mean_exec_time.toFixed(4)} sec
              </Typography>
            </Box>
          );
        }
      );
      details.push(
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
      setDetailsProc(details);
    }
  }, [props.data]);

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
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: 10,
          yMax: 10,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
        },
      },
    },
  };

  const data = {
    labels: dataProc.labels,
    datasets: [
      {
        label: 'All Queries',
        data: dataProc.data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Bar options={options} data={data} />{' '}
      <CollapseList
        label="more details..."
        content={
          <Box
            sx={{
              fontSize: '.8rem',
              color: 'white',
              textAlign: 'left',
            }}
          >
            {detailsProc}
          </Box>
        }
      />
    </>
  );
}

export default LineGraph1;
