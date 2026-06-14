import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

export function Effects() {
  return (
    // disableNormalPass keeps performance high.
    // multisampling={4} provides smooth edges without tanking mobile framerates.
    <EffectComposer disableNormalPass multisampling={4}>
      
      {/* 
        Bloom: 
        Extremely subtle. We use a very high threshold so only the brightest highlights 
        (like the rim light catching the glass edges or the particles) bloom. 
        A low intensity prevents the image from looking "washed out" or game-y.
      */}
      <Bloom 
        luminanceThreshold={0.95} // Increased threshold to limit bloom to very bright reflections
        luminanceSmoothing={0.9}
        height={300}
        intensity={0.15}          // Further reduced intensity for refined subtlety
        blendFunction={BlendFunction.SCREEN}
      />
      
      {/* 
        Chromatic Aberration:
        Adds a tiny bit of color fringing (red/blue shift), mimicking a high-end 
        anamorphic camera lens.
      */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.0008, 0.0008)} // Microscopic offset
      />

      {/* 
        Noise:
        Adds film grain to prevent color banding and give a textured, editorial 
        magazine feel. Opacity is microscopic so it's felt rather than explicitly seen.
      */}
      <Noise 
        opacity={0.015} 
        blendFunction={BlendFunction.OVERLAY} 
      />

      {/* 
        Vignette:
        Darkens the corners of the screen slightly to draw the eye to the center objects.
      */}
      <Vignette 
        eskil={false} 
        offset={0.1} 
        darkness={0.8} 
        blendFunction={BlendFunction.NORMAL} 
      />
      
    </EffectComposer>
  )
}
