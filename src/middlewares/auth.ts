import { IRequest, IResponse, INext } from '../interfaces/express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Player from '../models/player';

async function authenticationMiddleware(req: IRequest, res: IResponse, next: INext) {
  try {
    const tokenHeader = req.headers.authorization as string;
    req.body.payload = jwt.verify(tokenHeader, process.env.ACCESS_SECRET as string);
    req.body.player = await Player.getPlayerById(req.body.payload.id);
    const givenSes = crypto.createHmac('SHA256', process.env.SES_SECRET as string).update(tokenHeader).digest('hex');
    if (givenSes !== req.body.player.session) { throw 'unauthorized' } // maybe also add logic to remove current ses?
    else next();
  } catch (err) {
    next('unauthorized');
  }
}

export default authenticationMiddleware;