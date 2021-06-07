export const class_skills_init =
  `CREATE TABLE IF NOT EXISTS "class_skills" (
  class_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  PRIMARY KEY (class_id, skill_id)
);`;