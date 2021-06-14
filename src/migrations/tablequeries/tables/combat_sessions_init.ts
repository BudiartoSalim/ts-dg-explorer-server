//combat status = win / lose / in progress / enemy turn next / etc
export const combat_sessions_init =
  `CREATE TABLE IF NOT EXISTS "combat_sessions"(
    id SERIAL PRIMARY KEY,
    party_id INTEGER,
    area_id INTEGER,
    current_depth INTEGER,
    combat_status VARCHAR(30),
    first_enemy_id INTEGER,
    second_enemy_id INTEGER,
    third_enemy_id INTEGER,
    fourth_enemy_id INTEGER,
    fifth_enemy_id INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);`;