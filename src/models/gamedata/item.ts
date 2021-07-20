import pool from "../../dbconfig/postgres";
import { IItem } from "../../interfaces/definedmodels/ItemInterface";

export default class Item {
  static async addItemsToDBAsync(items: IItem[]) {
    const client = await pool.connect();
    try {
      const queries = items.map((e) => {
        return client.query(
          `INSERT INTO 
          items(id, name, description, type,effect,effect_power,base_price,
            equip_stat_hp,equip_stat_energy,equip_stat_atk,equip_stat_def,equip_stat_spd,equip_stat_hit,
            created_at,updated_at)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,NOW(),NOW());
          `,
          [e.id, e.name, e.description, e.type, e.effect, e.effectPower, e.basePrice,
          e.equipStatHp, e.equipStatEnergy, e.equipStatAtk, e.equipStatDef, e.equipStatSpd, e.equipStatHit])
      });
      console.log('finish adding all items to db');
      return Promise.all(queries);
    } catch (err) {
      console.log(err);
      console.log('failed to add items');
      throw err;
    } finally {
      client.release();
    }
  }

  static async addOneItemToDB(item: IItem): Promise<IItem> {
    const client = await pool.connect();
    try {
      const queryResult = await client.query(
        `INSERT INTO 
          items(id,name,description,type,effect,effect_power,base_price,
            equip_stat_hp,equip_stat_atk,equip_stat_def,equip_stat_spd,equip_stat_hit,created_at,updated_at)
          VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW(),NOW())
          RETURNING *;
          `,
        [item.id, item.name, item.description, item.type, item.effect, item.effectPower, item.basePrice,
        item.equipStatHp, item.equipStatEnergy, item.equipStatAtk, item.equipStatDef, item.equipStatSpd, item.equipStatHit]
      );
      const addedItem = queryResult.rows[0];

      return {
        id: addedItem.id,
        name: addedItem.name,
        description: addedItem.description,
        type: addedItem.type,
        effect: addedItem.effect,
        effectPower: addedItem.effect_power,
        basePrice: addedItem.base_price,
        equipStatHp: addedItem.equip_stat_hp,
        equipStatEnergy: addedItem.equip_stat_energy,
        equipStatAtk: addedItem.equip_stat_atk,
        equipStatDef: addedItem.equip_stat_def,
        equipStatHit: addedItem.equip_stat_hit,
        equipStatSpd: addedItem.equip_stat_spd
      };
    } catch (err) {
      console.log(err);
      console.log('failed to add items');
      throw err;
    } finally {
      client.release();
    }
  }
}