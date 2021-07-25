import { IItem } from "./ItemInterface";
import { ISkills } from "./SkillsInterface";
export interface IEquip {
  id?: number;
  firstSkill: ISkills | null;
  secondSkill: ISkills | null;
  mainWeapon: IItem | null;
  subWeapon: IItem | null;
  armor: IItem | null;
  accessory: IItem | null;
  firstConsumable: IItem | null;
  secondConsumable: IItem | null;
  createdAt?: Date;
  updatedAt?: Date;
}