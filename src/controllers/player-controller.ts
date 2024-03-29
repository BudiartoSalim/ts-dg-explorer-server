import { IRequest, IResponse, INext } from '../interfaces/express';
import Player from '../models/player';
import Party from '../models/party/party';
import Unit from '../models/units/unit';
import { IPlayer } from '../interfaces/definedmodels/PlayerInterfaces';
import playerParser from '../helpers/player-parser';

export default class PlayerController {

  // POST /players/login
  static async loginUserHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      const email = Player.emailValidatorAndSanitizer(req.body.email);
      const password = Player.passwordValidatorAndSanitizer(req.body.password);
      let { accessToken, playerData } = await Player.loginPlayer({ email, password });

      const party = await new Party(playerData.id).fetchPartyData();
      playerData.party = party;
      res.status(200).json({ access_token: accessToken, playerData });
    } catch (err) {
      next(err);
    }
  }

  // POST /players/register
  static async registerUserHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      const email = Player.emailValidatorAndSanitizer(req.body.email) as string;
      const password = Player.passwordValidatorAndSanitizer(req.body.password);
      const name = Player.nameValidatorAndSanitizer(req.body.name);

      const newPlayer: IPlayer = await Player.registerPlayer({
        email,
        name,
        password
      });

      res.status(200).json(newPlayer);
    } catch (err) {
      next(err);
    }
  }

  // Methods below will come from endpoints that goes through auth middleware first
  // Auth middleware will have req.body.payload containing jwt payload, and req.body.player containing playerdata
  // GET /players
  static async fetchPlayerDataHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      const player: IPlayer = playerParser(req.body.player);
      let party = await new Party(player.id).fetchPartyData();
      if (typeof party.unit0 === 'number') { party.unit0 = await Unit.getUnitById(party.unit0) };
      if (typeof party.unit1 === 'number') { party.unit1 = await Unit.getUnitById(party.unit1) };
      if (typeof party.unit2 === 'number') { party.unit2 = await Unit.getUnitById(party.unit2) };
      if (typeof party.unit3 === 'number') { party.unit3 = await Unit.getUnitById(party.unit3) };

      res.status(200).json(req.body.player);
    } catch (err) {
      next(err);
    }
  }
}