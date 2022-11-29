// declare function require(moduleName: string): any;
import dotenv from 'dotenv';
import path from 'path';
import metricAPI from './routes/metricApi';
import express, { Request, Response, NextFunction } from 'express';

// initialize configuration
dotenv.config();

const app = express();

//Handle Parsing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = 3000;

app.use('/api', metricAPI);

//route handler

//test for server
// app.get('/test', (req, res) => {
//   return res.status(200).json({log: 'server is working here'})
// })

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/*', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index.html'));
  });
}

console.log('Hello from server');

//global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  console.log(err, 'error from global error handler');
  const errorObj = Object.assign({}, defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// start the express server
app.listen(port, () => {
  console.log('server started at http://localhost:3000');
});

export default app;
//module.exports = app;
