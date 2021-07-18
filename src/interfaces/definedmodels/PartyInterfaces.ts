import { IUnit } from "./UnitInterfaces";
export interface IParty {
  id: number;
  playerId?: number;
  firstUnit: IUnit | null | number;
  secondUnit: IUnit | null | number;
  thirdUnit: IUnit | null | number;
  fourthUnit: IUnit | null | number;
  createdAt?: Date;
  updatedAt?: Date;
}