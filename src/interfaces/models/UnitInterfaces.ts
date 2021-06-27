import { IClass } from "./ClassInterface";
import { IItem } from "./ItemInterface";
import { ISkills } from "./SkillsInterface";
export interface IUnit {
  id?: number;
  player_id?: number;
  name: string;
  gender: string;
  level: number;
  level_cap: number;
  current_xp: number;
  next_xp: number;
  max_hp: number;
  current_hp: number;
  max_energy: number;
  current_energy: number;
  base_atk: number;
  base_spd: number;
  base_hit: number;
  equips: {
    first_skill: ISkills | null;
    second_skill: ISkills | null;
    main_weapon: IItem | null;
    sub_weapon: IItem | null;
    armor: IItem | null;
    accessory: IItem | null;
    first_consumable: IItem | null;
    second_consumable: IItem | null;
  };
  class: IClass;
  created_at?: Date;
  updated_at?: Date;
}