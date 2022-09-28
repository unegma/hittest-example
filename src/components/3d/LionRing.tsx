/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, {useEffect, useRef} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useXR} from "@react-three/xr";
const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/lion-ring-transformed.glb`;

type GLTFResult = GLTF & {
  nodes: {
    lion_ring: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
  }
}

export default function LionRing({ ...props }: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF(ITEM_URI, 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/') as GLTFResult

  console.log('Test %cTest', 'color: goldenrod; font-size: 16px;')
  console.log(nodes, materials)

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.lion_ring.geometry} scale={0.2}>
        <meshStandardMaterial color="goldenrod" metalness={0.9} roughness={0.1} stencilWrite={true} shadowSide={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

useGLTF.preload(ITEM_URI)
