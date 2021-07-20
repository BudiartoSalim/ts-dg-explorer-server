export interface ISkills {
  id: number;
  name: string;
  description: string;
  type: string;
  effect: string;
  effectPower: number;
  cost: number;
  createdAt?: Date;
  updatedAt?: Date;
}