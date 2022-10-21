// import {DefaultXRControllers, VRCanvas, useXR} from "@react-three/xr";
import {Canvas} from "@react-three/fiber";
import {Environment, Html, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import React, {Suspense, useState} from "react";
import {Controllers, Hands, RayGrab, useXR, XR, XRButton} from "@react-three/xr";
const initialHelperText = '⚲ or ↺ Model';

export default function RelicOne({relic, cameraPosition, minDistance, maxDistance, rotationLock, minPolarAngle = 1.5, maxPolarAngle = 1.5, debug}: any) {
  const [helperText, setHelperText] = useState(initialHelperText);

  const showHelperTextMessage = () => {
    let helperTextAlertMessage = 'Model can be rotated or zoomed: \n' +
      'Controls vary depending on your device.\n' +
      'Zoom is usually pinch or scroll with 2 fingers.'

    alert(helperTextAlertMessage);
  };
  return (
    <>
      <div className={`buttons-container buttons-container--left-helper`}>
        <p className='helperText' onClick={() => {showHelperTextMessage()}}>{helperText}</p>
      </div>

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

      <Canvas linear >

        <XR
          referenceSpace="local-floor"
        >
          <Controllers />
          <Hands />

          {/*lock zoom to keep dolls house view. Can use minPolarAngle={Math.PI/2.1} maxPolarAngle={Math.PI/2.1} to lock rotation */}
          {/*<OrbitControls enableZoom={true} enablePan={false} minZoom={Math.PI/2} maxZoom={Math.PI/3} />*/}

          { !rotationLock && (
            <OrbitControls enableZoom={true} enablePan={false} minDistance={minDistance} maxDistance={maxDistance} />
          )}

          { rotationLock && (
            <OrbitControls enableZoom={true} enablePan={false} minDistance={minDistance} maxDistance={maxDistance} minPolarAngle={minPolarAngle} maxPolarAngle={maxPolarAngle} />
          )}

          {/*<WrappedSky />*/}

          <Environment preset='sunset'/>

          <ambientLight intensity={0.5}/>
          <pointLight intensity={0.5} position={[10, 0, 0]}/>
          <pointLight intensity={0.2} position={[-10, 0, 10]}/>
          {/*<pointLight intensity={1} position={[-10, 0, 0]}/>*/}
          {/*<pointLight intensity={1} position={[10, 0, 10]}/>*/}

          <PerspectiveCamera position={cameraPosition} makeDefault/>

          <Suspense fallback={<Html>loading 3d view..</Html>}>
            <RayGrab>
              {relic}
            </RayGrab>
          </Suspense>


        </XR>
        <Html className='debugInfo'>
          {JSON.stringify(debug)}
        </Html>
      </Canvas>
      </>
  )
}
