// items.type = type of the item (weapon, armor, accessory, consumable, etc)
// items.effect = will be the identifier for the effects and its assigned logic
// items.effect_power = will be the value of the effect strength
export const items_init =
  `CREATE TABLE IF NOT EXISTS "items"(
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    type VARCHAR(50),
    effect VARCHAR(255),
    effect_power INTEGER,
    base_price INTEGER,
    equip_stat_hp INTEGER,
    equip_stat_energy INTEGER,
    equip_stat_def INTEGER,
    equip_stat_atk INTEGER,
    equip_stat_spd INTEGER,
    equip_stat_hit INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);`;