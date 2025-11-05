import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing seeded data (safe in dev)
  await prisma.hexagon_connections.deleteMany();
  await prisma.hexagons.deleteMany();
  await prisma.planners.deleteMany();
  await prisma.know_do_statements.deleteMany();
  await prisma.concepts.deleteMany();
  await prisma.big_ideas.deleteMany();
  await prisma.subjects.deleteMany();
  await prisma.curriculum_areas.deleteMany();
  await prisma.users.deleteMany();

  // Create demo user
  const user = await prisma.users.create({
    data: { email: 'teacher@example.com', name: 'Demo Teacher' }
  });

  // Curriculum Areas with Subjects, Big Ideas, Concepts (levels 1-4), and Know/Do statements
  // 1) Expressive Arts
  const expressiveArts = await prisma.curriculum_areas.create({
    data: { name: 'Expressive Arts', slug: 'expressive-arts', description: 'Creativity, art, design, drama and music' }
  });

  const art = await prisma.subjects.create({
    data: { curriculum_area_id: expressiveArts.id, name: 'Art & Design', slug: 'art-design', description: 'Visual art skills and media' }
  });

  const drama = await prisma.subjects.create({
    data: { curriculum_area_id: expressiveArts.id, name: 'Drama', slug: 'drama', description: 'Performance and storytelling' }
  });

  const music = await prisma.subjects.create({
    data: { curriculum_area_id: expressiveArts.id, name: 'Music', slug: 'music', description: 'Listening, composing and performing' }
  });

  // Big ideas for Art
  const artIdeas = [
    { title: 'Exploring materials', desc: 'Using media and materials' },
    { title: 'Composition & form', desc: 'Arranging visual elements' }
  ];

  for (const bi of artIdeas) {
    const bigIdea = await prisma.big_ideas.create({
      data: { subject_id: art.id, title: bi.title, description: bi.desc }
    });

    // create concepts across levels 1-4
    for (let level = 1; level <= 4; level++) {
      const concept = await prisma.concepts.create({
        data: { big_idea_id: bigIdea.id, title: `${bi.title} — L${level}`, description: `Progression for ${bi.title} level ${level}`, level }
      });

      await prisma.know_do_statements.createMany({
        data: [
          { concept_id: concept.id, text: `Identify basic elements of ${bi.title}`, type: 'know', level },
          { concept_id: concept.id, text: `Practise a simple ${bi.title} activity`, type: 'do', level }
        ]
      });
    }
  }

  // Big ideas for Drama
  const dramaIdea = await prisma.big_ideas.create({ data: { subject_id: drama.id, title: 'Role & narrative', description: 'Using voice, role-play and storytelling' } });
  for (let level = 1; level <= 4; level++) {
    const c = await prisma.concepts.create({ data: { big_idea_id: dramaIdea.id, title: `Role & narrative — L${level}`, description: `Drama progression ${level}`, level } });
    await prisma.know_do_statements.createMany({
      data: [
        { concept_id: c.id, text: `Take on simple roles and act them out`, type: 'do', level },
        { concept_id: c.id, text: `Describe feelings of characters`, type: 'know', level }
      ]
    });
  }

  // Big ideas for Music
  const musicIdea = await prisma.big_ideas.create({ data: { subject_id: music.id, title: 'Rhythm & listening', description: 'Understanding beat and listening skills' } });
  for (let level = 1; level <= 4; level++) {
    const c = await prisma.concepts.create({ data: { big_idea_id: musicIdea.id, title: `Rhythm & listening — L${level}`, description: `Music progression ${level}`, level } });
    await prisma.know_do_statements.createMany({
      data: [
        { concept_id: c.id, text: `Keep a steady beat`, type: 'do', level },
        { concept_id: c.id, text: `Identify simple rhythms`, type: 'know', level }
      ]
    });
  }

  // 2) Numeracy & Mathematics
  const numeracy = await prisma.curriculum_areas.create({
    data: { name: 'Numeracy & Mathematics', slug: 'numeracy-maths', description: 'Numbers, algebra, measurement, geometry and statistics' }
  });

  const numeracySubject = await prisma.subjects.create({
    data: { curriculum_area_id: numeracy.id, name: 'Numeracy', slug: 'numeracy', description: 'Number sense and problem solving' }
  });

  const numberIdea = await prisma.big_ideas.create({ data: { subject_id: numeracySubject.id, title: 'Number sense', description: 'Counting, place value, operations' } });

  // Concepts for number across levels
  const numberConcepts = [
    { title: 'Counting and place value' },
    { title: 'Addition & subtraction strategies' },
    { title: 'Multiplication & division' }
  ];

  for (const nc of numberConcepts) {
    for (let level = 1; level <= 4; level++) {
      const c = await prisma.concepts.create({
        data: { big_idea_id: numberIdea.id, title: `${nc.title} — L${level}`, description: `${nc.title} progression level ${level}`, level }
      });
      await prisma.know_do_statements.createMany({
        data: [
          { concept_id: c.id, text: `Explain a simple idea related to ${nc.title}`, type: 'know', level },
          { concept_id: c.id, text: `Complete age-appropriate ${nc.title} tasks`, type: 'do', level }
        ]
      });
    }
  }

  // 3) Health & Wellbeing
  const wellbeing = await prisma.curriculum_areas.create({
    data: { name: 'Health & Wellbeing', slug: 'health-wellbeing', description: 'Physical, mental and social wellbeing' }
  });

  const wellbeingSubject = await prisma.subjects.create({
    data: { curriculum_area_id: wellbeing.id, name: 'Wellbeing', slug: 'wellbeing', description: 'Physical activity, relationships and safety' }
  });

  const wellbeingIdea = await prisma.big_ideas.create({ data: { subject_id: wellbeingSubject.id, title: 'Personal learning', description: 'Self-awareness and resilience' } });

  for (let level = 1; level <= 4; level++) {
    const c = await prisma.concepts.create({
      data: { big_idea_id: wellbeingIdea.id, title: `Self-awareness — L${level}`, description: `Developing self-awareness level ${level}`, level }
    });
    await prisma.know_do_statements.createMany({
      data: [
        { concept_id: c.id, text: 'Identify feelings and talk about them', type: 'know', level },
        { concept_id: c.id, text: 'Practise a strategy to manage emotions', type: 'do', level }
      ]
    });
  }

  // 4) Sciences
  const sciences = await prisma.curriculum_areas.create({
    data: { name: 'Sciences', slug: 'sciences', description: 'Biological, physical and environmental sciences' }
  });

  const scienceSubject = await prisma.subjects.create({
    data: { curriculum_area_id: sciences.id, name: 'Science', slug: 'science', description: 'Understanding scientific concepts and inquiry' }
  });

  const envIdea = await prisma.big_ideas.create({ data: { subject_id: scienceSubject.id, title: 'Environment & ecosystems', description: 'Plants, animals and habitats' } });

  for (let level = 1; level <= 4; level++) {
    const c = await prisma.concepts.create({
      data: { big_idea_id: envIdea.id, title: `Habitats & change — L${level}`, description: `Habitat study level ${level}`, level }
    });
    await prisma.know_do_statements.createMany({
      data: [
        { concept_id: c.id, text: 'Identify a local habitat', type: 'know', level },
        { concept_id: c.id, text: 'Record observations of plants/animals', type: 'do', level }
      ]
    });
  }

  // Create some sample planners for demo
  const planner1 = await prisma.planners.create({
    data: {
      user_id: user.id,
      title: 'Counting & Colour Planner',
      description: 'Combines numeracy and art concepts for a cross-curricular lesson',
      metadata: { levels: [1, 2] }
    }
  });

  const hexA = await prisma.hexagons.create({
    data: { planner_id: planner1.id, x: 100, y: 100, size: 1, label: 'Counting', concept_id: null, free_text: 'Counting activities', settings: {} }
  });
  const hexB = await prisma.hexagons.create({
    data: { planner_id: planner1.id, x: 260, y: 100, size: 1, label: 'Use of colour', concept_id: null, free_text: 'Colour mixing', settings: {} }
  });

  await prisma.hexagon_connections.create({
    data: { planner_id: planner1.id, from_hexagon_id: hexA.id, to_hexagon_id: hexB.id, label: 'Integration' }
  });

  const planner2 = await prisma.planners.create({
    data: {
      user_id: user.id,
      title: 'Habitat Exploration Planner',
      description: 'A science-focused planner with fieldwork and wellbeing links',
      metadata: { levels: [2, 3] }
    }
  });

  await prisma.hexagons.createMany({
    data: [
      { planner_id: planner2.id, x: 100, y: 200, size: 1, label: 'Local habitat', free_text: 'Investigate pond', settings: {} },
      { planner_id: planner2.id, x: 260, y: 200, size: 1, label: 'Observation', free_text: 'Record species', settings: {} }
    ]
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });