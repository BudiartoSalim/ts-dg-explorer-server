export const class_skills_fk_init =
  `ALTER TABLE "class_skills"
    ADD CONSTRAINT fk_class_skills_class_id
    FOREIGN KEY (class_id)
      REFERENCES "classes"(id)
      ON DELETE SET NULL,
    ADD CONSTRAINT fk_class_skills_skill_id
    FOREIGN KEY (skill_id)
      REFERENCES "skills"(id)
      ON DELETE SET NULL
;
`;