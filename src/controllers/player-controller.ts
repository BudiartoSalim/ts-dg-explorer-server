import { IRequest, IResponse, INext } from '../interfaces/express';
import Player from '../models/player-model';
import Party from '../models/party-model';

export default class PlayerController {

  // POST /players/login
  static async loginUserHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      const email = Player.emailValidatorAndSanitizer(req.body.email);
      const password = Player.passwordValidatorAndSanitizer(req.body.password);
      let { accessToken, playerData } = await Player.loginPlayer({ email, password });
      const party = await Party.fetchPartyData(playerData.id);
      playerData.party = party;
      res.status(200).json({ access_token: accessToken, playerData });
    } catch (err) {
      next(err);
    }
  }

  // POST /players/register
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

  static async fetchPlayerDataHandler(req: IRequest, res: IResponse, next: INext) {

    res.status(200).json('from get');
  }
}