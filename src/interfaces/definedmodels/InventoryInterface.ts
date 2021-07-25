import { IItem } from "./ItemInterface";
export interface IInventory {
  item: IItem | number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}