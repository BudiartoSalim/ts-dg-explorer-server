import { IPlayer, IPlayerCreds } from "../interfaces/models/IPlayer";
import pool from "../dbconfig/postgres";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export default class Player {
  static async registerPlayer(player: IPlayerCreds) {
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
      const newPlayer = await client.query("INSERT INTO players(name, email, password, money, current_xp, next_xp, rank, rank_cap, created_at, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
        [player.name, player.email, hashedPassword, startingMoney, 0, startingLevelUpReq, startingRank, rankCap, currentTime, currentTime]);

    } catch (err) {
      return err;
    } finally {
      client.release();
    }
  }
}