import { ISkills } from "./SkillsInterface";

export interface IClass {
  id: number;
  name: string;
  hpGrowth: number;
  energyGrowth: number;
  atkGrowth: number;
  defGrowth: number;
  spdGrowth: number;
  hitGrowth: number;
  classSkills?: ISkills[];
  createdAt?: Date;
  updatedAt?: Date;
}