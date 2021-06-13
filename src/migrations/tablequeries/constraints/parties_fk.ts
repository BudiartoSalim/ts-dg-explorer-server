
export const parties_fk_init =
  `ALTER TABLE "parties" (
    ADD CONSTRAINT fk_party_owner_id
      FOREIGN KEY (player_id)
        REFERENCES "players"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_first_unit_in_pt
      FOREIGN KEY (first_unit_id)
        REFERENCES "units"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_second_unit_in_pt
      FOREIGN KEY (second_unit_id)
        REFERENCES "units"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_third_unit_in_pt
      FOREIGN KEY (third_unit_id)
        REFERENCES "units"(id)
        ON DELETE SET NULL,
    ADD CONSTRAINT fk_fourth_unit_in_pt
      FOREIGN KEY (fourth_unit_id)
        REFERENCES "units"(id)
        ON DELETE SET NULL
);`;