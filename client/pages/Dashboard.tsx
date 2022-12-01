import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { get } from 'idb-keyval';
// import CryptoJS from 'crypto-js';
// import AES from 'crypto-js/aes';
import Navbar from '../components/Navbar';
import Graph1 from '../components/Graph1';
import Graph2 from '../components/Graph2';
import { UserData } from '../clientTypes';

type Props = {
  username: string;
  setUsername: (eventTargetValue: string) => void;
  secret: string;
  setSecret: (eventTargetValue: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (eventTargetValue: boolean) => void;
  userData: UserData;
  setUserData: (eventTargetValue: UserData) => void;
};

function Dashboard(props: Props) {
  const navigate = useNavigate();

  const [graph1, setGraph1] = useState<JSX.Element>();
  const [graph2, setGraph2] = useState<JSX.Element>();
  const [fetchData, setFetchData] = useState([]);

  function getQueryTimes() {
    if (props.userData.dbs[0] !== undefined) {
      fetch('/api/querytimes', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ uri: props.userData.dbs[0].uri }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFetchData(data.times);
        })
        .catch((error) => console.log('ERROR: could not post-fetch: ' + error));
    }

    // get('dbhive-data')
    //   .then((data) => {
    //     const bytes = AES.decrypt(data, props.secret);
    //     const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    //     // postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres
    //     fetch('/api/querytimes', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'Application/JSON',
    //       },
    //       body: JSON.stringify({ uri: originalText.uri }),
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         setFetchData(data.times);
    //       })
    //       .catch((error) =>
    //         console.log('ERROR: could not post-fetch: ' + error)
    //       );
    //   })
    //   .catch((err) => {
    //     console.log('IndexedDB get failed', err);
    //   });
  }

  useEffect(() => {
    if (!props.isLoggedIn) navigate('/');
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
    if (fetchData) {
      fetchData.forEach(
        (element: { query: string; mean_exec_time: number }) => {
          labels.push(element.query);
          data.push(element.mean_exec_time);
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
      setGraph1(<Graph1 labels={labels} data={data} />);
      setGraph2(<Graph2 labels={Object.keys(pie)} data={Object.values(pie)} />);
    }
  }, [fetchData]);

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
