import * as React from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GraphCard from './GraphCard';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  labels?: string[];
  data?: number[];
};

function Graph1(props: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart 1',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 2,
      },
      x: {
        display: false,
      },
    },
  };

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: props.data,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <GraphCard cardLabel="Execution Time for SELECT Queries">
      <Bar options={options} data={data} />
    </GraphCard>
  );
}

export default Graph1;
