export interface IItem {
  id: number;
  name: string;
  description: string;
  type: string;
  effect?: string;
  effectPower?: number;
  basePrice: number;
  equipStatHp: number;
  equipStatEnergy: number;
  equipStatAtk: number;
  equipStatDef: number;
  equipStatSpd: number;
  equipStatHit: number;
  createdAt?: Date;
  updatedAt?: Date;
}