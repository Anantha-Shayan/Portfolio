"use client";
// Scroll-driven network flight. `progress` is a float stop index (0 = first
// stop, N-1 = last). The packet rides a spline through the stop nodes, the
// camera follows it, and the packet leaves a short trail behind it.

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INK = "#3a1a24";
const ACCENT = "#7a1f35";

// Deterministic PRNG so the network is identical on every load.
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(stops: number, ambient: number) {
  const rand = mulberry32(21);
  const waypoints = Array.from({ length: stops }, (_, i) =>
    new THREE.Vector3(Math.sin(i * 1.1) * 2.6, Math.cos(i * 0.8) * 1.4, -i * 3.2),
  );
  const path = new THREE.CatmullRomCurve3(waypoints, false, "catmullrom", 0.4);

  const nodes: THREE.Vector3[] = [...waypoints];
  for (let i = 0; i < ambient; i++) {
    const c = path.getPoint(rand());
    const a = rand() * Math.PI * 2;
    const r = 1.6 + rand() * 4.2;
    nodes.push(new THREE.Vector3(c.x + Math.cos(a) * r, c.y + Math.sin(a) * r * 0.7, c.z + (rand() - 0.5) * 3));
  }

  const links = new Set<string>();
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: n.distanceTo(m) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach((x) => links.add(i < x.j ? `${i}-${x.j}` : `${x.j}-${i}`));
  });
  const pairs = [...links].map((k) => k.split("-").map(Number) as [number, number]);
  const lines = new Float32Array(pairs.length * 6);
  pairs.forEach(([a, b], i) => {
    nodes[a].toArray(lines, i * 6);
    nodes[b].toArray(lines, i * 6 + 3);
  });
  return { waypoints, path, nodes, lines };
}

const TRAIL = 70;

function Flight({ progress, stops, ambient }: { progress: MutableRefObject<number>; stops: number; ambient: number }) {
  const net = useMemo(() => buildNetwork(stops, ambient), [stops, ambient]);
  const smooth = useRef(0);
  const packet = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Mesh>(null);
  const group = useRef<THREE.Group>(null);

  const trail = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TRAIL * 3), 3));
    const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.55 }));
    line.frustumCulled = false;
    return line;
  }, []);
  const history = useRef<THREE.Vector3[]>([]);
  const look = useRef(new THREE.Vector3());

  useFrame(({ camera, clock, pointer }, delta) => {
    smooth.current += (progress.current - smooth.current) * Math.min(1, delta * 4);
    const s = smooth.current;
    const t = Math.min(Math.max(s / (stops - 1), 0), 1);
    const p = net.path.getPoint(t);
    const ahead = net.path.getPoint(Math.min(t + 0.02, 1));

    packet.current?.position.copy(p);
    if (halo.current) {
      halo.current.position.copy(p);
      const k = (clock.getElapsedTime() % 1.6) / 1.6;
      halo.current.scale.setScalar(0.4 + k * 0.9);
      (halo.current.material as THREE.MeshBasicMaterial).opacity = (1 - k) * 0.4;
    }

    // Trail: last positions of the packet.
    const h = history.current;
    if (!h.length || h[h.length - 1].distanceTo(p) > 0.04) h.push(p.clone());
    if (h.length > TRAIL) h.shift();
    const attr = trail.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < TRAIL; i++) {
      const v = h[Math.max(0, h.length - TRAIL + i)] ?? p;
      attr.setXYZ(i, v.x, v.y, v.z);
    }
    attr.needsUpdate = true;

    // Even stops put the text on the left, so the packet sits on the right (and vice versa).
    const side = Math.cos(s * Math.PI);
    const offset = side * 3.1;
    const target = new THREE.Vector3(p.x - offset, p.y, p.z);
    look.current.lerp(target, 1 - Math.exp(-delta * 5));
    camera.position.set(look.current.x + pointer.x * 0.25, look.current.y + 0.5 + pointer.y * 0.15, p.z + 6.5);
    camera.lookAt(look.current.x, look.current.y, ahead.z - 2);
    if (group.current) group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.02;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={INK} transparent opacity={0.16} />
      </lineSegments>
      {net.nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[i < stops ? 0.11 : 0.045, 16, 16]} />
          <meshBasicMaterial color={INK} transparent opacity={i < stops ? 1 : 0.55} />
        </mesh>
      ))}
      {net.waypoints.map((n, i) => (
        <mesh key={`r${i}`} position={n}>
          <ringGeometry args={[0.28, 0.3, 40]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
      <primitive object={trail} />
      <mesh ref={halo}>
        <ringGeometry args={[0.9, 1, 48]} />
        <meshBasicMaterial color={ACCENT} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={packet}>
        <sphereGeometry args={[0.17, 24, 24]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
    </group>
  );
}

export default function JourneyScene({ progress, stops }: { progress: MutableRefObject<number>; stops: number }) {
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40, near: 3.5, far: 80 }} dpr={[1, 1.75]} aria-hidden>
      <Flight progress={progress} stops={stops} ambient={small ? 40 : 90} />
    </Canvas>
  );
}
