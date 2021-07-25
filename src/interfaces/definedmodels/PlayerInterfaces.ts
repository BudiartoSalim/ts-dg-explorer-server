import { IInventory } from "./InventoryInterface";
import { IParty } from "./PartyInterfaces";

export interface IPlayerCreds {
  email: string;
  name?: string;
  password: string;
}

export interface IPlayer {
  id: number;
  email?: string;
  name: string;
  password?: string;
  money: number;
  currentXp: number;
  nextXp: number;
  rank: number;
  rankCap: number;
  party?: IParty | number;
  inventory?: IInventory[];
  session?: string;
  createdAt?: Date;
  updatedAt?: Date;
}