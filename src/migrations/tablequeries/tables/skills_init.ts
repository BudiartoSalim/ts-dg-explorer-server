// skills.type will be the type of the skill which affects the skill activation logic (passive, onFirstTurn, onLowHealth, chance, and so on)
// skills.effect will be the effect identifier which defines the logic of the skill mechanism (atkup, heal, singletargetdmg, multitargetdmg, and so on)
// skills.effect_power will be used to adjust the skill's power
export const skills_init =
  `CREATE TABLE IF NOT EXISTS "skills"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    type VARCHAR(255),
    effect VARCHAR(255),
    effect_power VARCHAR(255),
    cost INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);`;