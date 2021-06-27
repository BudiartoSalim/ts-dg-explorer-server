import { IItem } from "./IItem";
export interface IInventory {
  item: IItem;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}