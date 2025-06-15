
'use client';

import * as React from 'react';
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

interface AnimatedShapeProps {
  // Props if any
}

const AnimatedShape: React.FC<AnimatedShapeProps> = () => {
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
    const X_UNIT = R_HEX * 1.5; // Horizontal distance between centers of adjacent staggered hexagons
    const Y_UNIT = R_HEX * Math.sqrt(3) * 0.5; // Vertical distance for half a hexagon height

    // Predefined positions for 12 hexagons to approximate the image
    // These are relative [x, y] coordinates; z will be randomized slightly
    const basePositions: Array<[number, number]> = [
      // Topmost hexagon
      [0, 3 * Y_UNIT],
      // Second row from top (2 hexagons)
      [-X_UNIT, 2 * Y_UNIT],
      [X_UNIT, 2 * Y_UNIT],
      // Third row from top (3 hexagons, forming the widest part)
      [-X_UNIT * 1.33, Y_UNIT], // Using 1.33 as a factor for a bit more spread than direct X_UNIT
      [0, Y_UNIT],
      [X_UNIT * 1.33, Y_UNIT],
      // Fourth row (2 hexagons, below the widest part, slightly inset)
      [-X_UNIT, 0],
      [X_UNIT, 0],
      // Fifth row (3 hexagons)
      [-X_UNIT * 1.33, -Y_UNIT],
      [0, -Y_UNIT],
      [X_UNIT * 1.33, -Y_UNIT],
      // Bottommost hexagon
      [0, -3 * Y_UNIT],
    ];
    
    const configs = basePositions.map((pos) => {
      const z = (Math.random() - 0.5) * R_HEX * 0.8; // Slightly randomized depth for "slice" feel
      const rotZ = (Math.random() - 0.5) * Math.PI / 12; // Slight random tilt

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
      <Canvas camera={{ position: [0, 0.5, 7], fov: 60 }}> {/* Adjusted camera Z for better view */}
        {/* @ts-ignore */}
        <ambientLight intensity={1.5} /> {/* Increased ambient light slightly */}
        {/* @ts-ignore */}
        <directionalLight position={[5, 8, 7]} intensity={2.0} castShadow /> {/* Increased directional light */}
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

export default AnimatedShape;
