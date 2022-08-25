import { useGLTF } from '@react-three/drei';
import { ContactShadows } from '@react-three/drei';
import { useBoxS, useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';
import { usePlayerControls } from '../utils/useControls';
import * as THREE from 'three';
import { useControls } from 'leva';
import React, { useRef } from "react";

const Nina = ({ skin, hair, footwear, top, bottom, pos = [0, -1.3, 0], ...props }) => {
  const { nodes, materials } = useGLTF('/assets/models/Nina.gltf');
  const direction = new THREE.Vector3();
  const frontVector = new THREE.Vector3();
  const sideVector = new THREE.Vector3();
  const speed = new THREE.Vector3();
  const SPEED = 5;

  const { position, scale, rotation } = useControls('Nina', {
    position: { value: pos, min: -100, max: 100, step: 0.1 },
    scale: 1.5,
    rotation: { value: [0, 0, 0], min: -100, max: 100, step: 0.01 },
  });

////
  const [ref,api] = useSphere((index) => ({mass: 1,
    onCollide: (e) => {
      console.log(e);
      // Be carefull, the ids will change if you add a new geometry
    
    }, 
    
    
    ...props }));
    const { forward, backward, left, right, jump } = usePlayerControls();
    const velocity = useRef([0, 0, 0]);
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), []);
  
    useFrame((state) => {
      frontVector.set(0, 0, Number(backward) - Number(forward));
      sideVector.set(Number(left) - Number(right), 0, 0);
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED);
      speed.fromArray(velocity.current);
  
      api.velocity.set(direction.x, velocity.current[1], direction.z);
      if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 1, velocity.current[2]);
    });
/////

  return (
    <>
      <group ref={ref}{...props} dispose={null} position={position} scale={scale} rotation={rotation}>
        <mesh castShadow receiveShadow geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} />
        <mesh castShadow receiveShadow geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          material-color={skin}
        />
        <mesh castShadow receiveShadow geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          material-color={hair}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          material-color={footwear}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          material-color={top}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          material-color={bottom}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          material-color={skin}
        />
      </group>
      <ContactShadows position={props.position} frames={1} />
    </>
  );
};

export default Nina;
