import React, {useEffect, useState, Suspense, Fragment } from 'react';
import './App.scss';
import * as THREE from 'three'
import { useThree, useFrame, Canvas } from '@react-three/fiber'
import {Interactive, useHitTest, ARButton, XR, XRButton, Controllers, Hands} from '@react-three/xr'
import {Environment, Html, Text} from "@react-three/drei";
import { Box as DreiBox, OrbitControls, Plane, Sphere, Sky, useMatcapTexture } from '@react-three/drei'
import { usePlane, useBox, Physics, useSphere } from '@react-three/cannon'
import AnimatedPerson from "./components/3d/AnimatedPerson";
import King from "./components/3d/King";


// begin example
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
// end example 1

// begin example 2
const joints = [
  'wrist',
  'thumb-metacarpal',
  'thumb-phalanx-proximal',
  'thumb-phalanx-distal',
  'thumb-tip',
  'index-finger-metacarpal',
  'index-finger-phalanx-proximal',
  'index-finger-phalanx-intermediate',
  'index-finger-phalanx-distal',
  'index-finger-tip',
  'middle-finger-metacarpal',
  'middle-finger-phalanx-proximal',
  'middle-finger-phalanx-intermediate',
  'middle-finger-phalanx-distal',
  'middle-finger-tip',
  'ring-finger-metacarpal',
  'ring-finger-phalanx-proximal',
  'ring-finger-phalanx-intermediate',
  'ring-finger-phalanx-distal',
  'ring-finger-tip',
  'pinky-finger-metacarpal',
  'pinky-finger-phalanx-proximal',
  'pinky-finger-phalanx-intermediate',
  'pinky-finger-phalanx-distal',
  'pinky-finger-tip'
]

function Cube({ position, args = [0.06, 0.06, 0.06] }: any) {
  const [boxRef] = useBox(() => ({ position, mass: 1, args }))
  const [tex] = useMatcapTexture('C7C0AC_2E181B_543B30_6B6270')

  return (
    <DreiBox ref={boxRef} args={args as any} castShadow>
      <meshMatcapMaterial attach="material" matcap={tex as any} />
    </DreiBox>
  )
}

function JointCollider({ index, hand }: { index: number; hand: number }) {
  const { gl } = useThree()
  const handObj = (gl.xr as any).getHand(hand)
  const joint = handObj.joints[joints[index]] as any
  const size = joint.jointRadius ?? 0.0001
  const [tipRef, api] = useSphere(() => ({ args: size, position: [-1, 0, 0] }))
  useFrame(() => {
    if (joint === undefined) return
    api.position.set(joint.position.x, joint.position.y, joint.position.z)
  })

  return (
    <Sphere ref={tipRef} args={[size]}>
      <meshBasicMaterial transparent opacity={0} attach="material" />
    </Sphere>
  )
}

function HandsReady(props: any) {
  const [ready, setReady] = useState(false)
  const { gl } = useThree()
  useEffect(() => {
    if (ready) return
    const joint = (gl.xr as any).getHand(0).joints['index-finger-tip']
    if (joint?.jointRadius !== undefined) return
    const id = setInterval(() => {
      const joint = (gl.xr as any).getHand(0).joints['index-finger-tip']
      if (joint?.jointRadius !== undefined) {
        setReady(true)
      }
    }, 500)
    return () => clearInterval(id)
  }, [gl, ready])

  return ready ? props.children : null
}

const HandsColliders = (): any =>
  [...Array(25)].map((_, i) => (
    <Fragment key={i}>
      <JointCollider index={i} hand={0} />
      <JointCollider index={i} hand={1} />
    </Fragment>
  ))

function Scene() {
  const [floorRef] = usePlane(() => ({
    args: [10, 10],
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 1, 0],
    type: 'Static'
  }))


  return (
    <>
      {/*<Sky />*/}
      {/*<Plane ref={floorRef} args={[10, 10]} receiveShadow>*/}
      {/*  <meshStandardMaterial attach="material" color="#fff" />*/}
      {/*</Plane>*/}
      {/*{[...Array(7)].map((_, i) => (*/}
      {/*  <Cube key={i} position={[0, 1.1 + 0.1 * i, -0.5]} />*/}
      {/*))}*/}
      {/*<AnimatedPerson />*/}

      {/*<Cube key={1} position={[0, 1.1 + 0.1 * 1, -0.5]} />*/}

      <Html>Click King to Interact</Html>

      <King />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[1, 8, 1]} angle={0.3} penumbra={1} intensity={1} castShadow />
    </>
  )
}
// end example 2


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

      {/*// example 2*/}
      {/*<Canvas shadowMap>*/}
      <Canvas>
        <XR>
          {/*<Button position={[0, 0.1, -0.2]} />*/}

          <Physics
            // todo find a better way to manage this
            gravity={[0, -200, 0]}
            iterations={20}
            defaultContactMaterial={{
              friction: 0.09
            }}
          >
            <Scene />


            {/*<Hands />*/}
            {/*<HandsReady>*/}
            {/*  <HandsColliders />*/}
            {/*</HandsReady>*/}
            {/*    <Controllers />*/}
          </Physics>
        </XR>
      </Canvas>

      {/*// example 1 */}
      {/*<Canvas linear>*/}
      {/*  <XR*/}
      {/*    // referenceSpace="local-floor"*/}
      {/*    referenceSpace="local"*/}
      {/*  >*/}
      {/*    <Environment preset='sunset'/>*/}
      {/*    <ambientLight intensity={0.5}/>*/}

      {/*    /!*<HitTest />*!/*/}
      {/*    <Button position={[0, 0.1, -0.2]} />*/}
      {/*    <Controllers />*/}
      {/*  </XR>*/}
      {/*</Canvas>*/}

    </div>
  );
}

export default App;
