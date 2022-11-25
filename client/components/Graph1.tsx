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
        text: 'Chart.js Bar Chart',
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

  return <Bar options={options} data={data} />;
}

export default Graph1;
