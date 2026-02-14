import React, { useEffect } from 'react';
import { useWindowSize } from 'react-use';

const Confetti = () => {
  const { width, height } = useWindowSize();
  const particles = Array.from({ length: 150 }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 5 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    speed: Math.random() * 2 + 1,
  }));

  useEffect(() => {
    const animate = () => {
      const canvas = document.getElementById('confettiCanvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.y -= particle.speed;
        if (particle.y < 0) {
          particles[index] = {
            ...particle,
            y: height,
            x: Math.random() * width,
          };
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [particles, width, height]);

  return <canvas id="confettiCanvas" width={width} height={height} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />;
};

export default Confetti;
