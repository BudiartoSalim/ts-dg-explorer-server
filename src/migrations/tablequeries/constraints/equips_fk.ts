// main_weapon_id = items.id with "weapon" type
// sub_weapon_id = items.id with "weapon" type
// armor_id = items.id with "armor" type
// accessory_id = items.id with "accessories" type
// first_consumable_id and second_consumable_id = items.id with "consumables" type
// first_skill_id and second_skill_id = skills.id

export const equips_fk_init =
  `ALTER TABLE "equips"
    ADD CONSTRAINT fk_first_skill
      FOREIGN KEY (first_skill_id)
        REFERENCES "skills"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_second_skill
      FOREIGN KEY (second_skill_id)
        REFERENCES "skills"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_main_weapon
      FOREIGN KEY (main_weapon_item_id)
        REFERENCES "items"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_sub_weapon
      FOREIGN KEY (sub_weapon_item_id)
        REFERENCES "items"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_armor
      FOREIGN KEY (armor_item_id)
        REFERENCES "items"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_accs
      FOREIGN KEY (accessory_item_id)
        REFERENCES "items"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_first_consumable
      FOREIGN KEY (first_consumable_item_id)
        REFERENCES "items"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_second_consumable
      FOREIGN KEY (second_consumable_item_id)
        REFERENCES "items"(id)
        ON DELETE SET NULL
;`;