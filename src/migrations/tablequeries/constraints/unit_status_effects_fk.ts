export const unit_status_effects_fk_init =
  `ALTER TABLE "unit_status_effects"
    ADD CONSTRAINT fk_affected_unit_id
    FOREIGN KEY (unit_id)
      REFERENCES "units"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_active_effect_id
    FOREIGN KEY (status_effect_id)
      REFERENCES "status_effects"(id)
      ON DELETE SET NULL
;
`;