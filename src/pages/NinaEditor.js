import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, Float, Loader } from '@react-three/drei';
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Nina from '../components/Nina.js';
import CharacterForm from '../components/CharacterForm.js';
import Lights from '../components/Lights.js';
import {useDispatch,useSelector} from 'react-redux'
import {boolTrue,boolFalse} from '../redux/features/booleano'
import { Physics } from '@react-three/cannon';

const EditorScene = () => {
  let dispatch = useDispatch()
  let boolState = useSelector((state) => {
    return state["bool"]
  })

  let{boolean} = boolState
  

  let clickTrue = () => {
    dispatch(boolTrue())
  }

  let clickFalse = () => {
    dispatch(boolFalse())
  }
  const [skin, setSkin] = useState('#ffffff');
  const [hair, setHair] = useState('#ffffff');
  const [top, setTop] = useState('#ffffff');
  const [bottom, setBottom] = useState('#ffffff');
  const [footwear, setFootwear] = useState('#ffffff');

  const handleReset = (e) => {
    e.preventDefault();

    setSkin('#ffffff');
    setHair('#ffffff');
    setTop('#ffffff');
    setBottom('#ffffff');
    setFootwear('#ffffff');
  };

  const handleColors = (e) => {
    e.preventDefault();
    console.log('OK');
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-10">
            <Canvas shadows camera={{ position: [0, 1.5, 3], fov: 60 }}>
              <Lights />

              <Suspense fallback={null}>
                <Float speed={1.2} floatIntensity={1.3} rotationIntensity={0}>

                  <Physics>
                  <Nina position ={[0,-1.3,0]} type ="Static" skin={skin} hair={hair} top={top} bottom={bottom} footwear={footwear} />
                  </Physics>

                </Float>
              </Suspense>

              <Sky sunPosition={[100, 20, 100]} />
              <Environment files="/assets/royal_esplanade_1k.hdr" />
              <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} enablePan={false} enableZoom={false} />
            </Canvas>
            <Loader />
          </div>
          <div className="col-2">
            <CharacterForm
              skin={skin}
              hair={hair}
              top={top}
              bottom={bottom}
              footwear={footwear}
              handleSkin={setSkin}
              handleTop={setTop}
              handleBottom={setBottom}
              handleFootwear={setFootwear}
              handleHair={setHair}
              handleReset={handleReset}
              handleColors={handleColors}
            />
             <div className="mb-3 text-center">
          <button onClick={clickTrue} className="btn btn-primary btn-margin">
            Acept
          </button >
         
        </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default EditorScene;
