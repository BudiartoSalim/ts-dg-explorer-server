import { IPlayer, IPlayerCreds } from "../interfaces/models/PlayerInterfaces";
import pool from "../dbconfig/postgres";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import validator from 'validator';

export default class Player {
  // VALIDATORS AND SANITIZERS SECTION HERE //
  // this section is primarily for sanitizers and validators
  // these methods are to be used for Player model, to make sure all fields are uniformly checked
  // using same logic, to ensure the data to be consistent
  static emailValidatorAndSanitizer(email: string) {
    if (typeof email !== 'string' || validator.isEmpty(email)) { throw "email-empty" };
    if (validator.isEmail(email) === false) { throw "email-invalid-format" };
    return validator.trim(email);
  }

  static nameValidatorAndSanitizer(name: string) {
    //checks if name is string first to ensure trim works correctly as trim only accepts string
    //checks length after trim to make sure a user makes character of correct length after trim
    if (typeof name !== 'string') { throw "name-invalid-length" };
    name = validator.trim(name);
    if (validator.isByteLength(name, { min: 1, max: 255 }) === false) { throw "name-invalid-length" };
    return name;
  }

  static passwordValidatorAndSanitizer(password: string) {
    if (typeof password !== 'string' || validator.isByteLength(password, { min: 6 }) === false) { throw "password-invalid-length" };
    return password;
  }
  ////// END OF SANITIZERS //////
  ///////////////////////////////

  // UTILITIES SECTION //
  // all methods in this section should be filled with utilities for Player model that are used in multiple parts
  // IMPORTANT! reuse utilities when makes sense only!! 
  // use it when the context and requirements is same, eg login and register password should use same hash algorithm
  // we absolutely do not want a utility change for 1 part affects the others, try not change stable ones unless really necessary
  static passwordFirstHash(pw: string) {
    const secret = process.env.AUTH_SECRET as string;
    return crypto.createHmac('SHA256', secret).update(pw).digest('hex');
  }

  ////// END OF UTILITIES //////
  //////////////////////////////


  //////////////////////////////////////////////////
  // ALL METHODS BELOW ARE CORE API FUNCTIONALITY //

  static async loginPlayer(player: IPlayerCreds) {
    const client = await pool.connect();
    try {
      const pw = Player.passwordFirstHash(player.password);
      const queryResult = await client.query(
        `SELECT * FROM players WHERE players.email = $1 LIMIT 1;`, [player.email]
      );
      if (queryResult.rows.length === 1) {
        const playerData = queryResult.rows[0];
        if (bcrypt.compareSync(pw, playerData.password)) {
          //generate token, create session hash, and saving to db. might refactor to utilities later
          const accessToken = jwt.sign({}, process.env.ACCESS_SECRET as string);
          const playerSession = crypto.createHmac('SHA256', process.env.SES_SECRET as string).update(accessToken).digest('hex');
          await client.query(
            `UPDATE players
            SET session = $1
            WHERE players.id = $2;`,
            [playerSession, playerData.id]
          );

          return accessToken;
        }
      }

      throw 'wrong-password';
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }


  static async registerPlayer(player: IPlayerCreds): Promise<IPlayer> {
    const client = await pool.connect();
    try {
      // initial values for new players, might refactor to separate editable files instead of hardcoded
      const startingMoney = 1000;
      const startingLevelUpReq = 100;
      const startingRank = 1;
      const rankCap = 100;

      const pw = Player.passwordFirstHash(player.password);
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(pw, salt);
      const currentTime = new Date().toISOString();

      // begin transaction
      await client.query('BEGIN;');

      const newPlayer = await client.query(
        `INSERT INTO 
        players(name, email, password, money, current_xp, next_xp, rank, rank_cap, created_at, updated_at) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) 
        RETURNING *;`,
        [player.name, player.email, hashedPassword, startingMoney, 0, startingLevelUpReq, startingRank, rankCap, currentTime, currentTime]
      );

      const newPlayerParty = await client.query(
        `INSERT INTO 
        parties(player_id, created_at, updated_at) 
        VALUES ($1,$2,$3) RETURNING *;`,
        [newPlayer.rows[0].id, currentTime, currentTime]
      );

      // commit transaction
      await client.query('COMMIT;');

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
      // if transaction fails, rollback
      await client.query('ROLLBACK');
      if (err.constraint === 'players_email_key') { throw 'email-already-exists' };
      throw { err };
    } finally {
      client.release();
    }
  }
}