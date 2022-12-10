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
  xMax?: number;
};

type Line = { labels: string[]; data: number[] };

function LineGraphType2(props: Props) {
  const [dataProc, setDataProc] = useState<Line>({ labels: [], data: [] });
  const [detailsProc, setDetailsProc] = useState<JSX.Element>();

  useEffect(() => {
    const details: any[] = [];

    if (props.data) {
      const line: Line = { labels: [], data: [] };
      props.data.forEach(
        (element: { query: string; mean_exec_time: number }, index: number) => {
          line.labels.push(element.query);
          line.data.push(element.mean_exec_time);
          details.push(
            <Box
              sx={{
                overflowX: 'scroll',
                whiteSpace: 'nowrap',
                my: '.7rem',
              }}
              key={index}
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
      setDetailsProc(
        <ListItemText
          sx={{
            bgcolor: 'RGB(255, 255, 255, .05)',
            my: '.2rem',
            px: '.5rem',
          }}
          key="mean"
        >
          {details}
        </ListItemText>
      );

      setDataProc(line);
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
        max: 5,
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
      <Bar options={options} data={data} />
      <CollapseList label="more details..." content={detailsProc} />
    </>
  );
}

export default LineGraphType2;
