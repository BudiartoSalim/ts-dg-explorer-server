// min level defines the minimum enemy level to start dropping it
// 10000  chance = 100% chance
export const drops_init =
  `CREATE TABLE IF NOT EXISTS "drops" (
  item_id INTEGER NOT NULL,
  enemy_id INTEGER NOT NULL,
  min_quantity INTEGER,
  max_quantity INTEGER,
  min_level INTEGER,
  chance INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  PRIMARY KEY (class_id, skill_id)
);`;