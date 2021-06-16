export interface IPlayer {
  id: number;
  email: string;
  name: string;
  password: string;
  money: number;
  current_xp: number;
  next_xp: number;
  rank: number;
  rank_cap: number;
  created_at: Date;
  updated_at: Date;
}