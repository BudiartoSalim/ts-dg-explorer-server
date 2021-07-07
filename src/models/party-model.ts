import pool from "../dbconfig/postgres";
import { IParty } from "../interfaces/models/PartyInterfaces";

export default class Party {
  static async fetchPartyData(playerId: number): Promise<IParty> {
    const client = await pool.connect();
    try {
      const output = await client.query('SELECT * FROM parties WHERE player_id = $1 LIMIT 1;', [playerId]);

      return {
        id: output.rows[0].id,
        firstUnit: output.rows[0].first_unit_id,
        secondUnit: output.rows[0].second_unit_id,
        thirdUnit: output.rows[0].third_unit_id,
        fourthUnit: output.rows[0].fourth_unit_id
      }

    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
}