import path from 'path';
import metricAPI from './routes/metricApi';
import express, {
  json,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schemas/schema';

const app = express();

const PORT = process.env.PORT || '3000';

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// // route for all Postgres Metrics
// app.use('/api', metricAPI);

// serves static files in production mode
if (process.env.NODE_ENV !== 'development') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/*', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index.html'));
  });
}

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   const defaultError = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { Error: 'An error occurred' },
//   };

//   const errorObj = Object.assign({}, defaultError, err);
//   return res.status(errorObj.status).json(errorObj.message);
// });

const server = app.listen(PORT, () => {
  console.log(`Server started on ${PORT}...`);
});

module.exports = server;
