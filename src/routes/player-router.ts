import express from 'express';
import PlayerController from '../controllers/player-controller';
const router = express.Router();

router.get('/', PlayerController.fetchUserDataHandler);
router.post('/register', PlayerController.registerUserHandler);

export default router;