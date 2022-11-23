import db from "../models/databaseModels";
import { Request, Response, NextFunction } from 'express';

interface DatabaseController {
connection: (req: Request, res:Response, next:NextFunction) => void
}

const databaseController: DatabaseController = {
  connection: async (req, res, next) => {
    console.log('Hello')
    const queryString = 'SELECT query, mean_exec_time FROM pg_stat_statements'
    let newQuery;
    try{
      newQuery = await db.query(queryString)
      console.log(newQuery)
      res.locals.result = newQuery.rows;
      return next();
    }
    catch(error){
      return next({
        log: `Error caught in databaseController.connection ${error}`,
        status: 400,
        message: `Error has occured in databaseController.connection. ERROR: ${error}`,
      })
    }
  }
}



export default databaseController;