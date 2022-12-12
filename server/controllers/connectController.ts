import { RequestHandler } from 'express';
import { Pool } from 'pg';

type ConnectController = {
  connectDB: RequestHandler;
  createExtension: RequestHandler;
};

export const connectController: ConnectController = {
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
  createExtension: async (req, res, next) => {
    const db = res.locals.dbConnection;
    const queryString = 'CREATE EXTENSION IF NOT EXISTS pg_stat_statements';
    try {
      await db.query(queryString);
      res.locals.result.validURI = true;
      return next();
    } catch (error) {
      res.locals.result.validURI = false;
      return next({
        log: `Error caught in connectController.createExtension ${error}`,
        status: 400,
        message: `Error has occured in connectController.createExtension. ERROR: ${error}`,
      });
    }
  },
};
