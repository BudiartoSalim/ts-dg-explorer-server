import express from 'express';
const router = express.Router();
import PlayerRouter from './player-router';
import UnitRouter from './unit-router';

router.use('/players', PlayerRouter);
router.use('/units', UnitRouter);
router.get('/', (req, res, next) => { res.status(200).json({ message: "hellow" }) })

export default router;