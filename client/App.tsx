import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const greeting = <><h1><span className='spin'>🐝</span> We are dbHive <span className='spin'>🔍</span></h1><img className='postgres-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1280px-Postgresql_elephant.svg.png' alt='postgres-logo'></img></>;
  const router = createBrowserRouter([
    { path: '/', element: <>{greeting}</> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
