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
          [e.id, e.name, e.description, e.type, e.effect, e.effectPower, e.cost]);
      });
      console.log("skills inserted successfully.");
      return Promise.all(queries);
    } catch (err) {
      console.log(err);
      console.log('failed to add skills');
      throw err;
    } finally {
      client.release();
    }
  }

  static async addOneSkillToDB(skill: ISkills): Promise<ISkills> {
    const client = await pool.connect();
    try {
      const queryResult = await client.query(
        `INSERT INTO 
        skills(id, name, description, type, effect, effect_power, cost, created_at, updated_at) 
        VALUES($1,$2,$3,$4,$5,$6,$7,NOW(),NOW())
        RETURNING *;`,
        [skill.id, skill.name, skill.description, skill.type, skill.effect, skill.effectPower, skill.cost]
      );
      const addedSkill = queryResult.rows[0];
      return {
        id: addedSkill.id,
        name: addedSkill.name,
        description: addedSkill.description,
        type: addedSkill.type,
        effect: addedSkill.effect,
        effectPower: addedSkill.effect_power,
        cost: addedSkill.cost
      };

    } catch (err) {
      console.log(err);
      console.log("failed to add skill");
      throw err;
    } finally {
      client.release();
    }
  }
}
