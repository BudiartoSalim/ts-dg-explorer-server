import express from 'express';
import UnitController from '../controllers/unit-controller';
import authenticationMiddleware from '../middlewares/auth';
const router = express.Router();

router.post('/', UnitController.getRandomUnitOfCertainClassHandler);

export default router;