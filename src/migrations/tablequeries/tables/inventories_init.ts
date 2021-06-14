export const inventories_init =
  `CREATE TABLE IF NOT EXISTS "inventories"(
  player_id INTEGER NOT NULL,
  item_id INTEGER NOT NULL,
  amount INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  PRIMARY KEY (player_id, item_id)
);`;