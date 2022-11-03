import React, {useEffect, useState} from 'react';
import './App.scss';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {useHitTest, ARButton, XR, XRButton} from '@react-three/xr'
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
        {/*<ARButton />*/}

        <XRButton
          className='xr-button'
          /* The type of `XRSession` to create */
          mode={'AR'}
          /**
           * `XRSession` configuration options
           * @see https://immersive-web.github.io/webxr/#feature-dependencies
           */
          // sessionInit={{ optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] }}
          sessionInit={{ optionalFeatures: ['local-floor'] }}
          /** Whether this button should only enter an `XRSession`. Default is `false` */
          enterOnly={false}
          /** Whether this button should only exit an `XRSession`. Default is `false` */
          exitOnly={false}
        >
          {/* Can accept regular DOM children and has an optional callback with the XR button status (unsupported, exited, entered) */}
          AR View
        </XRButton>

        <Canvas linear>
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
