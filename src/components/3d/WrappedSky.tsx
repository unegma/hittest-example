import * as THREE from 'three'
import React, {useEffect, useRef, useState} from 'react'
import {useXR} from "@react-three/xr";
import {PerspectiveCamera, Sky} from "@react-three/drei";

export default function WrappedSky() {

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

  const [showSky, setShowSky] = useState(true);

  useEffect(() => {
    console.log(`Is Presenting is: ${isPresenting}`);
    if (isPresenting) {
      setShowSky(false);
    } else {
      setShowSky(true)
    }
  }, [isPresenting])

  return (
    <>
      { showSky && (
        <Sky
          distance={450000}
          sunPosition={[5, 1, 8]}
          inclination={0}
          azimuth={0.25}
        />
      )}
    </>
  )
}
