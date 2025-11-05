```markdown
# Data Model

See apps/api/prisma/schema.prisma for the canonical schema.

Entities:
- curriculum_areas -> subjects -> big_ideas -> concepts -> know_do_statements
- users -> planners -> hexagons + hexagon_connections

Relationships:
- One curriculum area has many subjects.
- One subject has many big ideas.
- One big idea has many concepts.
- One concept has many know/do statements.
- One user has many planners.

Example JSON shapes are in docs/SEED_DATA.md.
```