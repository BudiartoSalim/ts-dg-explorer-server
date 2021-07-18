export interface ISkills {
  id: number;
  name: string;
  description: string;
  type: string;
  effect: string;
  effect_power: number;
  cost: number;
  created_at?: Date;
  updated_at?: Date;
}