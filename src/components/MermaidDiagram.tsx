"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.run({
      querySelector: ".mermaid",
    });
  }, [chart]);

  return (
    <div className="mermaid overflow-x-auto max-w-full" ref={ref}>
      {chart}
    </div>
  );
};

export default MermaidDiagram;
