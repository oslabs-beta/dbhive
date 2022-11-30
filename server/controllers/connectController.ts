import { RequestHandler } from 'express';
import { Pool } from 'pg';

type ConnectController = {
  connectDB: RequestHandler;
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
};
