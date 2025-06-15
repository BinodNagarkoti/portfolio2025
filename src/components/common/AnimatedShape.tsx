
'use client';

import * as React from 'react';
// Note: R3F/Drei imports are fine here because this entire component will be client-side only
// due to dynamic import in its parent.
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
          <lineBasicMaterial color="hsl(var(--foreground))" />
        </Edges>
      </mesh>
    </group>
  );
};

interface AnimatedShapeProps {
  // Props if any, projectLogos is no longer used
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
    depth: 0.12, // Make hexagons slightly thinner for a "slice" feel
    bevelEnabled: false,
  }), []);

  React.useEffect(() => {
    // This effect runs only on the client after mount.
    const configs = [];
    const N = 12; // Number of hexagons
    const R_hex = 0.8; 
    const SPREAD_FACTOR = 2.8;

    for (let i = 0; i < N; i++) {
      const angle = (i / (N * 0.75)) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const radius = R_hex * 0.5 + Math.random() * R_hex * SPREAD_FACTOR * 0.6; 
      
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * R_hex * 0.3;
      const y = Math.sin(angle) * radius + (Math.random() - 0.5) * R_hex * 0.3;
      const z = (Math.random() - 0.5) * R_hex * 0.4; 
      const rotZ = (Math.random() - 0.5) * Math.PI / 10;
      
      configs.push({
        position: [x, y, z] as [number, number, number],
        rotation: [0, 0, rotZ] as [number, number, number],
      });
    }
    setHexConfigs(configs);
  }, [hexagonShape, extrudeSettings]); // Dependencies that don't change per render

  if (hexConfigs.length === 0) {
    // This can be a placeholder if the dynamic import in parent already shows one
    return <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">Generating 3D model...</div>;
  }

  return (
    <div className="w-full h-[300px] md:h-[400px] cursor-grab active:cursor-grabbing">
      {/* @ts-ignore */}
      <Canvas camera={{ position: [0, 0.5, 5.5], fov: 60 }}>
        {/* @ts-ignore */}
        <ambientLight intensity={1.2} />
        {/* @ts-ignore */}
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
        {/* @ts-ignore */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3}/>
      </Canvas>
    </div>
  );
};

export default AnimatedShape;
