
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Using next/image for optimization

interface AnimatedShapeProps {
  projectLogos: string[];
}

const AnimatedShape: React.FC<AnimatedShapeProps> = ({ projectLogos }) => {
  const honeycombRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -15, y: 25 }); // Initial rotation
  const [isDragging, setIsDragging] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });
  const rotationSpeed = 0.3; // Degrees per pixel moved
  const [renderedCluster, setRenderedCluster] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    if (honeycombRef.current) {
      honeycombRef.current.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
    }
  }, [rotation]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - prevMousePos.x;
      const deltaY = event.clientY - prevMousePos.y;

      setRotation((prevRotation) => ({
        x: prevRotation.x - deltaY * rotationSpeed,
        y: prevRotation.y + deltaX * rotationSpeed,
      }));
      setPrevMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, prevMousePos, rotationSpeed]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setPrevMousePos({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (!isDragging) {
        setRotation((prev) => ({
          x: prev.x - 0.01, // Slower continuous rotation
          y: prev.y + 0.03, // Slower continuous rotation
        }));
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  useEffect(() => {
    const generateHoneycombCluster = () => {
      const hexagons: JSX.Element[] = [];
      const numLogos = projectLogos.length;
      if (numLogos === 0) return hexagons;

      const sideLength = 60; // Side length of the hexagon
      const hexDivWidth = Math.sqrt(3) * sideLength; // Flat-to-flat width
      const hexDivHeight = 2 * sideLength; // Point-to-point height

      // Center hexagon
      if (numLogos > 0) {
        const zOffset = (Math.random() - 0.5) * sideLength * 0.3;
        const randomRotateZ = (Math.random() - 0.5) * 5; // Small random tilt
        hexagons.push(
          <div
            key="center-hex"
            className="hexagon-face absolute flex justify-center items-center bg-card/70 border border-border shadow-md"
            style={{
              width: `${hexDivWidth}px`,
              height: `${hexDivHeight}px`,
              transform: `translate3d(0px, 0px, ${zOffset}px) rotateX(90deg) rotateZ(${randomRotateZ}deg)`,
              clipPath: `polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
            }}
          >
            <Image
              src={projectLogos[0]}
              alt="project logo center"
              width={Math.floor(hexDivWidth * 0.7)}
              height={Math.floor(hexDivHeight * 0.7)}
              className="object-contain p-2"
              unoptimized 
            />
          </div>
        );
      }

      // Surrounding hexagons
      const numSurrounding = Math.min(numLogos - 1, 6); 
      const ringRadius = hexDivHeight * 0.866; 

      for (let i = 0; i < numSurrounding; i++) {
        const angle = (i / numSurrounding) * 2 * Math.PI + (Math.PI / 6); 
        const x = ringRadius * Math.cos(angle);
        const y = ringRadius * Math.sin(angle);
        const z = (Math.random() - 0.5) * sideLength * 0.5; 
        const randomRotateZ = (Math.random() - 0.5) * 10;

        hexagons.push(
          <div
            key={`surrounding-hex-${i}`}
            className="hexagon-face absolute flex justify-center items-center bg-card/70 border border-border shadow-md"
            style={{
              width: `${hexDivWidth}px`,
              height: `${hexDivHeight}px`,
              transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(90deg) rotateZ(${randomRotateZ}deg)`,
              clipPath: `polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
            }}
          >
            {projectLogos[i + 1] && (
              <Image
                src={projectLogos[i + 1]}
                alt={`project logo ${i + 1}`}
                width={Math.floor(hexDivWidth * 0.7)}
                height={Math.floor(hexDivHeight * 0.7)}
                className="object-contain p-2"
                unoptimized
              />
            )}
          </div>
        );
      }
      return hexagons;
    };
    setRenderedCluster(generateHoneycombCluster());
  }, [projectLogos]);


  return (
    <div
      className="w-full h-[300px] md:h-[400px] flex justify-center items-center cursor-grab active:cursor-grabbing"
      style={{ perspective: '1200px' }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="transform-style-preserve-3d relative"
        ref={honeycombRef}
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        {renderedCluster ? renderedCluster : <div>Loading animation...</div>}
      </div>
    </div>
  );
};

export default AnimatedShape;

    
