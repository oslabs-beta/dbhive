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
import GraphCard from './GraphCard';

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
  label?: string;
  data?: { labels: string[]; data: number[] };
};

function Graph1(props: Props) {
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
    labels: props.data.labels,
    datasets: [
      {
        label: props.label,
        data: props.data.data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <GraphCard cardLabel={props.title}>
      <Bar options={options} data={data} />
    </GraphCard>
  );
}

export default Graph1;
