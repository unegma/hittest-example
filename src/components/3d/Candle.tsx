import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useXR} from "@react-three/xr";
const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/candle-transformed.glb`;

type GLTFResult = GLTF & {
  nodes: {
    Candle: THREE.Mesh
    Lid_1: THREE.Mesh
    Lid_2: THREE.Mesh
  }
  materials: {
    Candle: THREE.MeshStandardMaterial
    Lid1: THREE.MeshStandardMaterial
    Lid2: THREE.MeshStandardMaterial
  }
}


export default function Candle({ scale, xrScaleOffset = 10, ...props }: any) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF(ITEM_URI, 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/') as GLTFResult

  console.log('Test %cTest', 'color: goldenrod; font-size: 16px;')
  console.log(nodes, materials)

  const {
    isPresenting
  } = useXR();

  const [localScale, setLocalScale] = useState(scale);

  useEffect(() => {
    console.log(`Is Presenting is: ${isPresenting}`);
    if (isPresenting) {
      console.log(scale)
      // console.log(`Scale Offset: ${xrScaleOffset}`)
      setLocalScale(scale/xrScaleOffset);
      // console.log(localScale)
    } else {
      setLocalScale(scale)
    }
  }, [isPresenting]);

  return (
    <group ref={group} {...props} dispose={null} scale={localScale}>
      <mesh castShadow receiveShadow geometry={nodes.Candle.geometry} material={materials.Candle} position={[0, -0.06, 0]} />
      <group position={[-1.06, -0.59, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Lid_1.geometry} material={materials.Lid1} />
        <mesh castShadow receiveShadow geometry={nodes.Lid_2.geometry} material={materials.Lid2} />
      </group>
    </group>
  )
}

useGLTF.preload(ITEM_URI)
