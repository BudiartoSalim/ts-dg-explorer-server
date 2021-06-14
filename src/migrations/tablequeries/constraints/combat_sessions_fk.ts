export const combat_sessions_fk_init =
  `ALTER TABLE "combat_sessions"
    ADD CONSTRAINT fk_combat_area_id
    FOREIGN KEY (area_id)
      REFERENCES "areas"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_fighting_party_id
    FOREIGN KEY (party_id)
      REFERENCES "parties"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_first_enemy_id
    FOREIGN KEY (first_enemy_id)
      REFERENCES "enemies"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_second_enemy_id
    FOREIGN KEY (second_enemy_id)
      REFERENCES "enemies"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_third_enemy_id
    FOREIGN KEY (third_enemy_id)
      REFERENCES "enemies"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_fourth_enemy_id
    FOREIGN KEY (fourth_enemy_id)
      REFERENCES "enemies"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_fifth_enemy_id
    FOREIGN KEY (fifth_enemy_id)
      REFERENCES "enemies"(id)
      ON DELETE SET NULL
;
`;