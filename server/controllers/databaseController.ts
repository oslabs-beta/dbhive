import db from "../models/databaseModels";
import { Request, Response, NextFunction } from 'express';

interface DatabaseController {
connection: (req: Request, res:Response, next:NextFunction) => void
}

const databaseController: DatabaseController = {
  connection: (req, res, next) => {
    console.log('Hello')
    const queryString = 'SELECT * FROM hr.d'

    db.query(queryString)
    .then(result => {
      console.log(result)
      return next()})
    .catch(err => {
      console.log('error in controller')
      return next(err)
    })
  }
};




export default databaseController;