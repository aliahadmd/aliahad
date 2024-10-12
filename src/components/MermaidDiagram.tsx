"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const initializeMermaid = async () => {
      mermaid.initialize({
        startOnLoad: true,
        theme: theme === 'dark' ? 'dark' : 'default',
        darkMode: theme === 'dark',
      });

      if (ref.current) {
        const { svg } = await mermaid.render('mermaid-svg', chart);
        ref.current.innerHTML = svg;
      }
    };

    initializeMermaid();
  }, [chart, theme]);

  return (
    <div 
      className="mermaid overflow-x-auto max-w-full bg-white dark:bg-gray-800 p-4 rounded-lg"
      ref={ref}
    />
  );
};

export default MermaidDiagram;
