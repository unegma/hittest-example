// import {DefaultXRControllers, VRCanvas, useXR} from "@react-three/xr";
import {Canvas} from "@react-three/fiber";
import {Html, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import React, {Suspense, useState} from "react";
const initialHelperText = '⚲ or ↺ Model';

export default function RelicOne({relic, cameraPosition, minDistance, maxDistance, rotationLock, minPolarAngle = 1.5, maxPolarAngle = 1.5}: any) {
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

      <Canvas>
        {/*lock zoom to keep dolls house view. Can use minPolarAngle={Math.PI/2.1} maxPolarAngle={Math.PI/2.1} to lock rotation */}
        {/*<OrbitControls enableZoom={true} enablePan={false} minZoom={Math.PI/2} maxZoom={Math.PI/3} />*/}

        { !rotationLock && (
          <OrbitControls enableZoom={true} enablePan={false} minDistance={minDistance} maxDistance={maxDistance} />
        )}

        { rotationLock && (
          <OrbitControls enableZoom={true} enablePan={false} minDistance={minDistance} maxDistance={maxDistance} minPolarAngle={minPolarAngle} maxPolarAngle={maxPolarAngle} />
        )}

        <ambientLight/>
        {/*<pointLight intensity={1} position={[0, 0, 0]}/>*/}
        <PerspectiveCamera position={cameraPosition} makeDefault/>

        <Suspense fallback={<Html className="white">loading 3d view..</Html>}>
          {relic}
        </Suspense>
      </Canvas>
      </>
  )
}
