
export const parties_init =
  `CREATE TABLE IF NOT EXISTS "parties"(
    id SERIAL PRIMARY KEY,
    player_id INTEGER,
    first_unit_id INTEGER,
    second_unit_id INTEGER,
    third_unit_id INTEGER,
    fourth_unit_id INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);`;