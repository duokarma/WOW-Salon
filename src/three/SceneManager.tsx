import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { LightingRig } from './lighting/LightingRig'
import { Effects } from './post/Effects'
import { FloatingSalonObject } from './hero/FloatingSalonObject'
import { HeroParticles } from './particles/HeroParticles'
import { MorphBlob } from './blob/MorphBlob'
import { useThree } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

function ResponsiveCamera() {
  const { camera, size } = useThree()
  
  useEffect(() => {
    // Dynamic FOV to prevent cutting off luxury assets on mobile
    if (size.width < 768) {
      (camera as any).fov = 65
    } else {
      (camera as any).fov = 45
    }
    camera.updateProjectionMatrix()
  }, [camera, size.width])
  
  return null
}

export function SceneManager() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ 
        alpha: true, 
        antialias: false, 
        preserveDrawingBuffer: false,
        powerPreference: "high-performance"
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ResponsiveCamera />
        <LightingRig />
        
        <group position={[0, 0, 0]}>
          <FloatingSalonObject />
          <HeroParticles />
          <MorphBlob />
        </group>
        
        <Effects />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
