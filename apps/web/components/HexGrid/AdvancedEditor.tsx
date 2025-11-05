import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type Hex = {
  id: string;
  x: number; // pixel coords
  y: number;
  size?: number;
  label?: string;
  concept_id?: string | null;
  free_text?: string | null;
};

type Connection = {
  id: string;
  from_hexagon_id: string;
  to_hexagon_id: string;
  label?: string | null;
};

export default function AdvancedEditor({
  initialHexes = [],
  initialConnections = [],
  onSave,
  readOnly = false
}: {
  initialHexes?: Hex[];
  initialConnections?: Connection[];
  onSave?: (hexes: Hex[], connections: Connection[]) => Promise<void> | void;
  readOnly?: boolean;
}) {
  const [hexes, setHexes] = useState<Hex[]>(initialHexes);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);
  const [viewOffset, setViewOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [connectMode, setConnectMode] = useState(false);
  const [connectSource, setConnectSource] = useState<string | null>(null);
  const idCounter = useRef(1000);

  useEffect(() => setHexes(initialHexes), [initialHexes]);
  useEffect(() => setConnections(initialConnections), [initialConnections]);

  // Helpers: hex polygon points
  function hexPoints(cx: number, cy: number, r: number) {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  }

  function screenToSvgPoint(clientX: number, clientY: number) {
    if (!svgRef.current) return { x: clientX, y: clientY };
    const pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return { x: clientX, y: clientY };
    const inv = ctm.inverse();
    const p = pt.matrixTransform(inv);
    return { x: p.x - viewOffset.x, y: p.y - viewOffset.y };
  }

  // Pointer handlers for hex drag
  function onHexPointerDown(e: React.PointerEvent, hex: Hex) {
    if (readOnly) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    setDraggingId(hex.id);
    const p = screenToSvgPoint(e.clientX, e.clientY);
    setDragOffset({ x: p.x - hex.x, y: p.y - hex.y });
    e.stopPropagation();
  }

  function onPointerMove(e: React.PointerEvent) {
    if (draggingId) {
      const p = screenToSvgPoint(e.clientX, e.clientY);
      setHexes((prev) => prev.map((h) => (h.id === draggingId ? { ...h, x: p.x - dragOffset.x, y: p.y - dragOffset.y } : h)));
    } else if (isPanning && panStart) {
      // Calculate delta in screen pixels and update viewOffset
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;
      setPanStart({ x: e.clientX, y: e.clientY });
      setViewOffset((v) => ({ x: v.x + dx, y: v.y + dy }));
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    if (draggingId) {
      setDraggingId(null);
      // finalize position
    }
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
    }
  }

  function onBackgroundPointerDown(e: React.PointerEvent) {
    if (readOnly) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
  }

  // Add a new free-text hex at center of viewport
  function addHex({ label = 'New', concept_id = null }: { label?: string; concept_id?: string | null } = {}) {
    idCounter.current += 1;
    const newHex: Hex = {
      id: `h-${Date.now()}-${idCounter.current}`,
      x: (svgRef.current?.clientWidth ?? 800) / 2 - viewOffset.x,
      y: (svgRef.current?.clientHeight ?? 400) / 2 - viewOffset.y,
      size: 48,
      label,
      concept_id,
      free_text: concept_id ? null : label
    };
    setHexes((h) => [...h, newHex]);
  }

  function removeHex(id: string) {
    setHexes((h) => h.filter((x) => x.id !== id));
    setConnections((c) => c.filter((con) => con.from_hexagon_id !== id && con.to_hexagon_id !== id));
  }

  function startConnectMode() {
    setConnectMode(true);
    setConnectSource(null);
  }

  function handleHexClick(e: React.MouseEvent, hex: Hex) {
    e.stopPropagation();
    if (connectMode) {
      if (!connectSource) {
        setConnectSource(hex.id);
      } else if (connectSource === hex.id) {
        // clicked same - deselect
        setConnectSource(null);
      } else {
        // create connection
        const newConn: Connection = {
          id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          from_hexagon_id: connectSource,
          to_hexagon_id: hex.id,
          label: null
        };
        setConnections((c) => [...c, newConn]);
        setConnectSource(null);
        setConnectMode(false);
      }
      return;
    }

    // otherwise select or show details (for now simple prompt to edit label)
    const text = prompt('Edit hex label', hex.label || hex.free_text || '');
    if (text !== null) {
      setHexes((hs) => hs.map((h) => (h.id === hex.id ? { ...h, label: text, free_text: h.concept_id ? h.free_text : text } : h)));
    }
  }

  function removeConnection(id: string) {
    setConnections((c) => c.filter((x) => x.id !== id));
  }

  async function save() {
    if (onSave) {
      await onSave(hexes, connections);
    }
  }

  // Render connectors as straight lines between hex centers
  function renderConnections() {
    return connections.map((con) => {
      const from = hexes.find((h) => h.id === con.from_hexagon_id);
      const to = hexes.find((h) => h.id === con.to_hexagon_id);
      if (!from || !to) return null;
      const sx = from.x + viewOffset.x;
      const sy = from.y + viewOffset.y;
      const tx = to.x + viewOffset.x;
      const ty = to.y + viewOffset.y;
      const midX = (sx + tx) / 2;
      const midY = (sy + ty) / 2;
      return (
        <g key={con.id}>
          <line x1={sx} y1={sy} x2={tx} y2={ty} stroke="#94a3b8" strokeWidth={4} strokeLinecap="round" />
          {con.label && (
            <text x={midX} y={midY - 8} textAnchor="middle" fontSize={12} fill="#0f172a">{con.label}</text>
          )}
          {/* Invisible button to remove connection (long touch friendly) */}
          <rect
            x={Math.min(sx, tx) + Math.abs(tx - sx) / 2 - 18}
            y={Math.min(sy, ty) + Math.abs(ty - sy) / 2 - 18}
            width={36}
            height={36}
            fill="transparent"
            onClick={() => {
              if (confirm('Delete connection?')) removeConnection(con.id);
            }}
            style={{ cursor: 'pointer' }}
          />
        </g>
      );
    });
  }

  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 bg-indigo-600 text-white rounded touch-target"
            onClick={() => addHex({ label: 'New idea' })}
            aria-label="Add free-text hexagon"
            disabled={readOnly}
          >
            Add hex
          </button>
          <button
            className={clsx('px-3 py-2 rounded touch-target', connectMode ? 'bg-amber-500 text-white' : 'bg-slate-100')}
            onClick={startConnectMode}
            aria-pressed={connectMode}
            disabled={readOnly}
          >
            {connectMode ? (connectSource ? 'Select target' : 'Select source') : 'Connect hexes'}
          </button>
          <button
            className="px-3 py-2 bg-emerald-600 text-white rounded touch-target"
            onClick={save}
            disabled={readOnly}
            aria-label="Save planner"
          >
            Save
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 bg-slate-50 rounded"
            onClick={() => {
              // center view
              setViewOffset({ x: 0, y: 0 });
            }}
          >
            Reset view
          </button>
        </div>
      </div>

      <div className="border rounded overflow-hidden">
        <svg
          ref={svgRef}
          width="100%"
          height={500}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerDown={onBackgroundPointerDown}
          role="img"
          aria-label="Hexagonal planner canvas"
          style={{ touchAction: 'none', background: '#f8fafc', display: 'block' }}
        >
          <g transform={`translate(${viewOffset.x},${viewOffset.y})`}>
            {/* connections behind */}
            {renderConnections()}

            {/* hexes */}
            {hexes.map((h) => {
              const r = (h.size ?? 48) * 0.9;
              const points = hexPoints(h.x, h.y, r);
              return (
                <g key={h.id} transform={`translate(0,0)`}>
                  <polygon
                    points={points}
                    fill={h.concept_id ? '#eef2ff' : '#fff'}
                    stroke="#cbd5e1"
                    strokeWidth={2}
                    onPointerDown={(e) => onHexPointerDown(e as any, h)}
                    onClick={(e) => handleHexClick(e as any, h)}
                    style={{ touchAction: 'none', cursor: connectMode ? 'crosshair' : 'grab' }}
                  />
                  <text x={h.x} y={h.y + 4} fontSize={12} textAnchor="middle" fill="#0f172a" pointerEvents="none">
                    {h.label}
                  </text>
                  {/* delete button */}
                  {!readOnly && (
                    <rect
                      x={h.x + r - 12}
                      y={h.y - r}
                      width={24}
                      height={18}
                      rx={4}
                      fill="#ef4444"
                      onClick={() => {
                        if (confirm('Delete hexagon?')) removeHex(h.id);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="mt-3 text-sm text-slate-500">
        <div>Tips: Tap a hex to edit. Drag a hex to reposition. Use "Connect hexes" to draw connections (tap source, tap target). Pan by dragging the background.</div>
      </div>
    </div>
  );
}