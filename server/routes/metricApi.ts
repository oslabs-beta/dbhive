import express from 'express';
import databaseController from '../controllers/databaseController';
import userController from '../controllers/userController'

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).json({log: 'router working'});
// })

// router to store informaton from setup page 
router.post('/api/placeholder', userController.setup, (req, res) => {
  return res.status(200).json(res.locals);
})


 router.get('/querytimes', databaseController.connection, (req,res) =>{
   res.status(200).json(res.locals.result)
 })

export default router;

