import { Router } from 'express';
import connectController from '../controllers/connectController';
import databaseController from '../controllers/databaseController';

const router = Router();

// test route
router.post(
  '/uri',
  connectController.connectDB,
  connectController.createExtension,
  databaseController.dbStats,
  (req, res) => {
    console.log(res.locals);
    return res.status(200).json(res.locals);
  }
);

router.post(
  '/queryMetrics',
  connectController.connectDB,
  connectController.createExtension,
  databaseController.queryTimes,
  databaseController.numOfRows,
  databaseController.topCalls,
  databaseController.dbStats,
  databaseController.cacheHitRatio,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  }
);

//this should reflect any method that would need to update based on user input
router.put(
  '/querytimes',
  databaseController.numOfRows,
  databaseController.topCalls,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  }
);

export default router;
