export interface IItem {
  id: number;
  name: string;
  description: string;
  type: string;
  effect?: string;
  effect_power?: number;
  base_price: number;
  equip_stat_hp: number;
  equip_stat_atk: number;
  equip_stat_spd: number;
  equip_stat_hit: number;
  created_at?: Date;
  updated_at?: Date;
}