/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import {useGLTF, useAnimations, Box as DreiBox} from '@react-three/drei'
import {GLTF} from 'three-stdlib'
import {useFrame} from "@react-three/fiber";
import {useXR} from "@react-three/xr";
import {useBox} from "@react-three/cannon";

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh
    Head_Hands: THREE.SkinnedMesh
    Lower_Armor: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    Knight_MAT2: THREE.MeshStandardMaterial
  }
}

type ActionName = 'Armature|mixamo.com|Layer0'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function King({ scale = 0.01, position = [0,0,0], args = [0.006, 0.006, 0.006], xrScaleOffset = 0.5, xrPositionOffset = [0,0,-5], setDebug }: any) {
  const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/king-transformed.glb`;

  // const {
  //   isPresenting
  // } = useXR();

  // const [localScale, setLocalScale] = useState(scale);
  // const [localPosition, setLocalPosition] = useState(position);

  // const [firedOnce, setFiredOnce] = useState(false); // stop the item 'sticking'?

  // useEffect(() => {
  //   console.log(`Is Presenting is: ${isPresenting}`);
  //   if (isPresenting && !firedOnce) {
  //     setLocalScale(scale*xrScaleOffset);
  //     setLocalPosition(xrPositionOffset);
  //     setFiredOnce(true)
  //     // @ts-ignore
  //     // boxAPI.position.set(xrPositionOffset[0],xrPositionOffset[1],xrPositionOffset[2])
  //   } else if (!firedOnce){
  //     setLocalScale(scale)
  //     setLocalPosition(position)
  //     setFiredOnce(true)
  //   }
  // }, [isPresenting]);


  const group = useRef<THREE.Group>(null!);
  const [boxRef] = useBox<any>(() => ({ position, mass: 1, args }));

  // @ts-ignore
  const {
    nodes,
    materials,
    animations
  } = useGLTF(ITEM_URI, 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/') as GLTFResult

  // @ts-ignore
  const {actions} = useAnimations<GLTFActions>(animations, group);

  // @ts-ignore
  const [mixer] = useState(() => new THREE.AnimationMixer());

  useEffect(() => {
    // mixer.clipAction(animations[0], group.current).setDuration(1);
    mixer.clipAction(animations[0], group.current).play();
  }, [animations])

  useFrame((scene, delta) => {
    mixer?.update(delta)
  });

  return (
    // <DreiBox   castShadow>
      <group ref={boxRef} args={args as any} dispose={null} >
        <group ref={group} name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips}/>
          <skinnedMesh name="Body" geometry={nodes.Body.geometry} material={materials.Knight_MAT2}
                       skeleton={nodes.Body.skeleton}/>
          <skinnedMesh name="Head_Hands" geometry={nodes.Head_Hands.geometry} material={materials.Knight_MAT2}
                       skeleton={nodes.Head_Hands.skeleton}/>
          <skinnedMesh name="Lower_Armor" geometry={nodes.Lower_Armor.geometry} material={materials.Knight_MAT2}
                       skeleton={nodes.Lower_Armor.skeleton}/>
        </group>
      </group>
    // </DreiBox>
  )
}

// useGLTF.preload('/king-transformed.glb')
