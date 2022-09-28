import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import {useXR} from "@react-three/xr";
import {PerspectiveCamera} from "@react-three/drei";

export default function WrappedCamera({ cameraPosition }: any) {

  const {
    // An array of connected `XRController`
    controllers,
    // Whether the XR device is presenting in an XR session
    isPresenting,
    // Whether hand tracking inputs are active
    isHandTracking,
    // A THREE.Group representing the XR viewer or player
    player,
    // The active `XRSession`
    session,
    // `XRSession` foveation. This can be configured as `foveation` on <XR>. Default is `0`
    foveation,
    // `XRSession` reference-space type. This can be configured as `referenceSpace` on <XR>. Default is `local-floor`
    referenceSpace
  } = useXR();

  const [cameraPositionLocal, setCameraPositionLocal] = useState(cameraPosition);

  useEffect(() => {
    console.log(`Is Presenting is: ${isPresenting}`);
    console.log(`Camera Position: ${cameraPosition}`);
    console.log(`_Camera Position: ${cameraPosition}`);
    if (isPresenting) {
      setCameraPositionLocal([cameraPosition[0]+20, cameraPosition[1]+20, cameraPosition[2]+20]);
    } else {
      setCameraPositionLocal(cameraPosition);
    }
  }, [isPresenting])

  return (
    <PerspectiveCamera position={cameraPositionLocal} makeDefault/>
  )
}
