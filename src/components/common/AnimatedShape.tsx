'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedShapeProps {
  projectLogos: string[];
}

const AnimatedShape: React.FC<AnimatedShapeProps> = ({ projectLogos }) => {
  const honeycombRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -20, y: 30 }); // Initial rotation
  const [isDragging, setIsDragging] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });
  const rotationSpeed = 0.5; // Degrees per pixel moved

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

  // Optional: Add a slow continuous rotation if not dragging
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (!isDragging) {
        setRotation((prev) => ({
          x: prev.x - 0.02,
          y: prev.y + 0.05,
        }));
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  // Honeycomb dimensions and geometry calculations
  const size = 50; // Size of each hexagon (radius of the circumscribed circle)
  const height = 100; // Height of the hexagonal prism
  const angle = 60; // Angle for hexagonal faces (internal angle of a regular hexagon)

  // Calculate the width of the hexagon (distance between opposite vertices)
  const hexWidth = Math.sqrt(3) * size;

  // Generate a honeycomb pattern with multiple hexagons
  const generateHoneycomb = () => {
    const hexagons: JSX.Element[] = [];
    const rows = 3; // Number of rows in the honeycomb
    const cols = 5; // Number of columns in the honeycomb

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let x = col * hexWidth * 1.5; // Horizontal offset
        const y = row * (size * 1.5); // Vertical offset
        const z = 0; // Depth offset

        // Apply alternating offset for even rows to create the honeycomb pattern
        if (row % 2 === 1) {
          x += hexWidth * 0.75; // Offset by half the width
        }

        hexagons.push(
          <div
            key={`${row}-${col}`}
            className="honeycomb-face absolute bg-gray-300 opacity-80 flex justify-center items-center"
            style={{
              transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(90deg)`,
              width: `${hexWidth}px`,
              height: `${size * 1.15}px`, // Adjust height proportionally
              clipPath: `polygon(
                50% 0%, 
                100% 25%, 
                100% 75%, 
                50% 100%, 
                0% 75%, 
                0% 25%
              )`, // Proper hexagonal shape
            }}
          >
            {projectLogos[row * cols + col] && (
              <img
                src={projectLogos[row * cols + col]}
                alt={`project logo ${row * cols + col + 1}`}
                className="w-full h-full object-contain p-2"
              />
            )}
          </div>
        );
      }
    }

    return hexagons;
  };

  return (
    <div
      className="honeycomb-container w-[600px] h-[400px] flex justify-center items-center perspective-1000"
      onMouseDown={handleMouseDown}
    >
      <div
        className="honeycomb transform-style-preserve-3d"
        ref={honeycombRef}
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        {generateHoneycomb()}
      </div>
    </div>
  );
};

export default AnimatedShape;