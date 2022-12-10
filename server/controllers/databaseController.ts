import { RequestHandler } from 'express';
import { resourceLimits } from 'worker_threads';

type DatabaseController = {
  queryTimes: RequestHandler;
  numOfRows: RequestHandler;
  topCalls: RequestHandler;
  dbStats: RequestHandler;
  cacheHitRatio: RequestHandler;
};
type queryData = {
  all: any[];
  mean: number;
  median: number;
  slowestQueries: any[];
} | null;

const databaseController: DatabaseController = {
  queryTimes: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const userNumberOfQueries: number = req.body.slowQueries;
    const slowQueryNumber = userNumberOfQueries || 10;

    try {
      const allQueries: queryData = {
        all: await db.query(
          'select * from pg_stat_statements order by mean_exec_time'
        ),
        median: await db.query(
          'SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median from pg_stat_statements'
        ),
        mean: await db.query(
          'select avg(mean_exec_time) AS averageQueryTime from pg_stat_statements'
        ),
        slowestQueries: await db.query(
          `select query, mean_exec_time from pg_stat_statements order by mean_exec_time desc limit ${slowQueryNumber}`
        ),
      };
      res.locals.result.allTimes = allQueries;

      const selectQueries: queryData = {
        all: await db.query(
          "select * from pg_stat_statements where query like '%SELECT%'"
        ),
        median: await db.query(
          "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median from pg_stat_statements where query like '%SELECT%'"
        ),
        mean: await db.query(
          "select avg(mean_exec_time) AS averageQueryTime from pg_stat_statements where query like '%SELECT%'"
        ),
        slowestQueries: await db.query(
          `select query, mean_exec_time from pg_stat_statements where query like '%SELECT%' order by mean_exec_time desc limit ${slowQueryNumber}`
        ),
      };
      res.locals.result.selectTimes = selectQueries;

      const insertQueries: queryData = {
        all: await db.query(
          "select * from pg_stat_statements where query like '%INSERT%'"
        ),
        median: await db.query(
          "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median from pg_stat_statements where query like '%INSERT%'"
        ),
        mean: await db.query(
          "select avg(mean_exec_time) AS averageQueryTime from pg_stat_statements where query like '%INSERT%'"
        ),
        slowestQueries: await db.query(
          `select query, mean_exec_time from pg_stat_statements where query like '%INSERT%' order by mean_exec_time desc limit ${slowQueryNumber}`
        ),
      };

      res.locals.result.insertTimes = insertQueries;

      const updateQueries: queryData = {
        all: await db.query(
          "select * from pg_stat_statements where query like '%UPDATE%'"
        ),
        median: await db.query(
          "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median from pg_stat_statements where query like '%UPDATE%'"
        ),
        mean: await db.query(
          "select avg(mean_exec_time) AS averageQueryTime from pg_stat_statements where query like '%UPDATE%'"
        ),
        slowestQueries: await db.query(
          `select query, mean_exec_time from pg_stat_statements where query like '%UPDATE%' order by mean_exec_time desc limit ${slowQueryNumber}`
        ),
      };

      res.locals.result.updateTimes = updateQueries;

      const deleteQueries: queryData = {
        all: await db.query(
          "select * from pg_stat_statements where query like '%DELETE%'"
        ),
        median: await db.query(
          "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median from pg_stat_statements where query like '%DELETE%'"
        ),
        mean: await db.query(
          "select avg(mean_exec_time) AS averageQueryTime from pg_stat_statements where query like '%DELETE%'"
        ),
        slowestQueries: await db.query(
          `select query, mean_exec_time from pg_stat_statements  where query like '%DELETE%' order by mean_exec_time desc limit ${slowQueryNumber}`
        ),
      };
      res.locals.result.deleteTimes = deleteQueries;

      return next();
    } catch (error) {
      console.log('Error in databaseController.queryTimes: ', error);
      res.locals.result.allTimes = null;
      res.locals.result.selectTimes = null;
      res.locals.result.insertTimes = null;
      res.locals.result.updateTimes = null;
      res.locals.result.deleteTimes = null;
      return next();
    }
  },

  //this method returns the number of rows that a given query touches, where the number is greater than 10
  numOfRows: async (req, res, next) => {
    const db = res.locals.dbConnection;
    //req.body.numOfRowsNumber will need to be updated to FE key
    const userProvided = req.body.numOfRowsNumber;
    const rowsNumber = userProvided || 10;
    const queryString = `select query, rows from pg_stat_statements where rows > ${rowsNumber}`;
    let quantOfRows;
    try {
      quantOfRows = await db.query(queryString);
      //console.log(quantOfRows);
      res.locals.result.numOfRows = quantOfRows.rows;
      return next();
    } catch (error) {
      console.log('Error in databaseController.numOfRows: ', error);
      res.locals.result.numOfRows = null;
      return next();
    }
  },
  //this method will provide the top 5 most frequently called queries
  // STILL TO DO: QUERY TIMES OF TOP 5 MOST FREQUENT QUERIES - add 4 more calls and clean up code
  // Mean Execution Time of the 5 Queries with Highest Number of Calls, also divided into query type
  topCalls: async (req, res, next) => {
    const db = res.locals.dbConnection;
    //the req.body.topCallsNumber should be updated based on the FE key
    const userProvided = req.body.topCallsNumber;
    //either the callsNumber will be the user selection, if undefined, will default to 5
    const callsNumber = userProvided || 5;
    try {
      // retrieve the top five calls
      const topAllCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements order by calls desc limit ${callsNumber}`
      );
      const topSelectCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements where query like '%SELECT %' order by calls desc limit ${callsNumber}`
      );
      const topInsertCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements where query like '%INSERT %' order by calls desc limit ${callsNumber}`
      );
      const topDeleteCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements where query like '%DELETE %' order by calls desc limit ${callsNumber}`
      );
      const topUpdateCalls = await db.query(
        `select query, mean_exec_time from pg_stat_statements where query like '%UPDATE %' order by calls desc limit ${callsNumber}`
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
      console.log('Error in databaseController.topCalls: ', error);
      res.locals.result.averageQueryTime = null;
      res.locals.result.avgTimeTopSelectCalls = null;
      res.locals.result.avgTimeTopInsertCalls = null;
      res.locals.result.avgTimeTopDeleteCalls = null;
      res.locals.result.avgTimeTopUpdateCalls = null;
      return next();
    }
  },

  //this method pulls the database-wide statistics for a specified database
  dbStats: async (req, res, next) => {
    const db = res.locals.dbConnection;
    //postgres can be turned into a variable that will represent the requested db
    const data = req.body.uri;
    // Database assignment contigent upon db setup via uri  ||   manual input
    const dataBase =
      data.split('.com/')[1] ||
      data.split('5432/').pop().split('/')[0].replace(/\s/g, '');
    try {
      const dbOverview = await db.query(
        `select * from pg_stat_database where datname = '${dataBase}'`
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
      console.log('Error in databaseController.dbStats: ', error);
      res.locals.result.dbStats = null;
      res.locals.result.conflicts = null;
      res.locals.result.deadlocks = null;
      res.locals.result.transactionsCommitted = null;
      res.locals.result.rolledBackTransactions = null;
      return next();
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
      console.log('Error in databaseController.cacheHitRatio: ', error);
      res.locals.result.cacheHitRatio = null;
      return next();
    }
  },
};

//TO DO: add controller to sum

export default databaseController;
