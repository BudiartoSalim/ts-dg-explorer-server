import { IUnit } from "../interfaces/definedmodels/UnitInterfaces";
import pool from "../dbconfig/postgres";
import jwt from 'jsonwebtoken';

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

  static async decodeUnitJwt(unitJwt: string): Promise<IUnit> {
    try {
      const payload = jwt.verify(unitJwt, process.env.UNIT_SECRET as string);

      return payload as IUnit;
    } catch (err) {
      throw 'invalid-unit-token';
    }
  }

  static async hireUnit(playerId: number, unit: IUnit) {
    const client = await pool.connect();
    try {

    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  static async generateUnit(classId: number): Promise<string> {
    const client = await pool.connect();
    try {
      let remainingInitialStatBonus = 5000;

      // index 0 - 5 = stat following the name of the variables in order.
      // ordered using array to make the code more concise and less repetitive, to make sure 
      // the order is correct for the product design/balance reason.
      let InitialHpEnergyHitSpdDefAtk = [0, 0, 0, 0, 0, 0].map((e) => {
        e = Math.floor(Math.random()) * remainingInitialStatBonus;
        remainingInitialStatBonus -= e;
        return e;
      });

      let gender = 'female';
      if (remainingInitialStatBonus % 2 === 0) {
        gender = 'male';
      }

      // this is so user cannot cheat by sending their dream unit with POST requests
      const newUnit: IUnit = {
        name: 'Will Randomz',
        gender,
        class: classId,
        equips: -1,
        level: 1,
        levelCap: 99,
        currentXp: 0,
        nextXp: 100,
        maxHp: InitialHpEnergyHitSpdDefAtk[0],
        currentHp: InitialHpEnergyHitSpdDefAtk[0],
        maxEnergy: InitialHpEnergyHitSpdDefAtk[1],
        currentEnergy: InitialHpEnergyHitSpdDefAtk[1],
        baseAtk: InitialHpEnergyHitSpdDefAtk[5],
        baseDef: InitialHpEnergyHitSpdDefAtk[4],
        baseSpd: InitialHpEnergyHitSpdDefAtk[3],
        baseHit: InitialHpEnergyHitSpdDefAtk[2]
      }
      const newUnitToken = jwt.sign(newUnit, process.env.UNIT_SECRET as string, { expiresIn: '1h' });
      return newUnitToken;
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