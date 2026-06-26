import React, { useEffect, useRef } from 'react';

const CyberGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    let time = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Get theme primary color
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--color-primary').trim() || '#3B82F6';
      
      // We will parse hex to rgb for opacity if possible, or just use a fallback
      // Since CSS variables are in hex, let's just use a hardcoded fallback with low opacity
      // for the grid to keep performance high (60FPS).
      ctx.strokeStyle = `rgba(100, 100, 255, 0.03)`; // Very subtle grid lines
      ctx.lineWidth = 1;

      const gridSize = 40;
      const offsetX = (time * 0.5) % gridSize;
      const offsetY = (time * 0.5) % gridSize;

      ctx.beginPath();
      for (let x = offsetX; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = offsetY; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Scanline effect is handled via CSS in index.css

      time += 1;
      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      <div className="absolute inset-0 animate-scanline bg-gradient-to-b from-transparent via-primary/5 to-transparent h-32 opacity-30" />
    </div>
  );
};

export default CyberGrid;
