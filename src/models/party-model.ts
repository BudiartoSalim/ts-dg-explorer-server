import pool from "../dbconfig/postgres";
import { IParty } from "../interfaces/definedmodels/PartyInterfaces";

export default class Party {
  static async fetchPartyData(playerId: number): Promise<IParty> {
    const client = await pool.connect();
    try {
      const output = await client.query('SELECT * FROM parties WHERE player_id = $1 LIMIT 1;', [playerId]);

      let unit0: null | number = null, unit1: null | number = null, unit2: null | number = null, unit3: null | number = null;
      if (unit0) { unit0 = Number(output.rows[0].first_unit_id) };
      if (unit1) { unit1 = Number(output.rows[0].second_unit_id) };
      if (unit2) { unit2 = Number(output.rows[0].third_unit_id) };
      if (unit3) { unit3 = Number(output.rows[0].fourth_unit_id) };

      return {
        id: output.rows[0].id,
        unit0,
        unit1,
        unit2,
        unit3
      }
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
}