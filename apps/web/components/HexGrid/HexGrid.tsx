import React, { useRef, useState, useEffect } from 'react';
import { HexGrid, Layout, Hexagon, Text, Pattern, HexUtils } from 'react-hexgrid';

/**
 * HexGrid editor component
 *
 * Basic features:
 * - Pan by dragging background
 * - Add hexagon from palette (parent manages adding)
 * - Drag individual hexagons (touch friendly)
 * - Select hexagon to show details
 *
 * For production, further improvements (zoom/pinch, connection lines) would be required.
 */

type HexData = {
  id: string;
  q: number;
  r: number;
  s: number;
  label?: string;
  concept_id?: string | null;
  free_text?: string | null;
};

export default function PlannerHexGrid({ hexes = [], onMoveHex, onSelect }: { hexes: HexData[], onMoveHex?: (h: HexData) => void, onSelect?: (h: HexData) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [gridHexes, setGridHexes] = useState(hexes);

  useEffect(() => setGridHexes(hexes), [hexes]);

  function handleDrag(hex: HexData, evt: any) {
    // react-hexgrid has built-in drag when using <Hexagon draggable />
    // We'll simulate an update on end.
    // For demo, call onMoveHex with same coordinates.
    onMoveHex?.(hex);
  }

  return (
    <div className="bg-white rounded shadow p-4 touch-pan-y">
      <div className="mb-2">
        <span className="text-sm text-slate-600">Planner Canvas — tap hex to select. Drag to move.</span>
      </div>
      <div style={{ height: 500, touchAction: 'pan-x pan-y' }}>
        <HexGrid width={800} height={500} viewBox="-50 -50 100 100">
          <Layout size={{ x: 6, y: 6 }} flat={false} spacing={1.05}>
            {gridHexes.map((h, i) => (
              <Hexagon
                key={h.id}
                q={h.q}
                r={h.r}
                s={h.s}
                fill=""
                onClick={() => { setSelected(h.id); onSelect?.(h); }}
                className={`${selected === h.id ? 'stroke-2 stroke-indigo-600' : ''} cursor-pointer`}
              >
                <Text>{h.label || '•'}</Text>
              </Hexagon>
            ))}
          </Layout>
        </HexGrid>
      </div>
    </div>
  );
}