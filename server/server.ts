import path from 'path';
import metricAPI from './routes/metricApi';
import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from 'express';

const app = express();

const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

// route for all Postgres Metrics
app.use('/api', metricAPI);

// serves static files in production mode
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/*', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index.html'));
  });
}

// testing instance - this could connect to a separate db
if (process.env.NODE_ENV === 'test') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/*', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { Error: 'An error occurred' },
  };
  console.log('Global error handler:', err);
  const errorObj = Object.assign({}, defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server started on Port:${port}`);
});
