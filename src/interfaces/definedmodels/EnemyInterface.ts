import { IClass } from "./ClassInterface";
import { IItem } from "./ItemInterface";
import { ISkills } from "./SkillsInterface";
export interface IEnemy {
  id?: number;
  name: string;
  description: string;
  level: number;
  baseXp: number;
  baseHp: number;
  currentHp?: number;
  baseEnergy: number;
  currentEnergy?: number;
  baseAtk: number;
  baseDef: number;
  baseSpd: number;
  baseHit: number;
  skill: ISkills | number | null;
  createdAt?: Date;
  updatedAt?: Date;
}