"use client";
// The SasyaSampada knowledge base as a 3D point cloud: each dot is a real
// document chunk, laid out so that similar passages sit close together.
// Drag to rotate; hover or click a dot to read it.

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type SpacePoint = { d: number; p: [number, number, number] };

type Props = {
  points: SpacePoint[];
  colors: string[];
  activeDoc: number | null;
  hover: number | null;
  selected: number | null;
  linked: number[];
  query: [number, number, number] | null;
  hits: number[];
  onHover: (i: number | null) => void;
  onSelect: (i: number | null) => void;
};

const ACCENT = "#7a1f35";
const INK = "#1d1317";
const PAPER = "#f4efe5";
const BASE = 0.06;

type Rot = { x: number; y: number; dragging: boolean; lastX: number; lastY: number; idle: number };

function Cloud({ points, colors, activeDoc, hover, selected, linked, query, hits, onHover, onSelect, rot }: Props & { rot: React.MutableRefObject<Rot> }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const marker = useRef<THREE.Mesh>(null);

  const highlighted = useMemo(() => new Set<number>([...(selected !== null ? [selected] : []), ...linked, ...hits]), [selected, linked, hits]);

  // Per-instance position, size and colour: faded when filtered out, larger when highlighted.
  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const dummy = new THREE.Object3D();
    const paper = new THREE.Color(PAPER);
    const c = new THREE.Color();
    points.forEach((pt, i) => {
      // With a question active, everything except its retrieved passages fades back.
      const dimmed = ((activeDoc !== null && pt.d !== activeDoc) || hits.length > 0) && !highlighted.has(i);
      const focus = highlighted.has(i) || hover === i;
      dummy.position.set(...pt.p);
      dummy.scale.setScalar(BASE * (selected === i ? 3.2 : focus ? 2.2 : dimmed ? 0.55 : 1));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      c.set(selected === i ? INK : colors[pt.d]);
      if (dimmed) c.lerp(paper, 0.8);
      m.setColorAt(i, c);
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [points, colors, activeDoc, hover, selected, hits, highlighted]);

  // Lines from the selected dot (or the question) to what it relates to.
  const lines = useMemo(() => {
    const from = query ?? (selected !== null ? points[selected].p : null);
    const to = query ? hits : linked;
    if (!from || !to.length) return null;
    const arr = new Float32Array(to.length * 6);
    to.forEach((j, k) => { arr.set(from, k * 6); arr.set(points[j].p, k * 6 + 3); });
    return arr;
  }, [query, selected, linked, hits, points]);

  useFrame(({ clock }, delta) => {
    const r = rot.current;
    if (!r.dragging) { r.idle += delta; if (r.idle > 1.5 && selected === null && !query) r.y += delta * 0.12; }
    if (group.current) { group.current.rotation.y = r.y; group.current.rotation.x = r.x; }
    if (marker.current) marker.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 3) * 0.15);
  });

  return (
    <group ref={group}>
      <instancedMesh
        ref={mesh}
        args={[undefined, undefined, points.length]}
        onPointerMove={(e) => { e.stopPropagation(); if (e.instanceId !== undefined) onHover(e.instanceId); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { onHover(null); document.body.style.cursor = ""; }}
        onClick={(e) => { e.stopPropagation(); if (e.instanceId !== undefined) onSelect(e.instanceId); }}
      >
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial />
      </instancedMesh>

      {lines && (
        <lineSegments key={lines.length + (query ? "q" : "s")}>
          <bufferGeometry><bufferAttribute attach="attributes-position" args={[lines, 3]} /></bufferGeometry>
          <lineBasicMaterial color={INK} transparent opacity={0.6} depthTest={false} />
        </lineSegments>
      )}

      {query && (
        <mesh ref={marker} position={query} renderOrder={10}>
          <sphereGeometry args={[0.2, 20, 20]} />
          <meshBasicMaterial color={ACCENT} depthTest={false} />
        </mesh>
      )}
    </group>
  );
}

export default function KnowledgeSpace3D(props: Omit<Props, never>) {
  const rot = useRef<Rot>({ x: 0.25, y: 0, dragging: false, lastX: 0, lastY: 0, idle: 0 });

  const down = (e: React.PointerEvent) => { const r = rot.current; r.dragging = true; r.lastX = e.clientX; r.lastY = e.clientY; r.idle = 0; };
  const move = (e: React.PointerEvent) => {
    const r = rot.current;
    if (!r.dragging) return;
    r.y += (e.clientX - r.lastX) * 0.008;
    r.x = Math.max(-1.2, Math.min(1.2, r.x + (e.clientY - r.lastY) * 0.008));
    r.lastX = e.clientX; r.lastY = e.clientY; r.idle = 0;
  };
  const up = () => { rot.current.dragging = false; rot.current.idle = 0; };

  return (
    <div className="h-full w-full touch-none" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}>
      <Canvas camera={{ position: [0, 0, 7.4], fov: 45 }} dpr={[1, 1.75]} onPointerMissed={() => props.onSelect(null)} aria-hidden>
        <Cloud {...props} rot={rot} />
      </Canvas>
    </div>
  );
}
