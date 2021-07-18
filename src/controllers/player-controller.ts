import { IRequest, IResponse, INext } from '../interfaces/express';
import Player from '../models/player-model';
import Party from '../models/party-model';
import Unit from '../models/unit-model';
import { IPlayer } from '../interfaces/definedmodels/PlayerInterfaces';

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

  // Methods below will come from endpoints that goes through auth middleware first
  // Auth middleware will have req.body.payload containing jwt payload, and req.body.player containing playerdata
  // GET /players
  static async fetchPlayerDataHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      let player: IPlayer = {
        id: req.body.player.id,
        name: req.body.player.name,
        money: req.body.player.money,
        currentXp: req.body.player.current_xp,
        nextXp: req.body.player.next_xp,
        rank: req.body.player.rank,
        rankCap: req.body.player.rank_cap,
      };
      let party = await Party.fetchPartyData(player.id);
      if (typeof party.firstUnit === 'number') { party.firstUnit = await Unit.getUnitById(party.firstUnit) };
      if (typeof party.secondUnit === 'number') { party.secondUnit = await Unit.getUnitById(party.secondUnit) };
      if (typeof party.thirdUnit === 'number') { party.thirdUnit = await Unit.getUnitById(party.thirdUnit) };
      if (typeof party.fourthUnit === 'number') { party.fourthUnit = await Unit.getUnitById(party.fourthUnit) };

      res.status(200).json(req.body.player);
    } catch (err) {
      next(err);
    }
  }
}