import { IPlayer, IPlayerCreds } from "../interfaces/models/PlayerInterfaces";
import pool from "../dbconfig/postgres";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export default class Player {
  static async registerPlayer(player: IPlayerCreds): Promise<IPlayer> {
    const client = await pool.connect();
    try {
      // initial values
      const startingMoney = 1000;
      const startingLevelUpReq = 100;
      const startingRank = 1;
      const rankCap = 100;

      const secret = process.env.AUTH_SECRET as string;
      const pw = crypto.createHmac('SHA256', secret).update(player.password).digest('hex');
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(pw, salt);
      const currentTime = new Date().toISOString();
      const newPlayer = await client.query(`INSERT INTO 
      players(name, email, password, money, current_xp, next_xp, rank, rank_cap, created_at, updated_at) 
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) 
      RETURNING *;`,
        [player.name, player.email, hashedPassword, startingMoney, 0, startingLevelUpReq, startingRank, rankCap, currentTime, currentTime]);

      const newPlayerParty = await client.query(`INSERT INTO 
      parties(player_id, created_at, updated_at) 
      VALUES ($1,$2,$3) 
      RETURNING *;`,
        [newPlayer.rows[0].id, currentTime, currentTime]);

      const playerData: IPlayer = {
        id: newPlayer.rows[0].id,
        name: newPlayer.rows[0].name,
        money: newPlayer.rows[0].money,
        current_xp: newPlayer.rows[0].current_xp,
        next_xp: newPlayer.rows[0].next_xp,
        rank: newPlayer.rows[0].rank,
        rank_cap: newPlayer.rows[0].rank_cap,
        party: newPlayerParty.rows[0]
      }

      return playerData;
    } catch (err) {
      throw { err };
    } finally {
      client.release();
    }
  }
}