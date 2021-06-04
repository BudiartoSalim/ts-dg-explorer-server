export const classes_init =
  `CREATE TABLE IF NOT EXISTS "classes" (
  id SERIAL PRIMARY KEY,
  name (VARCHAR 255) NOT NULL,
  hp_growth INTEGER,
  energy_growth INTEGER,
  atk_growth INTEGEER,
  spd_growth INTEGER,
  hit_growth INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);`;