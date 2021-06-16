import { IRequest, IResponse, INext } from '../interfaces/express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

//WILL BE CONTINUED AFTER ACTUAL REGISTRATION BEING MADE
//PLAN IS TO FIRST HASH THE PW WITH SHA256 THEN BCRYPT IT
async function authenticationMiddleware(req: IRequest, res: IResponse, next: INext) {
  const SECRET_KEY: string = process.env.AUTH_SECRET as string;
  const hash = crypto.createHmac('SHA256', SECRET_KEY).update(req.body.password).digest('hex');
}

export default authenticationMiddleware;