import { RequestHandler } from 'express';
import { Pool } from 'pg';

type ConnectController = {
  connectDB: RequestHandler;
  createExtension: RequestHandler;
};

// on request, connect to user's database and return query pool on res.locals
const connectController: ConnectController = {
  connectDB: (req, res, next) => {
    const uri_string = req.body.uri;
    const pool = new Pool({
      connectionString: uri_string,
    });
    const db = {
      query: (text: string, params?: Array<string>) => {
        return pool.query(text, params);
      },
    };
    res.locals.dbConnection = db;
    res.locals.result = {};
    return next();
  },

  // initializes pg_stat_statements if not already initialized
  // first controller to stop response cycle and return an error if connection fails
  createExtension: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const queryString = 'CREATE EXTENSION IF NOT EXISTS pg_stat_statements';
    try {
      await db.query(queryString);
      res.locals.result.validURI = true;
      return next();
    } catch (error) {
      return next({
        log: `ERROR caught in connectController.createExtension: ${error}`,
        status: 400,
        message:
          'ERROR: error has occured in connectController.createExtension',
      });
    }
  },
};

export default connectController;
