import { ISkills } from "./SkillsInterface";

export interface IClass {
  id: number;
  name: string;
  hp_growth: number;
  energy_growth: number;
  def_growth: number;
  atk_growth: number;
  spd_growth: number;
  hit_growth: number;
  class_skills?: ISkills[];
  created_at?: Date;
  updated_at?: Date;
}