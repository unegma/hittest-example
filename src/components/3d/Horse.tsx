/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import {useGLTF, useAnimations, useHelper} from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import {useFrame} from "@react-three/fiber";
import {useXR} from "@react-three/xr";
import {useBox} from "@react-three/cannon";
import {BoxHelper} from "three";

type GLTFResult = GLTF & {
  nodes: {
    Object_7: THREE.SkinnedMesh
    Object_9: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    MI_Horse_Hair: THREE.MeshStandardMaterial
    M_Horse_Inst: THREE.MeshStandardMaterial
  }
}

type ActionName = 'CINEMA_4D_Main'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Horse({ scale = 0.01, position = [-150,0,-150], args = [0, 0, 0], xrScaleOffset = 0.1, xrPositionOffset = [-150,0,-150], setDebug }: any) {
  const ITEM_URI = `${process.env.REACT_APP_ASSETS_URL}/horse-transformed.glb`;

  const {
    isPresenting
  } = useXR();

  const [localScale, setLocalScale] = useState(scale);
  const [localPosition, setLocalPosition] = useState(position);

  // const [firedOnce, setFiredOnce] = useState(false); // stop the item 'sticking'?

  useEffect(() => {
    console.log(`Is Presenting is: ${isPresenting}`);
    if (!isPresenting) {
      setLocalScale(scale)

      setLocalPosition(position)
    } else {
      setLocalScale(scale*xrScaleOffset);

      setLocalPosition(xrPositionOffset);
      boxRef.current.position.set(xrPositionOffset)
    }
  }, [isPresenting]);


  const group = useRef<THREE.Group>(null!)
  const [boxRef] = useBox<any>(() => ({ localPosition, mass: 1, args })); // todo what is args?

  const { nodes, materials, animations } = useGLTF(ITEM_URI, 'https://www.gstatic.com/draco/versioned/decoders/1.4.1/') as GLTFResult
  // @ts-ignore
  const { actions } = useAnimations<GLTFActions>(animations, group)

  const [playing, setPlaying] = useState(false);

  const playAudio = () => {
    console.log('here')
    setPlaying(true);
    let audio = new Audio(`${process.env.REACT_APP_ASSETS_URL}/horse-neigh.mp3`);
    if (!playing) {
      audio.play();
    }
    setTimeout(() => {
      setPlaying(false);
    }, 1000)
  }

  // @ts-ignore
  const [mixer] = useState(() => new THREE.AnimationMixer());

  useEffect(() => {
    // mixer.clipAction(animations[0], group.current).setDuration(1);
    mixer.clipAction(animations[0], group.current).play();
  }, [animations])

  useFrame((scene, delta) => {
    mixer?.update(delta)
  });

  // useHelper(boxRef, BoxHelper, "cyan")

  return (
    <group ref={boxRef} args={args as any} dispose={null} scale={localScale} onClick={() => playAudio()}>
      {/*<mesh position={[0,80,50]} onClick={() => playAudio()} >*/}
      <mesh position={[-150,100,-100]} onClick={() => playAudio()} >
        <boxGeometry args={[100, 250, 250]} />
        <meshPhongMaterial color="#ff0000" opacity={0.01} transparent />
        {/*<meshPhongMaterial color="#ff0000"  />*/}
      </mesh>
      <group ref={group} name="Object_4" position={localPosition}>
        <primitive object={nodes._rootJoint} />
        <group name="0000_Horse" />
        <group name="0001_Horse" />
        <group name="Object_6" />
        <group name="Object_8" />
        <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.MI_Horse_Hair} skeleton={nodes.Object_7.skeleton} />
        <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.M_Horse_Inst} skeleton={nodes.Object_9.skeleton} />
      </group>
    </group>
  )
}
