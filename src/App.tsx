import React, {useEffect, useState} from 'react';
import './App.scss';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { useHitTest, ARButton, XR } from '@react-three/xr'

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
          <XR>
            <HitTest />
          </XR>
        </Canvas>
      </>

    </div>
  );
}

export default App;
