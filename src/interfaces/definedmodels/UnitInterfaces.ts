import { IClass } from "./ClassInterface";
import { IEquip } from "./EquipInterface";

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
  baseDef: number;
  baseSpd: number;
  baseHit: number;
  equips: IEquip | number;
  class: IClass | number;
  createdAt?: Date;
  updatedAt?: Date;
}