import express from 'express';
import PlayerController from '../controllers/player-controller';
const router = express.Router();

router.get('/', PlayerController.fetchPlayerDataHandler);
router.post('/register', PlayerController.registerUserHandler);
router.post('/login', PlayerController.loginUserHandler);

export default router;