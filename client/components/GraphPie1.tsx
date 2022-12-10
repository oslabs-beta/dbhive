import * as React from 'react';
import { useState, useEffect } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

type Props = {
  data?: any;
};

type Pie = {
  'time < .1s'?: number;
  '.1s > time < .5s'?: number;
  '.5s > time < 1s'?: number;
  '1s < time'?: number;
};

function GraphPie1(props: Props) {
  const [dataProc, setDataProc] = useState<Pie>({
    'time < .1s': 0,
    '.1s > time < .5s': 0,
    '.5s > time < 1s': 0,
    '1s < time': 0,
  });

  const pie = {
    'time < .1s': 0,
    '.1s > time < .5s': 0,
    '.5s > time < 1s': 0,
    '1s < time': 0,
  };

  useEffect(() => {
    if (props.data) {
      props.data.forEach(
        (element: { query: string; mean_exec_time: number }) => {
          if (element.mean_exec_time < 0.1) {
            pie['time < .1s']++;
          } else if (
            element.mean_exec_time > 0.1 &&
            element.mean_exec_time < 0.5
          ) {
            pie['.1s > time < .5s']++;
          } else if (
            element.mean_exec_time > 0.5 &&
            element.mean_exec_time < 1
          ) {
            pie['.5s > time < 1s']++;
          } else if (element.mean_exec_time > 1) {
            pie['1s < time']++;
          }
        }
      );
      setDataProc(pie);
    }
  }, [props.data]);

  const data = {
    labels: Object.keys(dataProc),
    datasets: [
      {
        label: 'Dataset 1',
        data: Object.values(dataProc),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}

export default GraphPie1;
