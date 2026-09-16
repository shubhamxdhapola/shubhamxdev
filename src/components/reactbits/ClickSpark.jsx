import { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#FF4ECD',
  sparkSize = 10,
  sparkRadius = 18,
  sparkCount = 8,
  duration = 420,
  easing = 'ease-out',
  extraScale = 1.0,
  children
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const easeFunc = useCallback(
    t => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;

    const draw = timestamp => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale * dpr;
        const lineLength = sparkSize * (1 - eased) * dpr;

        const x1 = spark.x * dpr + distance * Math.cos(spark.angle);
        const y1 = spark.y * dpr + distance * Math.sin(spark.angle);
        const x2 = spark.x * dpr + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y * dpr + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2 * dpr;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale]);

  useEffect(() => {
    const handlePointerDown = e => {
      const now = performance.now();
      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now
      }));

      sparksRef.current.push(...newSparks);
    };

    window.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: true });

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
    };
  }, [sparkCount]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[9999] select-none block"
      />
      {children}
    </>
  );
};

export default ClickSpark;
