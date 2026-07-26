'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  delta: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  alpha: number;
}

export function StarfieldBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 120 stars
    const starColors = ['#ffffff', '#eab308', '#c084fc', '#818cf8', '#f472b6'];
    const stars: Star[] = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random(),
      delta: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: starColors[Math.floor(Math.random() * starColors.length)],
    }));

    // Meteor array
    let meteor: Meteor | null = null;

    const spawnMeteor = () => {
      meteor = {
        x: Math.random() * width,
        y: Math.random() * (height / 2),
        length: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
        alpha: 1,
      };
    };

    // Spawn shooting star every 6-10 seconds
    const meteorInterval = setInterval(() => {
      if (Math.random() > 0.3) spawnMeteor();
    }, 7000);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha <= 0.1 || star.alpha >= 1) star.delta *= -1;

        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw Meteor if active
      if (meteor) {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 235, 150, ' + meteor.alpha + ')';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.length, meteor.y + meteor.length);
        ctx.stroke();
        ctx.restore();

        meteor.x += meteor.speed;
        meteor.y += meteor.speed;
        meteor.alpha -= 0.015;

        if (meteor.alpha <= 0) meteor = null;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(meteorInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
