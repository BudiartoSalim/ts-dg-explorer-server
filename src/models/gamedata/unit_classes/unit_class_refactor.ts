import pool from "../../../dbconfig/postgres";
import { IClass } from "../../../interfaces/definedmodels/ClassInterface";

export default class UnitClass {
  static async addClassesToDBAsync(unitClasses: IClass[]) {
    const client = await pool.connect();
    try {
      const queries = unitClasses.map((e) => {
        return client.query(
          `INSERT INTO 
          classes(id, name, hp_growth, energy_growth, atk_growth, def_growth, spd_growth, hit_growth, created_at, updated_at)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8, NOW(), NOW());
          `,
          [e.id, e.name, e.hpGrowth, e.energyGrowth, e.atkGrowth, e.defGrowth, e.spdGrowth, e.hitGrowth]);
      });
      return Promise.all(queries);
    } catch (err) {
      console.log(err);
      console.log('failed to add classes');
      throw err;
    } finally {
      client.release();
    }
  }

  static async addOneClassToDB(unitclass: IClass): Promise<IClass> {
    const client = await pool.connect();
    try {
      const queryResult = await client.query(
        `INSERT INTO 
          classes(id, name, hp_growth, energy_growth, atk_growth, def_growth, spd_growth, hit_growth, created_at, updated_at)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8, NOW(), NOW())
          RETURNING *;
          `,
        [unitclass.id, unitclass.name, unitclass.hpGrowth, unitclass.energyGrowth,
        unitclass.atkGrowth, unitclass.defGrowth, unitclass.spdGrowth, unitclass.hitGrowth]);

      const addedClass = queryResult.rows[0];

      return {
        id: addedClass.id,
        name: addedClass.name,
        hpGrowth: addedClass.hp_growth,
        energyGrowth: addedClass.energy_growth,
        atkGrowth: addedClass.atk_growth,
        defGrowth: addedClass.def_growth,
        spdGrowth: addedClass.spd_growth,
        hitGrowth: addedClass.hit_growth
      };
    } catch (err) {
      console.log(err);
      console.log('failed to add class');
      throw err;
    } finally {
      client.release();
    }
  }

  static async get(id: number): Promise<IClass> {
    const client = await pool.connect();
    try {
      const { rows } = await client.query(`SELECT * FROM classes WHERE classes.id = $1 LIMIT 1;`, [id]);
      const fetchedClass = rows[0];
      return {
        id: fetchedClass.id,
        name: fetchedClass.name,
        hpGrowth: fetchedClass.hp_growth,
        energyGrowth: fetchedClass.energy_growth,
        atkGrowth: fetchedClass.atk_growth,
        defGrowth: fetchedClass.def_growth,
        spdGrowth: fetchedClass.spd_growth,
        hitGrowth: fetchedClass.hit_growth
      };
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

}