import express from 'express';
import databaseController from '../controllers/databaseController';

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).json({log: 'router working'});
// })


//TODO: once connected, uncomment, do you see hello in terminal?
 router.get('/', databaseController.connection, (req,res) =>{
   res.status(200).json()
 })

export default router;

