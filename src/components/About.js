import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { Physics } from '@react-three/cannon';


import {useDispatch,useSelector} from 'react-redux'
import Adam from './Adam';
import Nina from './Nina';
import Floor from './floor';

function About(props) {
    let boolState = useSelector((state) => {
        return state["bool"]
      })
    
      let{boolean} = boolState
    
     
      if ( boolean == false){
    
  return (
   
    <Canvas shadows dpr={[1, 2]} camera={{ position: [12, 9, 11], fov: 30 }}>
      <ambientLight intensity={1} />
      <spotLight penumbra={0.5} position={[10, 10, 5]} castShadow />

      <axesHelper args={[100, 100, 100]} />
     
      <Physics gravity={[0, -1.8, 0]}>
      <Adam position={[0, 5, 0]} args={[0.1]}></Adam>
      <Floor rotation={[Math.PI / -2, 0, 0]} color="grey" ></Floor>
      </Physics>

     
 
      <Stats />
      <OrbitControls />
    </Canvas>
  );
}

return (
   
  <Canvas shadows dpr={[1, 2]} camera={{ position: [-12, 9, -11], fov: 30 }}>
    <ambientLight intensity={1} />
    <spotLight penumbra={0.5} position={[10, 10, 5]} castShadow />

    <axesHelper args={[100, 100, 100]} />
   
    <Physics gravity={[0, -1.8, 0]}>

    <Nina position={[0, 5, 0]} args={[0.1]}></Nina>
    <Floor rotation={[Math.PI / -2, 0, 0]} color="grey" ></Floor>
    </Physics>
 
   
    <Stats />
    <OrbitControls />
  </Canvas>
);

}



export default About;
