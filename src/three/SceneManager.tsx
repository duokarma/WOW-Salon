import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ScrollCamera } from './camera/ScrollCamera'
import { LightingRig } from './lighting/LightingRig'
import { Effects } from './post/Effects'
import { FloatingSalonObject } from './hero/FloatingSalonObject'
import { GalleryCylinder } from './gallery/GalleryCylinder'
import { HeroParticles } from './particles/HeroParticles'
import { MorphBlob } from './blob/MorphBlob'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

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
    <div className="fixed inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          alpha: true, 
          antialias: false, 
          preserveDrawingBuffer: false,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]} // Cap DPR at 1.5 for performance on high-res screens, saves mobile GPU
      >
        <Suspense fallback={null}>
          <ResponsiveCamera />
          <LightingRig />
          
          <ScrollCamera />
          
          <group position={[0, 0, 0]}>
            <FloatingSalonObject />
            <HeroParticles />
            <MorphBlob />
          </group>
          
          <group position={[0, -10, 0]}>
            <GalleryCylinder />
          </group>
          
          {/* <Effects /> */}
        </Suspense>
      </Canvas>
    </div>
  )
}
