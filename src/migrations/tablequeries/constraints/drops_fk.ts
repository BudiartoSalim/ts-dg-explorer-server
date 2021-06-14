export const drops_fk_init =
  `ALTER TABLE "drops"
    ADD CONSTRAINT fk_drops_item_id
    FOREIGN KEY (item_id)
      REFERENCES "items"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_drops_enemy_id
    FOREIGN KEY (enemy_id)
      REFERENCES "enemies"(id)
      ON DELETE SET NULL
;
`;