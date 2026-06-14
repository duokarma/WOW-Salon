import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useState } from 'react'
import { Float, MeshTransmissionMaterial, TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

export function FloatingSalonObject() {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Target rotation state for smooth, weighty mouse tracking
  const targetRotation = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(true)

  useFrame((state, delta) => {
    // Only render when in Hero section to save massive draw calls
    if (typeof window !== 'undefined') {
      const inView = window.scrollY < window.innerHeight * 1.5
      if (inView !== isVisible) setIsVisible(inView)
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
    <group ref={groupRef} visible={isVisible}>
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
          A complex TorusKnot represents abstract, elegant curves
          symbolic of hair styling and natural flow. Reduced detail on mobile.
        */}
        <TorusKnot ref={meshRef} args={[1.2, 0.35, isMobile ? 32 : 64, isMobile ? 8 : 16]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            backside={false} // Renders backside for realistic glass refraction only on desktop
            samples={isMobile ? 1 : 2} // Balanced for high performance + premium visual
            thickness={1.5}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.3} // Adds organic, fluid rippling inside the glass
            distortionScale={0.4}
            temporalDistortion={0.05} // Animated distortion
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.2}
            roughness={0.05}
            ior={1.45} // Index of refraction similar to fine glass/crystal
            color="#ffffff"
            resolution={isMobile ? 64 : 128} // Capped resolution keeps mobile performance smooth
          />
        </TorusKnot>
      </Float>
    </group>
  )
}
