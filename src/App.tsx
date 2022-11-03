import React, {useEffect, useState} from 'react';
import './App.scss';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { useHitTest, ARButton, XR } from '@react-three/xr'
import {Environment} from "@react-three/drei";

function App() {

  function HitTest() {
    const mesh = React.useRef(null)

    useHitTest((hitMatrix: THREE.Matrix4, hit: XRHitTestResult) => {
      // @ts-ignore
      hitMatrix.decompose(mesh.current.position, mesh.current.quaternion, mesh.current.scale)
    })

    return (
      <mesh ref={mesh}>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
    )
  }

  return (
    <div className="App">

      <>
        <ARButton />
        <Canvas>
          <XR
            referenceSpace="local-floor"
          >
            <Environment preset='sunset'/>
            <ambientLight intensity={0.5}/>

            <HitTest />
          </XR>
        </Canvas>
      </>

    </div>
  );
}

export default App;
