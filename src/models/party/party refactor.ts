import pool from "../../dbconfig/postgres";
import { IParty } from "../../interfaces/definedmodels/PartyInterfaces";
import { IUnit } from "../../interfaces/definedmodels/UnitInterfaces";

export default class Party implements IParty {
  id?: number;
  playerId?: number | undefined;
  unit0: number | IUnit | null;
  unit1: number | IUnit | null;
  unit2: number | IUnit | null;
  unit3: number | IUnit | null;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;

  constructor(playerId: number) {
    this.playerId = playerId;
    this.unit0 = null;
    this.unit1 = null;
    this.unit2 = null;
    this.unit3 = null;
  }

  async fetchPartyData(playerId: number): Promise<IParty> {
    const client = await pool.connect();
    try {
      const output = await client.query('SELECT * FROM parties WHERE player_id = $1 LIMIT 1;', [playerId]);
      const row = output.rows[0];
      if (row.first_unit_id) { this.unit0 = Number(row.first_unit_id) };
      if (row.second_unit_id) { this.unit1 = Number(row.second_unit_id) };
      if (row.third_unit_id) { this.unit2 = Number(row.third_unit_id) };
      if (row.fourth_unit_id) { this.unit3 = Number(row.fourth_unit_id) };

      return this;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

}