import express from 'express';
const router = express.Router();
import PlayerRouter from './player-router';

router.use('/players', PlayerRouter);
router.get('/', (req, res, next) => { res.status(200).json({ message: "hellow" }) })

export default router;