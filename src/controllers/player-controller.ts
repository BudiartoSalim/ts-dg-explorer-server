import { IRequest, IResponse, INext } from '../interfaces/express';
import validator from 'validator';
import Player from '../models/player-model';

export default class PlayerController {
  static async registerUserHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      //input validators
      if (typeof req.body.email !== 'string' || validator.isEmpty(req.body.email)) { throw "email-empty" };
      if (validator.isEmail(req.body.email) === false) { throw "email-invalid-format" };
      if (typeof req.body.name !== 'string' || validator.isByteLength(req.body.name, { min: 1, max: 255 }) === false) { throw "name-invalid-length" };
      if (typeof req.body.password !== 'string' || validator.isByteLength(req.body.password, { min: 6 }) === false) { throw "password-invalid-length" };

      //input sanitizers
      req.body.email = validator.trim(req.body.email);
      req.body.name = validator.trim(req.body.name);

      const newPlayer = await Player.registerPlayer({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      });



      res.status(200).json(newPlayer);
    } catch (err) {
      next(err);
    }
  }

  static async fetchUserDataHandler(req: IRequest, res: IResponse, next: INext) {
    res.status(200).json('from get');
  }
}