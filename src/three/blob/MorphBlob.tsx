import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function MorphBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  
  // Base coordinates. Positioned at y: -8 to perfectly intersect with the CTA section 
  // at the end of our ScrollCamera GSAP timeline (which ends at y: -9).
  const basePosition = new THREE.Vector3(2, -8, -2) 
  const segments = typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 32
  const [isVisible, setIsVisible] = useState(false)

  useFrame((state, delta) => {
    if (typeof window !== 'undefined') {
      const inView = window.scrollY > document.documentElement.scrollHeight - window.innerHeight * 3
      if (inView !== isVisible) setIsVisible(inView)
      if (!inView) return
    }
    if (!meshRef.current) return

    // 1. Organic Ambient Rotation
    meshRef.current.rotation.x -= delta * 0.05
    meshRef.current.rotation.y -= delta * 0.08

    // 2. Weighty Interactive Parallax
    // The liquid blob smoothly gravitates toward the mouse pointer
    const targetX = basePosition.x + state.pointer.x * 2
    const targetY = basePosition.y + state.pointer.y * 2

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.03 // Very slow lerp for a heavy, luxurious liquid feel
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.03
    )

    // 3. Dynamic Morphing Speed
    // The liquid agitates and morphs faster when the mouse is further from the center
    const pointerDistance = Math.sqrt(state.pointer.x ** 2 + state.pointer.y ** 2)
    if (materialRef.current) {
      materialRef.current.speed = THREE.MathUtils.lerp(
        materialRef.current.speed,
        1.5 + pointerDistance * 3.5, // Idles at 1.5, ramps up to 5 on edges
        0.05
      )
    }
  })

  return (
    // High segment count is essential for smooth liquid vertex distortion, but reduced on mobile for perf
    <Sphere ref={meshRef} args={[1.5, segments, segments]} position={basePosition.toArray()} visible={isVisible}>
      {/* 
        MeshDistortMaterial perfectly simulates an amorphous, morphing liquid blob.
        We pair it with high metalness and clearcoat for a premium, wet-mercury aesthetic.
      */}
      <MeshDistortMaterial
        ref={materialRef}
        color="#ffffff"
        envMapIntensity={3}     // Extreme environmental reflection
        clearcoat={1}           // Wet, glossy top-layer finish
        clearcoatRoughness={0.05}
        metalness={0.85}        // Highly metallic liquid
        roughness={0.1}         // Highly polished surface
        distort={0.4}           // Amplitude of the liquid morphing
        speed={1.5}             // Base frequency of the liquid morphing
        transparent
        opacity={0.9}
      />
    </Sphere>
  )
}
