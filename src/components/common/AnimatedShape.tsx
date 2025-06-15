'use client';

import * as React from 'react';
// Imports for R3F, Drei, THREE will be used by AnimatedShapeRenderer
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';
import * as THREE from 'three';

interface HexagonInstanceProps {
  position: [number, number, number];
  rotation: [number, number, number];
  shape: THREE.Shape;
  extrudeSettings: THREE.ExtrudeGeometryOptions;
}

const HexagonInstance: React.FC<HexagonInstanceProps> = ({ position, rotation, shape, extrudeSettings }) => {
  const extrudeGeomRef = React.useRef<THREE.ExtrudeGeometry>(null!);

  React.useLayoutEffect(() => {
    if (extrudeGeomRef.current) {
      extrudeGeomRef.current.center();
    }
  }, [shape, extrudeSettings]);
  
  return (
    // @ts-ignore
    <group position={position} rotation={rotation}>
      {/* @ts-ignore */}
      <mesh>
        {/* @ts-ignore */}
        <extrudeGeometry ref={extrudeGeomRef} args={[shape, extrudeSettings]} />
        {/* @ts-ignore */}
        <meshStandardMaterial visible={false} /> 
        {/* @ts-ignore */}
        <Edges>
          {/* @ts-ignore */}
          <lineBasicMaterial color="#000000" />
        </Edges>
      </mesh>
    </group>
  );
};

// This component contains the actual R3F scene
const AnimatedShapeRenderer: React.FC = () => {
  const [hexConfigs, setHexConfigs] = React.useState<Array<{position: [number, number, number], rotation: [number, number, number]}>>([]);

  const hexagonShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    const R = 0.8; 
    shape.moveTo(R * Math.cos(0), R * Math.sin(0));
    for (let i = 1; i <= 6; i++) {
      shape.lineTo(R * Math.cos(i * Math.PI / 3), R * Math.sin(i * Math.PI / 3));
    }
    return shape;
  }, []);

  const extrudeSettings = React.useMemo(() => ({
    depth: 0.12, 
    bevelEnabled: false,
  }), []);

  React.useEffect(() => {
    const R_HEX = 0.8;
    const X_UNIT = R_HEX * 1.5; 
    const Y_UNIT = R_HEX * Math.sqrt(3) * 0.5; 

    const basePositions: Array<[number, number]> = [
      [0, 3 * Y_UNIT],
      [-X_UNIT, 2 * Y_UNIT], [X_UNIT, 2 * Y_UNIT],
      [-X_UNIT * 1.33, Y_UNIT], [0, Y_UNIT], [X_UNIT * 1.33, Y_UNIT],
      [-X_UNIT, 0], [X_UNIT, 0],
      [-X_UNIT * 1.33, -Y_UNIT], [0, -Y_UNIT], [X_UNIT * 1.33, -Y_UNIT],
      [0, -3 * Y_UNIT],
    ];
    
    const configs = basePositions.map((pos) => {
      const z = (Math.random() - 0.5) * R_HEX * 0.8; 
      const rotZ = (Math.random() - 0.5) * Math.PI / 12; 

      return {
        position: [pos[0], pos[1], z] as [number, number, number],
        rotation: [0, 0, rotZ] as [number, number, number],
      };
    });

    setHexConfigs(configs);
  }, [hexagonShape, extrudeSettings]); 

  if (hexConfigs.length === 0) {
    return <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">Generating 3D model...</div>;
  }

  return (
    <div className="w-full h-[300px] md:h-[400px] cursor-grab active:cursor-grabbing">
      {/* @ts-ignore */}
      <Canvas camera={{ position: [0, 0.5, 7], fov: 60 }}>
        {/* @ts-ignore */}
        <ambientLight intensity={1.5} />
        {/* @ts-ignore */}
        <directionalLight position={[5, 8, 7]} intensity={2.0} castShadow />
        <React.Suspense fallback={null}>
          {hexConfigs.map((config, index) => (
            <HexagonInstance
              key={index}
              position={config.position}
              rotation={config.rotation}
              shape={hexagonShape}
              extrudeSettings={extrudeSettings}
            />
          ))}
        </React.Suspense>
        {/* @ts-ignore */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3}/>
      </Canvas>
    </div>
  );
};


const AnimatedShape: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // This will likely be preempted by the loading state in HeroSection's dynamic import,
    // but serves as an additional safeguard.
    return <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">Preparing 3D animation...</div>;
  }

  return <AnimatedShapeRenderer />;
};

export default AnimatedShape;
