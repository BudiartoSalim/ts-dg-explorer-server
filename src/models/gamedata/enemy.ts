import pool from "../../dbconfig/postgres";
import { IEnemy } from "../../interfaces/definedmodels/EnemyInterface";

export default class Enemy {
  static async addEnemiesToDBAsync(newEnemies: IEnemy[]) {
    const client = await pool.connect();
    try {
      const queries = newEnemies.map((e) => {
        if (e.skill && typeof e.skill !== 'number') { e.skill = null };
        return client.query(
          `INSERT INTO 
          enemies(id, name, description, level, base_xp, base_hp, base_energy,
            base_atk, base_def, base_spd, base_hit, skill_id, created_at, updated_at)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW());
          `,
          [e.id, e.name, e.description, e.level, e.baseXp, e.baseHp, e.baseEnergy, e.baseAtk, e.baseDef, e.baseSpd, e.baseHit, e.skill]);
      });
      return Promise.all(queries);
    } catch (err) {
      console.log(err);
      console.log('failed to add new enemies');
      throw err;
    } finally {
      client.release();
    }
  }

  static async addOneEnemyToDB(newEnemy: IEnemy): Promise<IEnemy> {
    const client = await pool.connect();
    try {
      if (newEnemy.skill && typeof newEnemy.skill !== 'number') { newEnemy.skill = null };
      const queryResult = await client.query(
        `INSERT INTO 
        enemies(id, name, description, level, base_xp, base_hp, base_energy,
          base_atk, base_def, base_spd, base_hit, skill_id, created_at, updated_at)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW())
        RETURNING *;
          `,
        [newEnemy.id, newEnemy.name, newEnemy.description, newEnemy.level, newEnemy.baseXp, newEnemy.baseHp, newEnemy.baseEnergy,
        newEnemy.baseAtk, newEnemy.baseDef, newEnemy.baseSpd, newEnemy.baseHit, newEnemy.skill]);

      const addedEnemy = queryResult.rows[0];

      return {
        id: addedEnemy.id,
        name: addedEnemy.name,
        description: addedEnemy.description,
        level: addedEnemy.level,
        baseXp: addedEnemy.base_xp,
        baseHp: addedEnemy.base_hp,
        currentHp: addedEnemy.base_hp,
        baseEnergy: addedEnemy.base_energy,
        currentEnergy: addedEnemy.current_energy,
        baseAtk: addedEnemy.baseAtk,
        baseDef: addedEnemy.baseDef,
        baseSpd: addedEnemy.baseSpd,
        baseHit: addedEnemy.baseSpd,
        skill: addedEnemy.skill
      };
    } catch (err) {
      console.log(err);
      console.log('failed to add enemy');
      throw err;
    } finally {
      client.release();
    }
  }

}