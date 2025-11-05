import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-semibold">Curriculum Planner (Scotland)</a>
        </Link>
        <div className="space-x-3">
          <Link href="/curriculum"><a className="text-sm px-3 py-2 rounded hover:bg-slate-100">Curriculum</a></Link>
          <Link href="/dashboard"><a className="text-sm px-3 py-2 rounded hover:bg-slate-100">Dashboard</a></Link>
          <Link href="/planner/new"><a className="text-sm px-3 py-2 rounded bg-indigo-600 text-white">Create Planner</a></Link>
        </div>
      </div>
    </nav>
  );
}