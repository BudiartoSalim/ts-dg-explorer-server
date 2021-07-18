import { IItem } from "./ItemInterface";
export interface IInventory {
  item: IItem;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}