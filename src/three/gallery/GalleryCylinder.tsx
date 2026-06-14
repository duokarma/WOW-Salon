import { useRef } from 'react'
import { useFrame, ThreeEvent, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

import { getAsset } from '../../lib/assets'

// Use actual local project assets instead of remote placeholders to prevent 404 Suspense crashes
const GALLERY_IMAGES = [
  getAsset('/gallery_1.webp'),
  getAsset('/gallery_2.webp'),
  getAsset('/gallery_3.webp'),
  getAsset('/gallery_4.webp'),
  getAsset('/gallery_5.webp'),
  getAsset('/gallery_6.webp'),
  getAsset('/gallery_7.webp'),
  getAsset('/gallery_8.webp'),
  getAsset('/gallery_9.webp'),
  getAsset('/gallery_10.webp'),
  getAsset('/gallery_11.webp'),
  getAsset('/gallery_12.webp'),
]

export function GalleryCylinder() {
  const groupRef = useRef<THREE.Group>(null)
  const textures = useLoader(THREE.TextureLoader, GALLERY_IMAGES)
  
  // Custom drag state for precise physics control without OrbitControls
  const isDragging = useRef(false)
  const previousX = useRef(0)
  const velocity = useRef(0)
  const targetRotation = useRef(0)

  // Layout calculations
  const radius = 6.0 // Increased radius to accommodate 12 images instead of 6
  const itemCount = GALLERY_IMAGES.length

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    // Capture pointer to ensure dragging works seamlessly across the whole canvas/screen 
    // even if cursor accidentally slips off the mesh during a fast swipe
    ;(e.target as any).setPointerCapture(e.pointerId)
    
    isDragging.current = true
    previousX.current = e.clientX
    velocity.current = 0 // Stop existing inertia when touched
  }

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (!isDragging.current) return
    
    // Calculate drag distance
    const deltaX = e.clientX - previousX.current
    previousX.current = e.clientX
    
    // Multiply by sensitivity factor for heavy, premium rotation feel
    const rotationDelta = deltaX * 0.005
    
    targetRotation.current += rotationDelta
    // Track velocity to feed into inertia when released
    velocity.current = rotationDelta
  }

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    if (isDragging.current) {
      ;(e.target as any).releasePointerCapture(e.pointerId)
      isDragging.current = false
    }
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (!isDragging.current) {
      // 1. Apply inertia using stored release velocity
      targetRotation.current += velocity.current
      
      // 2. Friction / Dampening (gradually slows down the spin)
      velocity.current *= 0.92
      
      // 3. Ambient Auto-rotation (very slowly spins when totally idle)
      if (Math.abs(velocity.current) < 0.0001) {
        targetRotation.current -= delta * 0.05
      }
    }

    // Smoothly interpolate the actual rotation to the target rotation
    // using THREE.MathUtils.damp for frame-rate independent smoothing
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation.current,
      6,
      delta
    )
  })

  return (
    <group>
      {/* 
        Invisible Hit Area:
        A large invisible sphere that wraps the entire gallery. 
        It catches pointer events everywhere so there are no "dead zones" between images.
        Using a sphere instead of a cylinder makes touch targets huge and forgiving on mobile.
      */}
      <mesh 
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <sphereGeometry args={[radius + 1.5, 32, 32]} />
        <meshBasicMaterial visible={false} side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating Gallery Images */}
      <group ref={groupRef}>
        {GALLERY_IMAGES.map((url, i) => {
          // Distribute evenly in a circle
          const angle = (i / itemCount) * Math.PI * 2
          
          // Basic trig to find XYZ coordinate on the circle perimeter
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius
          
          return (
            <group 
              key={i} 
              position={[x, 0, z]} 
              // Point images outward relative to the center
              rotation={[0, angle, 0]}
            >
              <mesh>
                <planeGeometry args={[1.8, 2.6]} />
                <meshBasicMaterial 
                  map={textures[i]} 
                  transparent 
                  opacity={0.9} 
                  side={THREE.DoubleSide}
                  toneMapped={false}
                />
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}
