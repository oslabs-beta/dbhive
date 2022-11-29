import express, { Router } from 'express';
import databaseController from '../controllers/databaseController';
import setupController from '../controllers/setupController';

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).json({log: 'router working'});
// })

// router to store informaton from setup page
router.post('/placeholder', setupController.create, (req, res) => {
  return res.status(200).json(res.locals);
});

router.post('/uri', databaseController.connect, databaseController.dbStats, (req, res) => {
  console.log(res.locals)
  return res.status(200).json(res.locals);
});

router.get(
  '/querytimes',
  databaseController.connect,
  databaseController.queryTimes,
  databaseController.numOfRows,
  databaseController.topCalls,
  databaseController.dbStats,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  }
);

export default router;
