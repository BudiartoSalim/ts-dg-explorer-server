
export const enemies_init =
  `CREATE TABLE IF NOT EXISTS "enemies"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    level INTEGER,
    base_xp INTEGER,
    base_hp INTEGER,
    base_def INTEGER,
    base_energy INTEGER,
    base_atk INTEGER,
    base_spd INTEGER,
    base_hit INTEGER,
    skill_id INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);`;