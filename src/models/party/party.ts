import pool from "../../dbconfig/postgres";
import { IParty } from "../../interfaces/definedmodels/PartyInterfaces";
import { IUnit } from "../../interfaces/definedmodels/UnitInterfaces";

type UnitSlotType = 'unit0' | 'unit1' | 'unit2' | 'unit3';

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

  async fetchPartyData(): Promise<IParty> {
    const client = await pool.connect();
    try {
      const output = await client.query('SELECT * FROM parties WHERE player_id = $1 LIMIT 1;', [this.playerId]);
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

  async setUnitToParty(unitSlot: UnitSlotType, unitId: number) {
    const client = await pool.connect();
    try {
      // DO NOT make changes on UnitForeignKeyMap to be a direct value from client because the values is directly concatenated to query
      // String literal query for col name is due to node pg column and table names cannot be parameterized without additional library
      // String concatenating directly exposes the query to SQL Injection attack if the value inserted is decided by the user/client
      const UnitForeignKeyMap = {
        unit0: 'first_unit_id',
        unit1: 'second_unit_id',
        unit2: 'third_unit_id',
        unit3: 'fourth_unit_id'
      };
      await client.query(
        `UPDATE parties
        SET ${UnitForeignKeyMap[unitSlot]} = $1
        WHERE parties.player_id = $2;
      `,
        [unitId, this.playerId]
      );

      this[unitSlot] = unitId;
      return this;
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
}