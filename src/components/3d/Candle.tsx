import * as THREE from 'three'
import React, {MutableRefObject, useEffect, useRef, useState} from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useHitTest, useXR} from "@react-three/xr";
import {ItemProps} from "../../types/ItemProps";
import {Matrix4} from "@react-three/fiber";
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


export default function Candle({ scale = 1, position = [0,0,0], xrScaleOffset = 1, xrPositionOffset = [0,-5,-5], setDebug }: ItemProps) {
  // const group = useRef<MutableRefObject>(null)
  const group = React.useRef<THREE.Group>(null!)
  const { nodes, materials } = useGLTF(ITEM_URI, 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/') as GLTFResult

  console.log('Test %cTest', 'color: goldenrod; font-size: 16px;')
  console.log(nodes, materials)

  const {
    isPresenting
  } = useXR();

  const [localScale, setLocalScale] = useState(scale);
  const [localPosition, setLocalPosition] = useState(position);

  useEffect(() => {
    console.log(`Is Presenting is: ${isPresenting}`);
    if (isPresenting) {
      setLocalScale(scale*xrScaleOffset);
      setLocalPosition(xrPositionOffset);
    } else {
      setLocalScale(scale)
      setLocalPosition(position)
    }
  }, [isPresenting]);

  useHitTest((hitMatrix: THREE.Matrix4, hit: XRHitTestResult) => {
    // mesh.current.applyMatrix4(hitMatrix)
    hitMatrix.decompose(group.current.position, group.current.quaternion, group.current.scale)

    // @ts-ignore
    setDebug({
      hitMatrix: hitMatrix,
      hit: hit,
      localScale: localScale,
      localPosition: localPosition
    })
  })

  return (
    <group ref={group} dispose={null} scale={localScale} position={localPosition}>
      <mesh castShadow receiveShadow geometry={nodes.Candle.geometry} material={materials.Candle} position={[0, -0.06, 0]} />
      <group position={[-1.06, -0.59, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Lid_1.geometry} material={materials.Lid1} />
        <mesh castShadow receiveShadow geometry={nodes.Lid_2.geometry} material={materials.Lid2} />
      </group>
    </group>
  )
}

useGLTF.preload(ITEM_URI)
