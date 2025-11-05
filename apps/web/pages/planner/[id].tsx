import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdvancedEditor from '../../components/HexGrid/AdvancedEditor';
import ConceptPalette from '../../components/HexGrid/ConceptPalette';

export default function PlannerPage() {
  const router = useRouter();
  const { id } = router.query;
  const [planner, setPlanner] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedConceptToPlace, setSelectedConceptToPlace] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/planners/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setPlanner(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSave(hexes: any[], connections: any[]) {
    if (!planner) return;
    const payload = {
      title: planner.title,
      description: planner.description,
      metadata: planner.metadata || {},
      hexagons: hexes.map((h) => ({
        id: h.id,
        planner_id: planner.id,
        x: h.x,
        y: h.y,
        size: Math.max(1, Math.round((h.size ?? 48) / 48)),
        label: h.label,
        concept_id: h.concept_id ?? null,
        free_text: h.free_text ?? null,
        settings: {}
      })),
      connections: connections.map((c) => ({
        id: c.id,
        planner_id: planner.id,
        from_hexagon_id: c.from_hexagon_id,
        to_hexagon_id: c.to_hexagon_id,
        label: c.label ?? null
      }))
    };

    const res = await fetch(`/api/planners/${planner.id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      alert('Error saving planner');
      return;
    }
    const updated = await res.json();
    setPlanner(updated);
    alert('Planner saved');
  }

  if (loading || !planner) {
    return <div className="max-w-5xl mx-auto">Loading planner...</div>;
  }

  const mappedHexes = planner.hexagons.map((h: any, idx: number) => ({
    id: h.id,
    x: typeof h.x === 'number' ? h.x : idx * 120,
    y: typeof h.y === 'number' ? h.y : 0,
    size: Math.max(36, (h.size ?? 1) * 48),
    label: h.label ?? h.free_text ?? 'Hex',
    concept_id: h.concept_id,
    free_text: h.free_text
  }));

  const mappedConnections = (planner.connections || []).map((c: any) => ({
    id: c.id,
    from_hexagon_id: c.from_hexagon_id,
    to_hexagon_id: c.to_hexagon_id,
    label: c.label
  }));

  return (
    <div className="max-w-7xl mx-auto md:flex gap-6">
      <div className="md:w-80">
        <ConceptPalette onSelectForPlace={(concept) => setSelectedConceptToPlace(concept)} />
        <div className="mt-4 bg-white p-3 rounded shadow">
          <h4 className="font-semibold">Planner details</h4>
          <div className="text-sm text-slate-600 mt-2">Title: {planner.title}</div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{planner.title}</h2>
          <div className="flex gap-2">
            <button
              className="px-3 py-2 bg-emerald-600 text-white rounded"
              onClick={() => {
                import('html2pdf.js').then((mod) => {
                  const html2pdf = (mod as any).default || (mod as any);
                  html2pdf().from(document.body).save(`${planner?.title || 'planner'}.pdf`);
                });
              }}
            >
              Export PDF
            </button>
          </div>
        </div>

        <div className="mt-4">
          <AdvancedEditor
            initialHexes={mappedHexes}
            initialConnections={mappedConnections}
            onSave={handleSave}
            placeConcept={selectedConceptToPlace}
            onPlaced={() => {
              // clear selection after placing (touch place)
              setSelectedConceptToPlace(null);
            }}
          />
        </div>
      </div>
    </div>
  );
}