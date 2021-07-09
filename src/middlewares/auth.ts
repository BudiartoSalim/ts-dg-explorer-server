import { IRequest, IResponse, INext } from '../interfaces/express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Player from '../models/player-model';

//WILL BE CONTINUED AFTER ACTUAL REGISTRATION BEING MADE
//PLAN IS TO FIRST HASH THE PW WITH SHA256 THEN BCRYPT IT
async function authenticationMiddleware(req: IRequest, res: IResponse, next: INext) {
  const tokenHeader = req.headers.access_token as string;
  try {
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