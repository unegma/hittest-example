import React, {useEffect, useState, Suspense, Fragment } from 'react';
import './App.scss';
import * as THREE from 'three'
import { useThree, useFrame, Canvas } from '@react-three/fiber'
import {Interactive, useHitTest, ARButton, XR, XRButton, Controllers, Hands, useXREvent} from '@react-three/xr'
import {Box, Environment, Html, Text} from "@react-three/drei";
import { Box as DreiBox, OrbitControls, Plane, Sphere, Sky, useMatcapTexture } from '@react-three/drei'
import { usePlane, useBox, Physics, useSphere } from '@react-three/cannon'
//App minima que permite la colocacion y el arrastre de elementos mediante ReactXR

const texture = new THREE.TextureLoader().load( "src/assets/img/mona_lisa.png" );

const PictureBoxExample= () => {

  const ref = React.useRef()

  useHitTest((hit) => {
    // @ts-ignore
    hit.decompose(ref.current.position, ref.current.rotation, ref.current.scale)
  })

  return <Box ref={ref} args={[0.2, 0.001, 0.35]} >
    <meshBasicMaterial map={texture} />
    <Box args={[0.2, 0.001, 0.35]} position={[-0.35,0,0]} /* rotation= {ref.current.rotation} */>
      <meshBasicMaterial color={'green'} />
    </Box>
  </Box>
}

function HitTestExample() {
  const [active, setActive] = React.useState(false)

  useXREvent('select', () => {
    setActive(!active)
  })

  if (!active) {
    return <></>
  } else {
    return <PictureBoxExample />
  }
}

// function Scene() {
//
//
//   return (
//     <>
//       {/*<Html className="instructions-html">Click AR Button Below (on Android) to enter AR.<br/><br/>Step back to see Objects AR mode.<br/><br/>Click Objects to Interact</Html>*/}
//
//       <OrbitControls />
//       <ambientLight intensity={0.5} />
//       <spotLight position={[1, 8, 1]} angle={0.3} penumbra={1} intensity={1} castShadow />
//
//
//     </>
//   )
// }
// // end example 2


function App() {

  return (
    <div className="App">

      <ARButton
        className='xr-button'
        // sessionInit={{ optionalFeatures: ['local-floor'] }}
        // enterOnly={false}
        // exitOnly={false}
      />

      {/*<Canvas shadowMap>*/}
      <Canvas>
        <XR>
          <ambientLight />
          <Controllers />
          <HitTestExample />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;
