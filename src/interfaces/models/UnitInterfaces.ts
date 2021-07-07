import { IClass } from "./ClassInterface";
import { IItem } from "./ItemInterface";
import { ISkills } from "./SkillsInterface";
export interface IUnit {
  id?: number;
  playerId?: number;
  name: string;
  gender: string;
  level: number;
  levelCap: number;
  currentXp: number;
  nextXp: number;
  maxHp: number;
  currentHp: number;
  maxEnergy: number;
  currentEnergy: number;
  baseAtk: number;
  baseSpd: number;
  baseHit: number;
  equips: {
    firstSkill: ISkills | null;
    secondSkill: ISkills | null;
    mainWeapon: IItem | null;
    subWeapon: IItem | null;
    armor: IItem | null;
    accessory: IItem | null;
    firstConsumable: IItem | null;
    secondConsumable: IItem | null;
  } | number;
  class: IClass | number;
  createdAt?: Date;
  updatedAt?: Date;
}