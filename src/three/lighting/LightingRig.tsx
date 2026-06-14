import { Environment } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function LightingRig() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null)
  const fillLightRef = useRef<THREE.DirectionalLight>(null)
  const rimLightRef = useRef<THREE.SpotLight>(null)

  useFrame(() => {
    if (typeof window === 'undefined') return
    const scrollY = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1)

    if (keyLightRef.current) {
      keyLightRef.current.position.x = THREE.MathUtils.lerp(5, -2, progress)
      keyLightRef.current.intensity = THREE.MathUtils.lerp(1.5, 1.0, progress)
    }
    if (fillLightRef.current) {
      fillLightRef.current.position.x = THREE.MathUtils.lerp(-8, 5, progress)
      fillLightRef.current.intensity = THREE.MathUtils.lerp(0.8, 1.2, progress)
    }
    if (rimLightRef.current) {
      rimLightRef.current.position.y = THREE.MathUtils.lerp(5, 10, progress)
    }
  })
  return (
    <>
      {/* 
        1. HDR Environment:
        Essential for rendering realistic glass, chrome, and liquid metal.
        The 'studio' preset provides highly contrasted softbox reflections 
        that trace beautifully across curved reflective surfaces.
      */}
      <Environment preset="studio" />

      {/* 
        2. Key Light:
        The primary source of illumination. Positioned high and to the right.
        Uses a very subtle warm champagne tint (#fff1e6) for a flattering, 
        premium salon look. Casts the primary shadows.
      */}
      <directionalLight
        ref={keyLightRef}
        position={[5, 8, 5]}
        intensity={1.5}
        color="#fff1e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* 
        3. Rim Light (Backlight):
        Positioned behind the subjects. This is the secret to cinematic 3D.
        It catches the edges of the geometry, creating a luminous halo that 
        separates objects from the background and dramatically highlights 
        the refraction of the glass and the edges of the chrome.
      */}
      <spotLight
        ref={rimLightRef}
        position={[-5, 5, -8]}
        intensity={2.5}
        color="#ffffff"
        angle={0.6}
        penumbra={1}
      />

      {/* 
        4. Fill Light:
        Positioned opposite the Key Light. It uses a very subtle cool/lavender 
        tint (#e6e6fa) to lift harsh shadows. The warm key vs. cool fill 
        creates a rich, cinematic color contrast on the surfaces.
      */}
      <directionalLight
        ref={fillLightRef}
        position={[-8, 3, 5]}
        intensity={0.8}
        color="#e6e6fa"
      />

      {/* 
        5. Ambient Base:
        Just a whisper of global illumination to ensure no shadow is ever 100% pitch black.
      */}
      <ambientLight intensity={0.1} color="#ffffff" />
    </>
  )
}
