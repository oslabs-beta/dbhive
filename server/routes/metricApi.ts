import { Router } from 'express';
import { connectController } from '../controllers/connectController';
import databaseController from '../controllers/databaseController';
// import securityController from '../controllers/securityController';

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
  '/querytimes',
  connectController.connectDB,
  databaseController.queryTimes,
  databaseController.numOfRows,
  databaseController.topCalls,
  databaseController.dbStats,
  databaseController.selectQueryTime,
  databaseController.deleteQueryTime,
  databaseController.insertQueryTime,
  databaseController.updateQueryTime,
  databaseController.cacheHitRatio,
  databaseController.averageQueryTime,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  }
);

export default router;
