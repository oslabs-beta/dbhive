import { Router } from 'express';
import connectController from '../controllers/connectController';
import databaseController from '../controllers/databaseController';

const router = Router();

// check if database being added is valid
// WIP
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

// delivers metrics from database
// notice: the database controllers will console log, but not return errors so that individual charts can render
router.post(
  '/queryMetrics',
  connectController.connectDB,
  connectController.createExtension,
  databaseController.queryTimes,
  databaseController.numOfRows,
  databaseController.topCalls,
  databaseController.dbStats,
  databaseController.cacheHitRatio,
  databaseController.statActivity,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  }
);

// this should reflect any method that would need to update based on user input
// WIP: not currently in use but ready to be connected to front end based on user selection
router.put(
  '/queryMetrics',
  databaseController.numOfRows,
  databaseController.queryTimes,
  databaseController.topCalls,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  }
);

export default router;
