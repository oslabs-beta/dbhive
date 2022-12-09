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

function LineGraph2(props: Props) {
  const [dataProc, setDataProc] = useState<Line>({ labels: [], data: [] });

  useEffect(() => {
    if (props.data) {
      const line: Line = { labels: [], data: [] };
      props.data.forEach(
        (element: { query: string; mean_exec_time: number }) => {
          line.labels.push(element.query);
          line.data.push(element.mean_exec_time);
        }
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
      <Bar options={options} data={data} />
    </>
  );
}

export default LineGraph2;
