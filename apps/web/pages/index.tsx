import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="py-10">
        <h1 className="text-4xl font-bold">Curriculum Planner for Scotland</h1>
        <p className="mt-3 text-lg text-slate-600">Browse Education Scotland curriculum statements and build hexagonal planners for your classroom.</p>
        <div className="mt-6 space-x-3">
          <Link href="/signup"><a className="px-4 py-2 bg-indigo-600 text-white rounded">Get started</a></Link>
          <Link href="/curriculum"><a className="px-4 py-2 border rounded">Browse curriculum</a></Link>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Interactive Planner</h3>
          <p className="text-sm text-slate-600 mt-2">Create connected hexagons and link them to curriculum concepts. Works on iPad and desktop.</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Curriculum Browser</h3>
          <p className="text-sm text-slate-600 mt-2">Filter by area, subject, level and explore know & do statements.</p>
        </div>
      </section>
    </div>
  );
}