import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useXR} from "@react-three/xr";
const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/diamond-transformed.glb`;

type GLTFResult = GLTF & {
  nodes: {
    diamond: THREE.Mesh
  }
  materials: {
    diamond: THREE.MeshStandardMaterial
  }
}


export default function Diamond({ scale, xrScaleOffset = 10, ...props }: any) {
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
      <mesh castShadow receiveShadow geometry={nodes.diamond.geometry} material={materials.diamond}>
        <meshStandardMaterial color="silver" metalness={0.9} roughness={0.1} stencilWrite={true} shadowSide={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

useGLTF.preload(ITEM_URI)
