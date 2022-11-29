
import { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';

interface DatabaseController {
  queryTimes: (req: Request, res: Response, next: NextFunction) => void;
  numOfRows: (req: Request, res: Response, next: NextFunction) => void;
  topCalls: (req: Request, res: Response, next: NextFunction) => void;
  dbStats: (req: Request, res: Response, next: NextFunction) => void;
  connect: (req: Request, res: Response, next: NextFunction) => void;
}

const databaseController: DatabaseController = {
  queryTimes: async (req, res, next) => {
    //const queryString = 'SELECT query, mean_exec_time FROM pg_stat_statements';
    //this query will select the query and mean exec time of all queries that used "select *"
    const queryString =
      "select * from pg_stat_statements where query like '%SELECT * %'";
    let newQuery;
    try {
      newQuery = await db.query(queryString);
      //console.log(newQuery);
      res.locals.result = { times: newQuery.rows };
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.queryTimes ${error}`,
        status: 400,
        message: `Error has occured in databaseController.connection. ERROR: ${error}`,
      });
    }
  },

  //this method returns the number of rows that a given query touches, where the number is greater than 10
  numOfRows: async (req, res, next) => {
    const queryString =
      'select query, rows from pg_stat_statements where rows > 10';
    let quantOfRows;
    try {
      quantOfRows = await db.query(queryString);
      //console.log(quantOfRows);
      res.locals.result.numOfRows = quantOfRows.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.numOfRows ${error}`,
        status: 400,
        message: `Error has occured in databaseController.numOfRows. ERROR: ${error}`,
      });
    }
  },
  //this method will provide the top 5 most frequently called queries
  topCalls: async (req, res, next) => {
    const queryString =
      'select query, calls from pg_stat_statements order by calls desc limit 5';
    let callFrequency;
    try {
      callFrequency = await db.query(queryString);
      //console.log(callFrequency);
      res.locals.result.topCalls = callFrequency.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.mostFreqCalls ${error}`,
        status: 400,
        message: `Error has occured in databaseController.mostFreqCalls. ERROR: ${error}`,
      });
    }
  },
  //this method pulls the database-wide statistics for a specified database
  dbStats: async (req, res, next) => {
    const db3 = res.locals.db2;
    //postgres can be turned into a variable that will represent the requested db
    const queryString =
      "select * from pg_stat_database where datname = 'postgres'";
    let dbOverview;
    try {
      dbOverview = await db3.query(queryString);
      res.locals.dbStats = dbOverview.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.dbStats ${error}`,
        status: 400,
        message: `Error has occured in databaseController.dbStats. ERROR: ${error}`,
      });
    }
  },
  connect: (req, res, next) => {
    //postgres://dbhive:teamawesome@dbhive-test.crqqpw0ueush.us-west-2.rds.amazonaws.com:5432/postgres
    console.log(req.body.uri);
    const pool = new Pool({
      connectionString: req.body.uri,
    });

    const db2 = {
      query: (text: string, params?: Array<string>) => {
        return pool.query(text, params);
      },
    };

    res.locals.db2 = db2;
    return next();
  },
};

export default databaseController;
