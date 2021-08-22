import { IUnit } from "./UnitInterfaces";
export interface IParty {
  id?: number;
  playerId?: number;
  unit0: IUnit | null | number;
  unit1: IUnit | null | number;
  unit2: IUnit | null | number;
  unit3: IUnit | null | number;
  createdAt?: Date;
  updatedAt?: Date;
}