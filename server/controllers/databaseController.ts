import { RequestHandler } from 'express';
import { resourceLimits } from 'worker_threads';

type DatabaseController = {
  queryTimes: RequestHandler;
  numOfRows: RequestHandler;
  topCalls: RequestHandler;
  dbStats: RequestHandler;
  insertQueryTime: RequestHandler;
  selectQueryTime: RequestHandler;
  updateQueryTime: RequestHandler;
  deleteQueryTime: RequestHandler;
  cacheHitRatio: RequestHandler;
  averageQueryTime: RequestHandler;
};

const databaseController: DatabaseController = {
  // STILL TO DO: add INSERT, SELECT, DELETE, UPDATE and clean up code and chunk into 10% ranges
  queryTimes: async (req, res, next) => {
    const db = res.locals.dbConnection;
    //const queryString = 'SELECT query, mean_exec_time FROM pg_stat_statements';
    //this query will select the query and mean exec time of all queries that used "select *"
    try {
      const queryTimes = await db.query('select * from pg_stat_statements');
      //console.log(newQuery);
      res.locals.result.times = queryTimes.rows;
      //const
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
    const db = res.locals.dbConnection;
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
  // STILL TO DO: QUERY TIMES OF TOP 5 MOST FREQUENT QUERIES - add 4 more calls and clean up code
  // Mean Execution Time of the 5 Queries with Highest Number of Calls, also divided into query type
  topCalls: async (req, res, next) => {
    const db = res.locals.dbConnection;
    try {
      // retrieve the top five calls
      const topAllCalls = await db.query(
        'select query, mean_exec_time from pg_stat_statements order by calls desc limit 5'
      );
      const topSelectCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements where query like '%SELECT %' order by calls desc limit 5`
      );
      const topInsertCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements where query like '%INSERT %' order by calls desc limit 5`
      );
      const topDeleteCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements where query like '%DELETE %' order by calls desc limit 5`
      );
      const topUpdateCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements where query like '%UPDATE %' order by calls desc limit 5`
      );
      // find the query time of each of these calls
      // store them in an object to return
      console.log('this is topSelect', topSelectCalls.rows);
      res.locals.result.avgTimeTopAllCalls = topAllCalls.rows;
      res.locals.result.avgTimeTopSelectCalls = topSelectCalls.rows;
      res.locals.result.avgTimeTopInsertCalls = topInsertCalls.rows;
      res.locals.result.avgTimeTopDeleteCalls = topDeleteCalls.rows;
      res.locals.result.avgTimeTopUpdateCalls = topUpdateCalls.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.topCalls ${error}`,
        status: 400,
        message: `Error has occured in databaseController.topCalls. ERROR: ${error}`,
      });
    }
  },
  //this method pulls the database-wide statistics for a specified database
  dbStats: async (req, res, next) => {
    const db = res.locals.dbConnection;
    //postgres can be turned into a variable that will represent the requested db
    try {
      const dbOverview = await db.query(
        "select * from pg_stat_database where datname = 'postgres'"
      );
      res.locals.result.dbStats = dbOverview.rows;
      res.locals.result.conflicts = dbOverview.rows[0].conflicts;
      res.locals.result.deadlocks = dbOverview.rows[0].deadlocks;
      res.locals.result.transactionsCommitted = dbOverview.rows[0].xact_commit;
      res.locals.result.rolledBackTransactions =
        dbOverview.rows[0].xact_rollback;
      //console.log(Number(res.locals.result.transactionsCommitted));
      //res.locals.result.totalTransactions = (Number(res.locals.result.transactionsCommitted) + Number(res.locals.result.totalTransactions));
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.dbStats ${error}`,
        status: 400,
        message: `Error has occured in databaseController.dbStats. ERROR: ${error}`,
      });
    }
  },
  //this method returns the execution time for INSERT queries
  insertQueryTime: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const queryString =
      "select * from pg_stat_statements where query like '%INSERT %'";
    let queryTime;
    try {
      queryTime = await db.query(queryString);
      res.locals.result.insertQueryTime = queryTime.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.insertQueryTime ${error}`,
        status: 400,
        message: `Error has occured in databaseController.insertQueryTime. ERROR: ${error}`,
      });
    }
  },
  // this method returns the execution time for SELECT queries
  selectQueryTime: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const queryString =
      "select * from pg_stat_statements where query like '%SELECT %'";
    let queryTime;
    try {
      queryTime = await db.query(queryString);
      res.locals.result.selectQueryTime = queryTime.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.selectQueryTime ${error}`,
        status: 400,
        message: `Error has occured in databaseController.selectQueryTime. ERROR: ${error}`,
      });
    }
  },
  // this method returns the execution time for UPDATE queries
  updateQueryTime: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const queryString =
      "select * from pg_stat_statements where query like '%UPDATE %'";
    let queryTime;
    try {
      queryTime = await db.query(queryString);
      res.locals.result.updateQueryTime = queryTime.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.updateQueryTime ${error}`,
        status: 400,
        message: `Error has occured in databaseController.updateQueryTime. ERROR: ${error}`,
      });
    }
  },

  //this method calculates the query time for DELETE queries
  deleteQueryTime: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const queryString =
      "select * from pg_stat_statements where query like '%DELETE %'";
    let queryTime;
    try {
      queryTime = await db.query(queryString);
      res.locals.result.deleteQueryTime = queryTime.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.deleteQueryTime ${error}`,
        status: 400,
        message: `Error has occured in databaseController.deleteQueryTime. ERROR: ${error}`,
      });
    }
  },

  //this method calculates and returns the cache hit ratio for the database
  cacheHitRatio: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const queryString =
      'SELECT sum(heap_blks_read) as heap_read, sum(heap_blks_hit)  as heap_hit, sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) as ratio FROM pg_statio_user_tables';
    let cacheHitRate;
    try {
      cacheHitRate = await db.query(queryString);
      res.locals.result.cacheHitRatio = cacheHitRate.rows;
      return next();
    } catch (error) {
      // return next({
      //   log: `Error caught in databaseController.cacheHitRatio ${error}`,
      //   status: 400,
      //   message: `Error has occured in databaseController.cacheHitRatio. ERROR: ${error}`,
      // });
      res.locals.result.cacheHitRatio = null;
      return next();
    }
  },
  //   averageQueryTime: async (req, res, next) => {
  //     const db = res.locals.dbConnection;
  //     //const queryString = 'SELECT query, mean_exec_time FROM pg_stat_statements';
  //     //this query will select the query and mean exec time of all queries that used "select *"
  //     const queryString =
  //       "select avg(mean_exec_time) AS averageQueryTime from pg_stat_statements";
  //     let average;
  //     try {
  //       average = await db.query(queryString);

  //       res.locals.result.averageQueryTime = average.rows;
  //       return next();
  //     } catch (error) {
  //       return next({
  //         log: `Error caught in databaseController.averageQueryTime ${error}`,
  //         status: 400,
  //         message: `Error has occured in databaseController.averageQueryTime. ERROR: ${error}`,
  //       });
  //     }
  //   },
  // };
  // JUST RETURNING 1 DATA POINT - THE AVERAGE
  averageQueryTime: async (req, res, next) => {
    const db = res.locals.dbConnection;
    //const queryString = 'SELECT query, mean_exec_time FROM pg_stat_statements';
    //this query will select the query and mean exec time of all queries that used "select *"
    try {
      const average = await db.query(
        'select avg(mean_exec_time) AS averageQueryTime from pg_stat_statements'
      );
      const median = await db.query(
        'SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median from pg_stat_statements'
      );

      res.locals.result.averageQueryTime = average.rows;
      res.locals.result.averageQueryTime2 = median.rows;
      return next();
    } catch (error) {
      return next({
        log: `Error caught in databaseController.averageQueryTime ${error}`,
        status: 400,
        message: `Error has occured in databaseController.averageQueryTime. ERROR: ${error}`,
      });
    }
  },
};

//TO DO: add controller to sum

export default databaseController;
