import express from 'express';
import UnitController from '../controllers/unit-controller';
import authenticationMiddleware from '../middlewares/auth';
const router = express.Router();

router.post('/', UnitController.getRandomUnitOfCertainClassHandler);
router.use(authenticationMiddleware);
router.post('/hire', UnitController.hireUnitHandler);

export default router;