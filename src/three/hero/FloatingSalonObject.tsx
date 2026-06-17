import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Torus } from '@react-three/drei'
import * as THREE from 'three'

export const FloatingSalonObject = React.memo(function FloatingSalonObject() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Target rotation state for smooth, weighty mouse tracking
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Only render when in Hero section to save massive draw calls
    if (typeof window !== 'undefined') {
      const inView = window.scrollY < window.innerHeight * 1.5
      groupRef.current.visible = inView
      if (!inView) return
    }
    // 1. Parallax/Mouse interaction
    // Interpolate towards the pointer position for a smooth, heavy feel
    targetRotation.current.x = THREE.MathUtils.lerp(
      targetRotation.current.x,
      (state.pointer.y * Math.PI) / 8, // Subtle vertical tilt
      0.05
    )
    targetRotation.current.y = THREE.MathUtils.lerp(
      targetRotation.current.y,
      (state.pointer.x * Math.PI) / 8, // Subtle horizontal twist
      0.05
    )

    if (groupRef.current) {
      groupRef.current.rotation.x = targetRotation.current.x
      groupRef.current.rotation.y = targetRotation.current.y
    }

    // 2. Slow continuous rotation on the mesh itself
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* 
        Float creates the slow hovering/bobbing motion 
        perfect for a centerpiece object.
      */}
      <Float
        speed={1.5} 
        rotationIntensity={0.2}
        floatIntensity={1.5}
        floatingRange={[-0.4, 0.4]}
      >
        {/* 
          A minimalist Torus (ring) represents timeless elegance,
          flow, and perfection. It's much cleaner than the TorusKnot.
        */}
        <Torus ref={meshRef} args={[1.4, 0.08, isMobile ? 16 : 32, isMobile ? 48 : 64]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            backside={false} 
            samples={1} 
            thickness={1.5}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.02} 
            distortionScale={0.1}
            temporalDistortion={0.01}
            clearcoat={1}
            clearcoatRoughness={0.05}
            metalness={0.15}
            roughness={0.02}
            ior={1.2} 
            color="#ffffff"
            resolution={isMobile ? 64 : 128} 
          />
        </Torus>
      </Float>
    </group>
  )
})
