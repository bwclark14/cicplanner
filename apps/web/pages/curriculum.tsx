import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function CurriculumBrowser() {
  const { data, error } = useSWR('/api/curriculum/areas', fetcher);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedConcept, setSelectedConcept] = useState<any>(null);

  if (!data) return <div>Loading curriculum...</div>;

  return (
    <div className="max-w-6xl mx-auto md:flex gap-6">
      <aside className="w-full md:w-1/3 bg-white rounded p-4 shadow">
        <h3 className="font-semibold">Areas & Subjects</h3>
        <div className="mt-3 space-y-3">
          {data.map((area: any) => (
            <div key={area.id}>
              <div className="font-medium">{area.name}</div>
              <div className="pl-3 mt-1">
                {area.subjects.map((s: any) => (
                  <button key={s.id} onClick={() => setSelectedSubject(s.id)} className="block text-left w-full py-1 hover:bg-slate-50 rounded">{s.name}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <section className="flex-1">
        {!selectedSubject ? (
          <div className="bg-white p-4 rounded shadow">Select a subject to explore concepts</div>
        ) : (
          <SubjectDetail subjectId={selectedSubject} onSelectConcept={(c)=>setSelectedConcept(c)} />
        )}
      </section>

      <aside className="w-full md:w-1/3">
        {selectedConcept ? <ConceptPanel concept={selectedConcept} /> : <div className="bg-white p-4 rounded shadow">Select a concept to see details</div>}
      </aside>
    </div>
  );
}

function SubjectDetail({ subjectId, onSelectConcept }: any) {
  const { data } = useSWR(`/api/curriculum/areas`, (url: string) => fetch(url).then(r => r.json()));
  if (!data) return <div>Loading...</div>;

  let subject:any = null;
  for (const a of data) {
    subject = a.subjects.find((s:any) => s.id === subjectId);
    if (subject) break;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{subject.name}</h3>
      <p className="text-sm mt-1 text-slate-600">{subject.description}</p>

      <div className="mt-4">
        {subject.big_ideas.map((bi:any) => (
          <div key={bi.id} className="mb-3">
            <div className="font-medium">{bi.title}</div>
            <div className="pl-3">
              {bi.concepts.map((c:any) => (
                <div key={c.id} className="py-2 border-b last:border-b-0 flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{c.title} <span className="text-xs text-slate-500">L{c.level}</span></div>
                    <div className="text-sm text-slate-600">{c.description}</div>
                  </div>
                  <div className="ml-4">
                    <button onClick={() => onSelectConcept(c)} className="px-2 py-1 bg-indigo-600 text-white rounded text-sm">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConceptPanel({ concept }: any) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold">{concept.title} <span className="text-xs text-slate-500">L{concept.level}</span></h4>
      <p className="text-sm text-slate-600 mt-2">{concept.description}</p>
      <div className="mt-3">
        <div className="font-medium">Know & Do statements</div>
        <ul className="mt-2 space-y-2">
          {concept.know_do_statements && concept.know_do_statements.map((s: any) => (
            <li key={s.id} className="text-sm">{s.type === 'know' ? 'Know:' : 'Do:'} {s.text}</li>
          ))}
        </ul>
        <div className="mt-4">
          <button className="px-3 py-2 bg-emerald-600 text-white rounded">Add to planner</button>
        </div>
      </div>
    </div>
  );
}