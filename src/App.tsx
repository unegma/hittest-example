import React, {useEffect, useState, Suspense } from 'react';
import './App.scss';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {Interactive, useHitTest, ARButton, XR, XRButton, Controllers} from '@react-three/xr'
import {Environment, Text} from "@react-three/drei";


function Box({ color, size, scale, children, ...rest }: any) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  )
}

function Button(props: any) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState<any>('blue')

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  return (
    <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect}>
      <Box color={color} scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]} size={[0.4, 0.1, 0.1]} {...props}>
        <Suspense fallback={null}>
          <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
            Hello react-xr!
          </Text>
        </Suspense>
      </Box>
    </Interactive>
  )
}


function App() {

  // function HitTest() {
  //   const mesh = React.useRef(null)
  //
  //   useHitTest((hitMatrix: THREE.Matrix4, hit: XRHitTestResult) => {
  //     // @ts-ignore
  //     hitMatrix.decompose(mesh.current.position, mesh.current.quaternion, mesh.current.scale)
  //     // hitMatrix.decompose(mesh.position, mesh.quaternion, mesh.scale)
  //   })
  //
  //
  //   return (
  //     <mesh ref={mesh}>
  //       <boxGeometry />
  //       <meshBasicMaterial color="blue" />
  //     </mesh>
  //   )
  // }


  return (
    <div className="App">

      <ARButton
        className='xr-button'
        // sessionInit={{ optionalFeatures: ['local-floor'] }}
        // enterOnly={false}
        // exitOnly={false}
      />

      <Canvas linear>
        <XR
          // referenceSpace="local-floor"
          referenceSpace="local"
        >
          <Environment preset='sunset'/>
          <ambientLight intensity={0.5}/>

          {/*<HitTest />*/}
          <Button position={[0, 0.1, -0.2]} />
          <Controllers />
        </XR>
      </Canvas>

    </div>
  );
}

export default App;
