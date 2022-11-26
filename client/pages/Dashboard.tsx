import * as React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Graph1 from '../components/Graph1';
import Graph2 from '../components/Graph2';

function Dashboard() {
  const [graph1, setGraph1] = useState<JSX.Element>();
  const [graph2, setGraph2] = useState<JSX.Element>();
  const [fetchData, setFetchData] = useState([]);

  function getQueryTimes() {
    fetch('/api/querytimes')
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setFetchData(response.times);
      });
  }

  useEffect(() => {
    if (fetchData.length === 0) {
      getQueryTimes();
    }
  }, []);

  useEffect(() => {
    const labels: string[] = [];
    const data: number[] = [];
    const pie: {
      'time < .1s'?: number;
      '.1s > time < .5s'?: number;
      '.5s > time < 1s'?: number;
      '1s < time'?: number;
    } = {
      'time < .1s': 0,
      '.1s > time < .5s': 0,
      '.5s > time < 1s': 0,
      '1s < time': 0,
    };
    fetchData.forEach((element: { query: string; mean_exec_time: number }) => {
      labels.push(element.query);
      data.push(element.mean_exec_time);
      if (element.mean_exec_time < 0.1) {
        pie['time < .1s']++;
      } else if (element.mean_exec_time > 0.1 && element.mean_exec_time < 0.5) {
        pie['.1s > time < .5s']++;
      } else if (element.mean_exec_time > 0.5 && element.mean_exec_time < 1) {
        pie['.5s > time < 1s']++;
      } else if (element.mean_exec_time > 1) {
        pie['1s < time']++;
      }
    });
    setGraph1(<Graph1 labels={labels} data={data} />);
    setGraph2(<Graph2 labels={Object.keys(pie)} data={Object.values(pie)} />);
  }, [fetchData]);

  // const graphProps = {
  //   data: queryTimes,
  // };

  return (
    <div>
      <Navbar />
      <h2>Dashboard Page</h2>
      <br />
      <br />
      {graph1}
      <br />
      <br />
      {graph2}
    </div>
  );
}

export default Dashboard;
