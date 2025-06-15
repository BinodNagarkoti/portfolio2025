'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the actual R3F renderer component
// This ensures that AnimatedShapeRenderer.tsx and its R3F dependencies are only loaded on the client side.
const AnimatedShapeRenderer = dynamic(
  () => import('./AnimatedShapeRenderer'), // Path to the new file containing the R3F logic
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">
        Preparing 3D model...
      </div>
    ),
  }
);

const AnimatedShape: React.FC = () => {
  // This component now acts as a clean, lightweight wrapper that dynamically loads the actual 3D component.
  // It doesn't have any direct top-level imports from @react-three/fiber or @react-three/drei.
  return <AnimatedShapeRenderer />;
};

export default AnimatedShape;
