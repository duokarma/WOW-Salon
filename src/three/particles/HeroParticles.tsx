import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  
  attribute float aRandom;
  attribute float aSize;
  
  varying float vAlpha;
  
  void main() {
    // Base position
    vec3 pos = position;
    
    // 1. Floating Movement & Subtle Noise
    // We use time and randomness to create a gentle, organic breathing effect
    pos.x += sin(uTime * 0.2 + aRandom * 10.0) * 0.3;
    pos.y += cos(uTime * 0.3 + aRandom * 10.0) * 0.3;
    pos.z += sin(uTime * 0.1 + aRandom * 10.0) * 0.2;
    
    // 2. Mouse Interaction
    // The entire particle field gently shifts based on mouse position, 
    // but particles with higher randomness shift more, creating a parallax depth effect.
    pos.x += uPointer.x * (aRandom * 1.5);
    pos.y += uPointer.y * (aRandom * 1.5);
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Size attenuation (particles get smaller as they go further away)
    // Multiplied by aSize to give variety
    gl_PointSize = aSize * (15.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    
    // Calculate varying alpha for depth of field illusion
    // Particles too close to the camera or far away fade out
    float depthAlpha = smoothstep(-15.0, -2.0, mvPosition.z);
    vAlpha = depthAlpha * (0.2 + aRandom * 0.6);
  }
`

const fragmentShader = `
  varying float vAlpha;
  
  void main() {
    // Calculate distance from center of the point
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    // Create a soft glowing circle
    // Alpha interpolates smoothly from 0.5 (edge) to 0.1 (inner)
    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
    
    // Premium cinematic champagne/white color
    vec3 color = vec3(1.0, 0.98, 0.95);
    
    gl_FragColor = vec4(color, alpha);
  }
`

export function HeroParticles({ count = typeof window !== 'undefined' && window.innerWidth < 768 ? 1500 : 3000 }) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null)

  // Generate attributes heavily optimized with useMemo
  const [positions, sizes, randoms] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const randoms = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute particles in a wide 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 25     // x span
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20 // y span
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2 // z span (pushed slightly back)
      
      sizes[i] = Math.random() * 8.0 + 2.0 // Base size variability
      randoms[i] = Math.random() // Unique seed per particle
    }

    return [positions, sizes, randoms]
  }, [count])

  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0, 0) }
  }), [])

  useFrame((state) => {
    if (shaderRef.current) {
      // Update time for the floating animation
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
      
      // Smoothly interpolate the pointer for weighty luxury interaction
      shaderRef.current.uniforms.uPointer.value.lerp(
        new THREE.Vector2(state.pointer.x, state.pointer.y),
        0.05
      )
    }
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={count}
          array={randoms}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
