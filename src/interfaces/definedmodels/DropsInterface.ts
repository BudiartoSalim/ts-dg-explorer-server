import { IItem } from "./ItemInterface";
export interface IDrops {
  item: IItem | number;
  min_quantity: number;
  max_quantity: number;
  min_level: number;
  chance: number;
  createdAt?: Date;
  updatedAt?: Date;
}