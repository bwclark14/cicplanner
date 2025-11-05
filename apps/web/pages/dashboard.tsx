import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Dashboard() {
  const { data, error } = useSWR('/api/planners/my', fetcher, { revalidateOnFocus: false });

  // This endpoint may be implemented to fetch current user's planners.
  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="text-slate-600 mt-2">Your recent planners</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium">Example Planner</h3>
          <p className="text-sm text-slate-600 mt-1">A seeded example planner.</p>
          <div className="mt-3">
            <Link href="/planner/seeded"><a className="px-3 py-2 bg-indigo-600 text-white rounded">Open</a></Link>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Create new</h3>
          <p className="text-sm text-slate-600 mt-1">Start a new hexagonal planner.</p>
          <div className="mt-3">
            <Link href="/planner/new"><a className="px-3 py-2 border rounded">Create</a></Link>
          </div>
        </div>
      </div>
    </div>
  );
}