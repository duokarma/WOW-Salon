import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export function ScrollCamera() {
  const { camera } = useThree()

  useEffect(() => {
    // Reset camera state in case of hot reload
    camera.position.set(0, 0, 5)
    camera.rotation.set(0, 0, 0)
    
    // We map GSAP timelines to explicit DOM elements so the 3D components perfectly
    // match the vertical scroll layout.

    // Phase 1: 0% -> 25% (Hero to Services - Move left)
    gsap.to(camera.position, {
      x: -4,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        endTrigger: '#services',
        end: 'top top',
        scrub: 1.2,
      }
    })

    // Phase 2: 25% -> 50% (Services to Staff - Move forward)
    gsap.to(camera.position, {
      z: 1,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#services',
        start: 'top top',
        endTrigger: '#gallery',
        end: 'top top',
        scrub: 1.2,
      }
    })

    // Phase 3: 50% -> 75% (Staff to Gallery Spacer - Rotate toward gallery)
    // The camera tilts down perfectly when the gallery spacer enters the viewport
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: '#gallery',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.2,
      }
    })
    tl3.to(camera.position, { x: 0, y: -5, z: 4, ease: 'power2.inOut' }, 0)
    tl3.to(camera.rotation, { x: -Math.PI / 8, ease: 'power2.inOut' }, 0)

    // Phase 4: 75% -> 100% (Reviews to CTA - Zoom into MorphBlob)
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: '#cta',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.2,
      }
    })
    tl4.to(camera.position, { y: -8, z: 2, ease: 'power3.inOut' }, 0)
    tl4.to(camera.rotation, { x: 0, ease: 'power3.inOut' }, 0)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [camera])

  return null
}
