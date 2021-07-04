import { IRequest, IResponse, INext } from '../interfaces/express';
import Player from '../models/player-model';

export default class PlayerController {

  static async loginUserHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      const email = Player.emailValidatorAndSanitizer(req.body.email);
      const password = Player.passwordValidatorAndSanitizer(req.body.password);

      const accessToken = await Player.loginPlayer({ email, password })
      res.status(200).json({ result: accessToken });
    } catch (err) {
      next(err);
    }

  }



  static async registerUserHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      req.body.email = Player.emailValidatorAndSanitizer(req.body.email);
      req.body.password = Player.passwordValidatorAndSanitizer(req.body.password);
      req.body.name = Player.nameValidatorAndSanitizer(req.body.name);

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