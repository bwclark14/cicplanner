```markdown
# Seed Data & Format

The seed script at apps/api/scripts/seed.ts inserts mock Education Scotland content.

Structure:
- curriculum_areas: id, name, slug, description
- subjects: curriculum_area_id, name, slug
- big_ideas: subject_id, title, description
- concepts: big_idea_id, title, description, level (1-4)
- know_do_statements: concept_id, text, type ('know'|'do'), level

Modify the seed script to add fields or import CSV/JSON if desired.

To run seed:
pnpm seed-db
```