import { RequestHandler } from 'express';

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
  // this controller returns mean and median times for different types of queries
  queryTimes: async (req, res, next) => {
    const db = res.locals.dbConnection;
    // WIP: this number will come from the front end and currently defaults to 10
    const userNumberOfQueries: number = req.body.slowQueries;
    const slowQueryNumber = userNumberOfQueries || 10;

    try {
      const allQueries: queryData = {
        all: await db.query(
          'SELECT * FROM pg_stat_statements ORDER BY mean_exec_time;'
        ),
        median: await db.query(
          'SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median FROM pg_stat_statements;'
        ),
        mean: await db.query(
          'SELECT avg(mean_exec_time) AS averageQueryTime FROM pg_stat_statements;'
        ),
        slowestQueries: await db.query(
          'SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT $1;',
          [slowQueryNumber]
        ),
      };
      res.locals.result.allTimes = allQueries;

      const selectQueries: queryData = {
        all: await db.query(
          "SELECT * FROM pg_stat_statements WHERE query LIKE '%SELECT%' ORDER BY mean_exec_time;"
        ),
        median: await db.query(
          "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median FROM pg_stat_statements WHERE query LIKE '%SELECT%';"
        ),
        mean: await db.query(
          "SELECT avg(mean_exec_time) AS averageQueryTime FROM pg_stat_statements WHERE query LIKE '%SELECT%';"
        ),
        slowestQueries: await db.query(
          "SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%SELECT%' ORDER BY mean_exec_time DESC LIMIT $1;",
          [slowQueryNumber]
        ),
      };
      res.locals.result.selectTimes = selectQueries;

      const insertQueries: queryData = {
        all: await db.query(
          "SELECT * FROM pg_stat_statements WHERE query LIKE '%INSERT%' ORDER BY mean_exec_time;"
        ),
        median: await db.query(
          "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median FROM pg_stat_statements WHERE query LIKE '%INSERT%';"
        ),
        mean: await db.query(
          "SELECT avg(mean_exec_time) AS averageQueryTime FROM pg_stat_statements WHERE query LIKE '%INSERT%';"
        ),
        slowestQueries: await db.query(
          "SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%INSERT%' ORDER BY mean_exec_time DESC LIMIT $1;",
          [slowQueryNumber]
        ),
      };
      res.locals.result.insertTimes = insertQueries;

      const updateQueries: queryData = {
        all: await db.query(
          "SELECT * FROM pg_stat_statements WHERE query LIKE '%UPDATE%' ORDER BY mean_exec_time;"
        ),
        median: await db.query(
          "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median FROM pg_stat_statements WHERE query LIKE '%UPDATE%';"
        ),
        mean: await db.query(
          "SELECT avg(mean_exec_time) AS averageQueryTime FROM pg_stat_statements WHERE query LIKE '%UPDATE%';"
        ),
        slowestQueries: await db.query(
          "SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%UPDATE%' ORDER BY mean_exec_time DESC LIMIT $1;",
          [slowQueryNumber]
        ),
      };
      res.locals.result.updateTimes = updateQueries;

      const deleteQueries: queryData = {
        all: await db.query(
          "SELECT * FROM pg_stat_statements WHERE query LIKE '%DELETE%' ORDER BY mean_exec_time;"
        ),
        median: await db.query(
          "SELECT PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY mean_exec_time) AS median FROM pg_stat_statements WHERE query LIKE '%DELETE%';"
        ),
        mean: await db.query(
          "SELECT avg(mean_exec_time) AS averageQueryTime FROM pg_stat_statements WHERE query LIKE '%DELETE%';"
        ),
        slowestQueries: await db.query(
          "SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%DELETE%' ORDER BY mean_exec_time DESC LIMIT $1;",
          [slowQueryNumber]
        ),
      };
      res.locals.result.deleteTimes = deleteQueries;

      return next();
    } catch (error) {
      console.log('ERROR in databaseController.queryTimes: ', error);
      res.locals.result.allTimes = null;
      res.locals.result.selectTimes = null;
      res.locals.result.insertTimes = null;
      res.locals.result.updateTimes = null;
      res.locals.result.deleteTimes = null;
      return next();
    }
  },

  // this controller returns the number of rows that a given query touches, where the number is greater than 10
  numOfRows: async (req, res, next) => {
    const db = res.locals.dbConnection;
    // WIP: this number will come from the front end and currently defaults to 5
    const userProvided = req.body.numOfRowsNumber;
    const rowsNumber = userProvided || 10;
    try {
      const quantOfRows = await db.query(
        'SELECT query, rows FROM pg_stat_statements WHERE rows > $1;',
        [rowsNumber]
      );
      res.locals.result.numOfRows = quantOfRows.rows;
      return next();
    } catch (error) {
      console.log('ERROR in databaseController.numOfRows: ', error);
      res.locals.result.numOfRows = null;
      return next();
    }
  },

  // this controller returns mean execution time for top queries of each query type
  topCalls: async (req, res, next) => {
    const db = res.locals.dbConnection;
    // WIP: this number will come from the front end and currently defaults to 5
    const userProvided = req.body.topCallsNumber;
    const callsNumber = userProvided || 5;
    try {
      const topAllCalls = await db.query(
        'SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY calls DESC LIMIT $1;',
        [callsNumber]
      );
      const topSelectCalls = await db.query(
        "SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%SELECT %' ORDER BY calls DESC LIMIT $1;",
        [callsNumber]
      );
      const topInsertCalls = await db.query(
        "SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%INSERT %' ORDER BY calls DESC LIMIT $1;",
        [callsNumber]
      );
      const topDeleteCalls = await db.query(
        "SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%DELETE %' ORDER BY calls DESC LIMIT $1;",
        [callsNumber]
      );
      const topUpdateCalls = await db.query(
        "SELECT query, mean_exec_time FROM pg_stat_statements WHERE query LIKE '%UPDATE %' ORDER BY calls DESC LIMIT $1;",
        [callsNumber]
      );
      res.locals.result.avgTimeTopAllCalls = topAllCalls.rows;
      res.locals.result.avgTimeTopSelectCalls = topSelectCalls.rows;
      res.locals.result.avgTimeTopInsertCalls = topInsertCalls.rows;
      res.locals.result.avgTimeTopDeleteCalls = topDeleteCalls.rows;
      res.locals.result.avgTimeTopUpdateCalls = topUpdateCalls.rows;
      return next();
    } catch (error) {
      console.log('ERROR in databaseController.topCalls: ', error);
      res.locals.result.averageQueryTime = null;
      res.locals.result.avgTimeTopSelectCalls = null;
      res.locals.result.avgTimeTopInsertCalls = null;
      res.locals.result.avgTimeTopDeleteCalls = null;
      res.locals.result.avgTimeTopUpdateCalls = null;
      return next();
    }
  },

  // this controller pulls the database-wide statistics for a specified database
  dbStats: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const data = req.body.uri;
    // grab database name from req.body string, database assignment contigent upon db setup via uri || manual input
    const dataBase =
      data.split('.com/')[1] ||
      data.split('5432/').pop().split('/')[0].replace(/\s/g, '');
    try {
      const dbOverview = await db.query(
        'SELECT * FROM pg_stat_database WHERE datname = $1;',
        [dataBase]
      );
      res.locals.result.dbStats = dbOverview.rows;
      res.locals.result.conflicts = dbOverview.rows[0].conflicts;
      res.locals.result.deadlocks = dbOverview.rows[0].deadlocks;
      res.locals.result.transactionsCommitted = dbOverview.rows[0].xact_commit;
      res.locals.result.rolledBackTransactions =
        dbOverview.rows[0].xact_rollback;
      return next();
    } catch (error) {
      console.log('ERROR in databaseController.dbStats: ', error);
      res.locals.result.dbStats = null;
      res.locals.result.conflicts = null;
      res.locals.result.deadlocks = null;
      res.locals.result.transactionsCommitted = null;
      res.locals.result.rolledBackTransactions = null;
      return next();
    }
  },

  // this controller calculates and returns the cache hit ratio for the database
  cacheHitRatio: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const queryString =
      'SELECT sum(heap_blks_read) AS heap_read, sum(heap_blks_hit) AS heap_hit, sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS ratio FROM pg_statio_user_tables;';
    try {
      const cacheHitRate = await db.query(queryString);
      res.locals.result.cacheHitRatio = cacheHitRate.rows;
      return next();
    } catch (error) {
      console.log('ERROR in databaseController.cacheHitRatio: ', error);
      res.locals.result.cacheHitRatio = null;
      return next();
    }
  },
};

//SELECT sum(numbackends) FROM pg_stat_database;

export default databaseController;
