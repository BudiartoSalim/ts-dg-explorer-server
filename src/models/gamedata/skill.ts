import pool from "../../dbconfig/postgres";
import { ISkills } from "../../interfaces/definedmodels/SkillsInterface";

export default class Skill {
  static async addSkillsToDBAsync(skills: ISkills[]) {
    const client = await pool.connect();
    try {
      const queries = skills.map((e) => {
        return client.query(
          `INSERT INTO 
          skills(id, name, description, type, effect, effect_power, cost, created_at, updated_at) 
          VALUES($1,$2,$3,$4,$5,$6,$7,NOW(),NOW());`,
          [e.id, e.name, e.description, e.type, e.effect, e.effect_power, e.cost]);
      });
      console.log("skills seed value inserted successfully.");
      return Promise.all(queries);
    } catch (err) {
      console.log(err);
      console.log('failed to seed skills');
    } finally {
      client.release();
    }
  }
}
