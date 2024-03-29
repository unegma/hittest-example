/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useFrame} from "@react-three/fiber";
const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/animated-person-2-transformed.glb`;


type GLTFResult = GLTF & {
  nodes: {
    Beta_Joints: THREE.SkinnedMesh
    Beta_Surface: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Beta_Joints_MAT1: THREE.MeshStandardMaterial
    Beta_HighLimbsGeoSG3: THREE.MeshStandardMaterial
  }
}

type ActionName = 'Armature|mixamo.com|Layer0'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function AnimatedPerson({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null!)
  // @ts-ignore
  const { nodes, materials, animations } = useGLTF(ITEM_URI, 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/') as GLTFResult
  // @ts-ignore
  const { actions } = useAnimations<GLTFActions>(animations, group)


  // @ts-ignore
  const [mixer] = useState(() => new THREE.AnimationMixer())

  useEffect(() => {
    // mixer.clipAction(animations[0], group.current).setDuration(1);
    mixer.clipAction(animations[0], group.current).play();
  }, [animations])

  useFrame((scene, delta) => {
    mixer?.update(delta)
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Beta_Joints" geometry={nodes.Beta_Joints.geometry} material={materials.Beta_Joints_MAT1} skeleton={nodes.Beta_Joints.skeleton} />
          <skinnedMesh name="Beta_Surface" geometry={nodes.Beta_Surface.geometry} material={materials.Beta_HighLimbsGeoSG3} skeleton={nodes.Beta_Surface.skeleton} />
        </group>
      </group>
    </group>
  )
}
