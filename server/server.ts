import dotenv from 'dotenv';
import path from 'path';
import metricAPI from './routes/metricApi';
import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from 'express';

// initialize configuration
dotenv.config();

const app = express();

// port is now available to the Node.js runtime
const port = 3000;

//Handle Parsing
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api', metricAPI);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/*', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index.html'));
  });
}
//testing instance - this could connect to a separate db
// if (process.env.NODE_ENV === 'test') {
//   app.use('/build', express.static(path.join(__dirname, '../build')));
//   app.get('/*', (req, res) => {
//     return res
//       .status(200)
//       .sendFile(path.join(__dirname, '../build/index.html'));
//   });
// }

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
  console.log(`Server started on Port:${port}`);
});
