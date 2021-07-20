import { IItem } from "./ItemInterface";
export interface IInventory {
  item: IItem;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}