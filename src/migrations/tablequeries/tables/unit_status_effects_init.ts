export const unit_status_effects_init =
  `CREATE TABLE IF NOT EXISTS "unit_status_effects" (
  unit_id INTEGER NOT NULL,
  status_effect_id INTEGER NOT NULL,
  durations_left INTEGER,
  power INTEGER,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  PRIMARY KEY (unit_id, status_effect_id)
);`;