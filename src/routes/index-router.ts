import express from 'express';
import PlayerController from '../controllers/player-controller';
const router = express.Router();

router.get('/', PlayerController.fetchUserDataHandler);
router.post('/', PlayerController.registerUserHandler);

export default router;