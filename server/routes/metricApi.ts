import express from 'express';
import databaseController from '../controllers/databaseController';

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).json({log: 'router working'});
// })


 router.get('/querytimes', databaseController.connection, (req,res) =>{
   res.status(200).json(res.locals.result)
 })

export default router;

