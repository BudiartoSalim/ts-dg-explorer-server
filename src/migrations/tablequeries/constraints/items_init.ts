export const player_init =
  `CREATE TABLE IF NOT EXISTS "players" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name (VARCHAR 255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  money INTEGER,
  current_xp INTEGER,
  next_xp INTEGER,
  rank INTEGER,
  rank_cap INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  UNIQUE(email)
);`;