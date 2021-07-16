import { IUnit } from "../interfaces/models/UnitInterfaces";
import pool from "../dbconfig/postgres";
import { IParty } from "../interfaces/models/PartyInterfaces";

export default class Unit {

  /*  
    static async boilerPlate() {
      const client = await pool.connect();
      try {
  
      } catch (err) {
        throw err;
      } finally {
        client.release();
      }
    }
   */
  static async generateUnit(partyId: number) {
    const client = await pool.connect();
    try {

    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  static async getUnitByIdAsync(unitId: number) {
    const client = await pool.connect();
    try {
      return client.query('SELECT * FROM units WHERE id = $1 LIMIT 1;', [unitId]);
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  static async getUnitById(unitId: number): Promise<IUnit> {
    const client = await pool.connect();
    try {
      const unitDataRows = await client.query('SELECT * FROM units WHERE id = $1 LIMIT 1;', [unitId]);
      const unitData = unitDataRows.rows[0];

      return {
        name: unitData.name,
        gender: unitData.gender,
        level: unitData.level,
        levelCap: unitData.level_cap,
        currentXp: unitData.current_xp,
        nextXp: unitData.next_xp,
        maxHp: unitData.max_hp,
        currentHp: unitData.current_hp,
        maxEnergy: unitData.max_energy,
        currentEnergy: unitData.current_energy,
        baseAtk: unitData.base_atk,
        baseDef: unitData.base_def,
        baseSpd: unitData.base_spd,
        baseHit: unitData.base_hit,
        equips: unitData.equip_id,
        class: unitData.class_id
      }
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }


}