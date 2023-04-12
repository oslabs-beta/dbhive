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
import { Box, ListItemText, Typography } from '@mui/material';

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
  data?: [{ query: string; mean_exec_time: number }];
  xMax?: number;
};

function LineGraphType2(props: Props) {
  const detailsProc: JSX.Element[] = [];
  const graphLabels: string[] = [];
  const graphData: number[] = [];

  if (props.data) {
    const details: JSX.Element[] = [];
    props.data.forEach(
      (element: { query: string; mean_exec_time: number }, index: number) => {
        graphLabels.push(element.query);
        graphData.push(element.mean_exec_time);
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
    detailsProc.push(
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
        max: 5,
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
      <Bar options={options} data={data} />
      <CollapseList label="more details..." content={detailsProc} />
    </>
  );
}

export default LineGraphType2;
