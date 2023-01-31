import React, { useRef } from "react";
// eslint-disable-next-line
import { XR, Controllers, Hands, ARButton, useHitTest,  } from "@react-three/xr";
// eslint-disable-next-line
import { Box, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line
import { Matrix4, Mesh } from "three";


const HitTestExample = () => {
  const ref = useRef(null!);

  let hitpoint = useRef()

  useHitTest((hitMatrix: Matrix4, hit: XRHitTestResult) => {
    // @ts-ignore
    hitMatrix.decompose(ref.current.position, ref.current.quaternion, ref.current.scale);
  });

  return (
    <Box ref={hitpoint} args={[0.1, 0.1, 0.1]}/>
  );
};

export default function App () {
  return (
    <>
      <ARButton sessionInit={{ requiredFeatures: ["hit-test"] }}/>
      <Canvas>
        <XR>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <HitTestExample />
          <Controllers />
        </XR>
      </Canvas>
    </>
  );
};
