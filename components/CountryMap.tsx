"use client"
import { useRef, useEffect, useState } from 'react';

const CountryMap = () => {
  const canvasRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const initialScale = 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = '/japan-divided.svg';

    img.onload = () => {
      redrawMap(ctx, img, currentX, currentY);
    };
  }, []);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
    setStartY(event.clientY);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    setCurrentX(currentX + dx);
    setCurrentY(currentY + dy);
    setStartX(event.clientX);
    setStartY(event.clientY);

    redrawMap(canvasRef.current.getContext('2d'), currentX + dx, currentY + dy);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(scale * 1.1); // Увеличиваем масштаб на 10%
    redrawMap(canvasRef.current.getContext('2d'), currentX, currentY);
  };
  
  const handleZoomOut = () => {
    setScale(scale / 1.1); // Уменьшаем масштаб на 10%
    redrawMap(canvasRef.current.getContext('2d'), currentX, currentY);
  };

  const redrawMap = (ctx, x, y) => {
    const img = new Image();
    img.src = '/japan-divided.svg';

    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <button onClick={handleZoomIn}>Увеличить</button>
      <button onClick={handleZoomOut}>Уменьшить</button>
    </div>
  );
};

export default CountryMap;
