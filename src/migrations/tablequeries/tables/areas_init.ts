export const areas_init =
  `CREATE TABLE IF NOT EXISTS "areas" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  base_level INTEGER,
  max_depth INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);`;