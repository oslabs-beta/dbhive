import * as React from 'react';
import Navbar from '../components/Navbar';
import Graph1 from '../components/Graph1';

function Dashboard() {
  return (
    <div>
      <Navbar />
      <h2>Dashboard Page</h2>
      <Graph1 />
    </div>
  );
}

export default Dashboard;
