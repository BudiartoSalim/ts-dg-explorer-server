// type refers to buffatk1 / buffatk2 / debuffatk1 / and so on
// effect_type decides the logic
// base_power decides the power
export const status_effects_init =
  `CREATE TABLE IF NOT EXISTS "status_effects" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    effect_type VARCHAR(255),
    base_duration VARCHAR(255),
    base_power INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);`;