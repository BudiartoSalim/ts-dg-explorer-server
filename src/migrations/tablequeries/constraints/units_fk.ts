export const units_fk_init =
  `ALTER TABLE "units"
    ADD CONSTRAINT fk_unit_class_id
    FOREIGN KEY (class_id)
      REFERENCES "classes"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_unit_equips_id
    FOREIGN KEY (equip_id)
      REFERENCES "equips"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_unit_player_id
    FOREIGN KEY (player_id)
      REFERENCES "players"(id)
      ON DELETE SET NULL
;
`;