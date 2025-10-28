'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Confetti() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const count = 200

  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [])

  const colors = useMemo(() => {
    const temp = new Float32Array(count * 3)
    const colorPalette = [
      new THREE.Color('#ff6b9d'),
      new THREE.Color('#c06c84'),
      new THREE.Color('#6c5ce7'),
      new THREE.Color('#a29bfe'),
      new THREE.Color('#fd79a8'),
      new THREE.Color('#fdcb6e'),
    ]
    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      color.toArray(temp, i * 3)
    }
    return temp
  }, [])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.3, 0.3, 0.1]} />
      <meshStandardMaterial vertexColors />
      <instancedBufferAttribute attach="geometry-attributes-color" args={[colors, 3]} />
    </instancedMesh>
  )
}

function Balloons() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    groupRef.current.children.forEach((balloon, i) => {
      const t = state.clock.elapsedTime + i * 1000
      balloon.position.y = Math.sin(t / 2) * 2 + 5
      balloon.position.x = Math.sin(t / 3) * 3 + (i - 2) * 3
      balloon.rotation.z = Math.sin(t / 4) * 0.2
    })
  })

  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[(i - 2) * 3, 5, -5]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={['#ff6b9d', '#6c5ce7', '#fdcb6e', '#fd79a8', '#a29bfe'][i]}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Confetti />
        <Balloons />
      </Canvas>
    </div>
  )
}
