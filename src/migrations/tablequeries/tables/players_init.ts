// players.name is not in the ERD yet, do not forget to modify the ERD for consistency

export const players_init =
  `CREATE TABLE IF NOT EXISTS "players"(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  money INTEGER,
  current_xp INTEGER,
  next_xp INTEGER,
  rank INTEGER,
  rank_cap INTEGER,
  session VARCHAR(255),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  UNIQUE(email)
);`;