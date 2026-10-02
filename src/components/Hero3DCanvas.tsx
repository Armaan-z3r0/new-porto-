import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.set(0, 34, 72);
    camera.lookAt(0, 0, 0);

    const makeSquareTexture = () => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 32;
      texCanvas.height = 32;
      const ctx = texCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(4, 4, 24, 24);
      }
      return new THREE.CanvasTexture(texCanvas);
    };

    const squareTexture = makeSquareTexture();

    // High density grid terrain
    const cols = 56;
    const rows = 44;
    const spacing = 3.2;
    const numPoints = cols * rows;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacing;
        const z = (j - rows / 2) * spacing;
        const y = 0;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;
        idx++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Luminous, clearly visible 3D blueprint particle topography
    const material = new THREE.PointsMaterial({
      color: 0x38BDF8, // Vibrant blueprint cyan
      size: 2.6,
      map: squareTexture,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;
    let isVisible = true;
    let isTabActive = !document.hidden;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      if (!container || !canvas) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || !isTabActive) return;

      const elapsedTime = clock.getElapsedTime() * 0.7;

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 8;
      camera.position.y = 34 + mouseY * 5;
      camera.lookAt(0, 0, 0);

      // Mathematical wave displacement
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let pIdx = 0;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const u = i / cols;
          const v = j / rows;

          const wave1 = Math.sin(u * 7.5 + elapsedTime * 1.5) * 3.5;
          const wave2 = Math.cos(v * 6.0 + elapsedTime * 1.2) * 2.8;
          const wave3 = Math.sin((u + v) * 5.0 + elapsedTime * 0.8) * 2.0;

          posArray[pIdx * 3 + 1] = wave1 + wave2 + wave3;
          pIdx++;
        }
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      resizeObserver.disconnect();
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      squareTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85 select-none transition-opacity duration-500"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
