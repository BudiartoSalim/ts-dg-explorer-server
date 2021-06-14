export const enemies_fk_init =
  `ALTER TABLE "enemies"
    ADD CONSTRAINT fk_enemy_skill_id
    FOREIGN KEY (skill_id)
      REFERENCES "skills"(id)
      ON DELETE SET NULL
;
`;