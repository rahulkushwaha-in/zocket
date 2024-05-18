// src/components/CanvasComponent.jsx

import React, { useEffect, useRef } from 'react';
import CanvasManager from '../utils/CanvasManager';

const CanvasComponent = ({ data }) => {
  const canvasRef = useRef(null);
  const canvasManagerRef = useRef(null);

/* The `useEffect` hook in the `CanvasComponent` component is responsible for managing side effects
related to the canvas rendering. */
  useEffect(() => {
    if (!canvasManagerRef.current) {
      const canvas = canvasRef.current;
      canvasManagerRef.current = new CanvasManager(canvas);
    }
    canvasManagerRef.current.setData(data);
  }, [data]);

  return (
   /* This code snippet is a part of a React component named `CanvasComponent`. */
    <div className="grid place-items-center">
      <canvas ref={canvasRef} width={1080} height={1080} style={{ height: 400, width: 400 }}></canvas>
    </div>
  );
};

export default CanvasComponent;
