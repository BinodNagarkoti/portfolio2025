'use client';

import { Code2Icon, DatabaseIcon, ServerCogIcon, CloudIcon, PaletteIcon, ZapIcon } from 'lucide-react';

// Array of icons to display on cube faces
const icons = [
  <Code2Icon key="code" className="h-10 w-10 text-accent" />,
  <DatabaseIcon key="db" className="h-10 w-10 text-accent" />,
  <ServerCogIcon key="server" className="h-10 w-10 text-accent" />,
  <CloudIcon key="cloud" className="h-10 w-10 text-accent" />,
  <PaletteIcon key="design" className="h-10 w-10 text-accent" />,
  <ZapIcon key="perf" className="h-10 w-10 text-accent" />,
];

const AnimatedShape = () => {
  return (
    <div className="cube-container">
      <div className="cube">
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
