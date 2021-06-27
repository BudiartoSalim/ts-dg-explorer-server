import { IUnit } from "./UnitInterfaces";
export interface IParty {
  id: number;
  player_id?: number;
  first_unit: IUnit | null;
  second_unit: IUnit | null;
  third_unit: IUnit | null;
  fourth_unit: IUnit | null;
  created_at?: Date;
  updated_at?: Date;
}