
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
    <group position={position} rotation={rotation}>
      <mesh>
        <extrudeGeometry ref={extrudeGeomRef} args={[shape, extrudeSettings]} />
        <meshStandardMaterial visible={false} /> 
        <Edges>
          <lineBasicMaterial color="black" />
        </Edges>
      </mesh>
    </group>
  );
};

interface AnimatedShapeProps {
  // projectLogos prop is no longer used
}

const AnimatedShape: React.FC<AnimatedShapeProps> = () => {
  const [hexConfigs, setHexConfigs] = React.useState<Array<{position: [number, number, number], rotation: [number, number, number]}>>([]);

  const hexagonShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    const R = 0.8; // Radius of hexagon
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
    const configs = [];
    const N = 12; // Number of hexagons
    const R_hex = 0.8; // Corresponds to hexagonShape radius
    const SPREAD_FACTOR = 2.8; // How much they spread out

    for (let i = 0; i < N; i++) {
      // Attempt a slightly more organic, less grid-like placement for a "slice"
      const angle = (i / (N * 0.75)) * Math.PI * 2 + (Math.random() - 0.5) * 0.5; // Add some randomness to angle
      const radius = R_hex * 0.5 + Math.random() * R_hex * SPREAD_FACTOR * 0.6; // Random distance from center, but not too far for a slice
      
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * R_hex * 0.3;
      const y = Math.sin(angle) * radius + (Math.random() - 0.5) * R_hex * 0.3;
      const z = (Math.random() - 0.5) * R_hex * 0.4; // Very thin slice overall depth
      const rotZ = (Math.random() - 0.5) * Math.PI / 10; // Slight random tilt for "imperfect" look
      
      configs.push({
        position: [x, y, z] as [number, number, number],
        rotation: [0, 0, rotZ] as [number, number, number],
      });
    }
    setHexConfigs(configs);
  }, []);

  if (hexConfigs.length === 0) {
    return <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">Loading 3D model...</div>;
  }

  return (
    <div className="w-full h-[300px] md:h-[400px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0.5, 5.5], fov: 60 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 7]} intensity={1.8} castShadow />
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
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3}/>
      </Canvas>
    </div>
  );
};

export default AnimatedShape;
