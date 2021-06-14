export const inventories_fk_init =
  `ALTER TABLE "inventories"
    ADD CONSTRAINT fk_inventory_owner_id
    FOREIGN KEY (player_id)
      REFERENCES "players"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_inventory_item_id
    FOREIGN KEY (item_id)
      REFERENCES "items"(id)
      ON DELETE SET NULL
;
`;