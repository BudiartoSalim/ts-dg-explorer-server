import { IInventory } from "./InventoryInterface";
import { IParty } from "./PartyInterfaces";

export interface IPlayerCreds {
  email: string;
  name: string;
  password: string;
}

export interface IPlayer {
  id: number;
  email?: string;
  name: string;
  password?: string;
  money: number;
  current_xp: number;
  next_xp: number;
  rank: number;
  rank_cap: number;
  party?: IParty;
  inventory?: IInventory[];
  created_at?: Date;
  updated_at?: Date;
}