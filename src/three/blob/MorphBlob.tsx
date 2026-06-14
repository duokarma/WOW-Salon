import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function MorphBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  
  // Base coordinates. Positioned at y: -8 to perfectly intersect with the CTA section 
  // at the end of our ScrollCamera GSAP timeline (which ends at y: -9).
  const basePosition = new THREE.Vector3(2, -8, -2) 

  useFrame((state, delta) => {
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
    // High segment count (128x128) is essential for smooth liquid vertex distortion
    <Sphere ref={meshRef} args={[1.5, 128, 128]} position={basePosition.toArray()}>
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
