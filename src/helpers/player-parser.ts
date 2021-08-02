import { IPlayer } from "../interfaces/definedmodels/PlayerInterfaces";

// used to cast player interface to player data obtained from payload in middleware
// since middleware passed parameters are of "any" type, this supposed to be a more convenient way to parse it as IPlayer
export default function playerParser(playerFromPayload: any): IPlayer {
  try {
    return {
      id: playerFromPayload.id,
      name: playerFromPayload.name,
      money: playerFromPayload.money,
      currentXp: playerFromPayload.current_xp,
      nextXp: playerFromPayload.next_xp,
      rank: playerFromPayload.rank,
      rankCap: playerFromPayload.rank_cap,
    };
  } catch (err) {
    throw 'player-parse-error'
  }
}