
export const units_init =
  `CREATE TABLE IF NOT EXISTS "units" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    gender VARCHAR(6),
    level INTEGER,
    level_cap INTEGER,
    current_xp INTEGER,
    next_xp INTEGER,
    max_hp INTEGER,
    current_hp INTEGER,
    max_energy INTEGER,
    current_energy INTEGER,
    base_atk INTEGER,
    base_spd INTEGER,
    base_hit INTEGER,
    class_id INTEGER,
    equip_id INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);`;