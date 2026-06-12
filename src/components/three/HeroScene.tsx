"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const COUNT = 2000; // 광선 개수
const LANES = 6; // 차선 개수
const FAR = -60; // 리스폰되는 깊이
const NEAR = 8; // 카메라를 지나치면 재생성되는 지점
const LANE_SPREAD = 8; // 화면 중심에서 각 차선 중심까지 거리
const LANE_RADIUS = 2.4; // 각 차선 안에서 광선이 퍼지는 반경

// 카메라를 향해 쏟아지는 빛줄기 — 하이퍼레인 / 워프 스트릭
function Hyperlane() {
  const lines = useRef<THREE.LineSegments>(null);
  const reduce = useReducedMotion();
  const drawn = useRef(false);
  // 각 광선의 가변 상태(x, y, z, speed) — render 밖(useFrame)에서만 접근
  const metaRef = useRef<Float32Array | null>(null);

  // 색상은 불변이므로 한 번만 생성 (position 버퍼는 매 프레임 geometry에서 갱신)
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 6); // 2 vertex(head/tail) * 3
    const colors = new Float32Array(COUNT * 6);

    const colA = new THREE.Color("#7b8cff"); // 인디고
    const colB = new THREE.Color("#ff5d9e"); // 핑크
    const tmp = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      const lane = i % LANES;
      // 차선마다 인디고~핑크 사이로 색을 분배
      tmp.copy(colA).lerp(colB, lane / (LANES - 1));
      const c = i * 6;
      colors.set([tmp.r, tmp.g, tmp.b], c);
      // tail은 더 어둡게(페이드 인 느낌)
      colors.set([tmp.r * 0.1, tmp.g * 0.1, tmp.b * 0.1], c + 3);
    }

    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    const seg = lines.current;
    if (!seg) return;

    // 광선 상태를 첫 프레임에 lazy-init (결정론적 의사난수로 차선에 분배)
    let meta = metaRef.current;
    if (!meta) {
      meta = new Float32Array(COUNT * 4);
      const pseudo = (n: number) => {
        const s = Math.sin(n * 127.1) * 43758.5453;
        return s - Math.floor(s); // 0~1 결정론적 의사난수
      };
      for (let i = 0; i < COUNT; i++) {
        const lane = i % LANES;
        const laneAngle = (lane / LANES) * Math.PI * 2;
        const cx = Math.cos(laneAngle) * LANE_SPREAD; // 차선 중심
        const cy = Math.sin(laneAngle) * LANE_SPREAD;

        // 차선 중심 주변으로 광선을 흩뿌림
        const lr = pseudo(i) * LANE_RADIUS;
        const la = pseudo(i + 0.37) * Math.PI * 2;
        const x = cx + Math.cos(la) * lr;
        const y = cy + Math.sin(la) * lr;
        const z = FAR + pseudo(i + 0.91) * (NEAR - FAR);
        const speed = 22 + pseudo(i + 0.5) * 40;
        meta.set([x, y, z, speed], i * 4);
      }
      metaRef.current = meta;
    }

    // 동작 줄이기 선호 시: 정적 프레임을 한 번만 그리고 흐름을 멈춘다 (멀미 방지)
    if (reduce && drawn.current) return;

    const arr = seg.geometry.attributes.position.array as Float32Array;
    const dt = reduce ? 0 : Math.min(delta, 0.05);

    for (let i = 0; i < COUNT; i++) {
      const m = i * 4;
      const x = meta[m];
      const y = meta[m + 1];
      let z = meta[m + 2] + meta[m + 3] * dt;
      const speed = meta[m + 3];

      if (z > NEAR) {
        z = FAR; // 카메라 지나치면 뒤로 재투입
      }
      meta[m + 2] = z;

      const streak = speed * 0.06; // 속도 비례 꼬리 길이

      const p = i * 6;
      arr[p] = x; // head
      arr[p + 1] = y;
      arr[p + 2] = z;
      arr[p + 3] = x; // tail (뒤로 늘어짐)
      arr[p + 4] = y;
      arr[p + 5] = z - streak;
    }

    seg.geometry.attributes.position.needsUpdate = true;
    // 레인 전체를 아주 천천히 굴려 깊이감 부여
    seg.rotation.z += dt * 0.04;
    drawn.current = true;
  });

  return (
    <lineSegments ref={lines}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 70 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Hyperlane />

        <EffectComposer>
          <Bloom
            intensity={1.4}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
