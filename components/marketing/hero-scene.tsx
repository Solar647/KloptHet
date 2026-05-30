'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function OrganicStem({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  const curve = useMemo(() => {
    const points = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      points.push(
        new THREE.Vector3(
          Math.sin(t * Math.PI * 1.5) * 0.3 * scale,
          t * 3 * scale,
          Math.cos(t * Math.PI * 0.8) * 0.2 * scale
        )
      )
    }
    return new THREE.CatmullRomCurve3(points)
  }, [scale])

  const geometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 30, 0.02 * scale, 8, false)
  }, [curve, scale])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.15
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2 + position[2]) * 0.08
    }
  })

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
    </mesh>
  )
}

function Petal({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
    </Float>
  )
}

// Vooraf berekende posities (buiten component om Math.random te vermijden tijdens render)
const PARTICLE_POSITIONS = (() => {
  const count = 80
  const pos = new Float32Array(count * 3)
  // Gebruik deterministische pseudo-random gebaseerd op index
  for (let i = 0; i < count; i++) {
    const t = i / count
    pos[i * 3] = Math.sin(i * 2.4) * 6
    pos[i * 3 + 1] = Math.cos(i * 1.7) * 4
    pos[i * 3 + 2] = Math.sin(i * 3.1) * 3 - 3
  }
  return pos
})()

function FloatingParticles() {
  const positions = useMemo(() => PARTICLE_POSITIONS, [])

  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#3AAC6E" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function Scene() {
  const stems = [
    { pos: [-5, -2.5, -2] as [number, number, number], color: '#1a3a1f', scale: 1.8 },
    { pos: [-4, -2, -1.5] as [number, number, number], color: '#2a5a30', scale: 1.4 },
    { pos: [-3.5, -2.8, -2.5] as [number, number, number], color: '#152b19', scale: 2.2 },
    { pos: [4.5, -2.5, -2] as [number, number, number], color: '#1a3a1f', scale: 1.6 },
    { pos: [5, -2, -1.5] as [number, number, number], color: '#2a5a30', scale: 1.3 },
    { pos: [3.8, -2.8, -2.5] as [number, number, number], color: '#152b19', scale: 2.0 },
    { pos: [-2, -2.5, -3] as [number, number, number], color: '#1e4a24', scale: 1.2 },
    { pos: [2, -2.5, -3] as [number, number, number], color: '#1e4a24', scale: 1.1 },
  ]

  const petals = [
    { pos: [-4.5, 1.5, -1] as [number, number, number], color: '#8B7355' },
    { pos: [-3.8, 0.8, -1.5] as [number, number, number], color: '#6B5B3E' },
    { pos: [4.2, 1.2, -1] as [number, number, number], color: '#8B7355' },
    { pos: [3.5, 0.5, -1.5] as [number, number, number], color: '#7A6A4A' },
    { pos: [-2.5, 2.0, -2] as [number, number, number], color: '#5a4a30' },
    { pos: [2.5, 1.8, -2] as [number, number, number], color: '#5a4a30' },
  ]

  return (
    <>
      <ambientLight intensity={0.3} color="#1a4a2a" />
      <directionalLight position={[0, 5, 3]} intensity={0.8} color="#2a6a3a" />
      <pointLight position={[-5, 2, 0]} intensity={0.5} color="#1a3a20" />
      <pointLight position={[5, 2, 0]} intensity={0.5} color="#1a3a20" />
      <fog attach="fog" args={['#040E07', 5, 20]} />

      {stems.map((s, i) => (
        <OrganicStem key={i} position={s.pos} color={s.color} scale={s.scale} />
      ))}

      {petals.map((p, i) => (
        <Petal key={i} position={p.pos} color={p.color} />
      ))}

      <FloatingParticles />
    </>
  )
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
