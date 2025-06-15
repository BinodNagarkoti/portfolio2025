
'use client';

import { Code2Icon, DatabaseIcon, ServerCogIcon, CloudIcon, PaletteIcon, ZapIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const icons = [
  <Code2Icon key="code" className="h-10 w-10 text-accent" />,
  <DatabaseIcon key="db" className="h-10 w-10 text-accent" />,
  <ServerCogIcon key="server" className="h-10 w-10 text-accent" />,
  <CloudIcon key="cloud" className="h-10 w-10 text-accent" />,
  <PaletteIcon key="design" className="h-10 w-10 text-accent" />,
  <ZapIcon key="perf" className="h-10 w-10 text-accent" />,
];

const AnimatedShape = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -20, y: 30 }); // Initial rotation
  const [isDragging, setIsDragging] = useState(false);
  const [prevMousePos, setPrevMousePos] = useState({ x: 0, y: 0 });
  const rotationSpeed = 0.5; // Degrees per pixel moved

  useEffect(() => {
    const cubeElement = cubeRef.current;
    if (cubeElement) {
      cubeElement.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
    }
  }, [rotation]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - prevMousePos.x;
      const deltaY = event.clientY - prevMousePos.y;

      setRotation(prevRotation => ({
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
        setRotation(prev => ({
          x: prev.x - 0.02, 
          y: prev.y + 0.05,
        }));
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);


  return (
    <div
      className="cube-container"
      onMouseDown={handleMouseDown}
      // onMouseLeave={() => setIsDragging(false)} // Optional: stop dragging if mouse leaves container
    >
      <div className="cube" ref={cubeRef}>
        <div className="cube-face cube-face-front">{icons[0]}</div>
        <div className="cube-face cube-face-back">{icons[1]}</div>
        <div className="cube-face cube-face-right">{icons[2]}</div>
        <div className="cube-face cube-face-left">{icons[3]}</div>
        <div className="cube-face cube-face-top">{icons[4]}</div>
        <div className="cube-face cube-face-bottom">{icons[5]}</div>
      </div>
    </div>
  );
};

export default AnimatedShape;
