import express from 'express';
import PlayerController from '../controllers/player-controller';
import authenticationMiddleware from '../middlewares/auth';
const router = express.Router();

router.post('/register', PlayerController.registerUserHandler);
router.post('/login', PlayerController.loginUserHandler);
router.get('/', authenticationMiddleware, PlayerController.fetchPlayerDataHandler);

export default router;