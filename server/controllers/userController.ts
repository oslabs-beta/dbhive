import db from '../models/databaseModels';
import { Request, Response, NextFunction } from 'express';

interface UserController {
  setup: (req: Request, res: Response, next: NextFunction) => void;
}

const userController: UserController = {
  setup: async (req, res, next) => {
    console.log('setup');
    const { username, password, uri, host, port, database } = req.body;
    console.log('username', username);
    console.log('user-password:', password);
    //localStorage.setItem('username', username);
    // catch(error){
    //   return next({
    //     log: `Error caught in userController.verify ${error}`,
    //     status: 400,
    //     message: `Error has occured in userController.verify ERROR: ${error}`,
    //   })
    // }
  },
};

export default userController;
