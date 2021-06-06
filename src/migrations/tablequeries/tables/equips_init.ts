// main_weapon_id = items.id with "weapon" type
// sub_weapon_id = items.id with "weapon" type
// armor_id = items.id with "armor" type
// accessory_id = items.id with "accessories" type
// first_consumable_id and second_consumable_id = items.id with "consumables" type
// first_skill_id and second_skill_id = skills.id

export const equips_init =
  `CREATE TABLE IF NOT EXISTS "equips" (
    id SERIAL PRIMARY KEY,
    first_skill_id INTEGER,
    second_skill_id INTEGER,
    main_weapon_item_id INTEGER,
    sub_weapon_item_id INTEGER,
    armor_item_id INTEGER,
    accessory_item_id INTEGER,
    first_consumable_item_id INTEGER,
    second_consumable_item_id INTEGER,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);`;