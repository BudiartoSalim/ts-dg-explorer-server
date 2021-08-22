import { IUnit } from "../../interfaces/definedmodels/UnitInterfaces";
import pool from "../../dbconfig/postgres";
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

  static async hireUnit(playerId: number, unit: IUnit): Promise<IUnit> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN;');
      const insertEquipSheetQueryResult = await client.query(
        `INSERT INTO equips
          (first_skill_id, second_skill_id, main_weapon_item_id, sub_weapon_item_id, armor_item_id, accessory_item_id,
          first_consumable_item_id, second_consumable_item_id, created_at, updated_at)
        VALUES(null, null, null, null, null, null, null, null, NOW(), NOW())
        RETURNING *;`
      );
      const newUnitEquipSheet = insertEquipSheetQueryResult.rows[0];

      const insertUnitQueryResult = await client.query(
        `INSERT INTO units
          (player_id, name, gender, level, level_cap, current_xp, next_xp, max_hp, current_hp,
          max_energy, current_energy, base_atk, base_def, base_spd, base_hit, class_id, equip_id, created_at, updated_at) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17, NOW(), NOW())
        RETURNING *;
      `,
        [playerId, unit.name, unit.gender, unit.level, unit.levelCap, unit.currentXp, unit.nextXp, unit.maxHp, unit.currentHp,
          unit.maxEnergy, unit.currentEnergy, unit.baseAtk, unit.baseDef, unit.baseSpd, unit.baseHit, unit.class,
          newUnitEquipSheet.id
        ]
      );
      await client.query('COMMIT;');

      const newUnit = insertUnitQueryResult.rows[0];
      return {
        id: newUnit.id,
        playerId: newUnit.player_id,
        name: newUnit.name,
        gender: newUnit.gender,
        level: newUnit.level,
        levelCap: newUnit.level_cap,
        currentXp: newUnit.current_xp,
        nextXp: newUnit.next_xp,
        maxHp: newUnit.max_hp,
        currentHp: newUnit.current_hp,
        maxEnergy: newUnit.max_energy,
        currentEnergy: newUnit.current_energy,
        baseAtk: newUnit.base_atk,
        baseDef: newUnit.base_def,
        baseSpd: newUnit.base_spd,
        baseHit: newUnit.base_hit,
        class: newUnit.class_id,
        equips: newUnit.equip_id
      }

    } catch (err) {
      await client.query('ROLLBACK');
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
        e += Math.floor(Math.random() * remainingInitialStatBonus);
        remainingInitialStatBonus -= e;
        return e;
      });

      let gender = 'female';
      if (remainingInitialStatBonus % 2 === 0) {
        gender = 'male';
      };

      if (!classId) {
        classId = Math.ceil(Math.random());
      };


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