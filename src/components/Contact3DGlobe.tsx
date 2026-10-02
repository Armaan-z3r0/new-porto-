import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Contact3DGlobe: React.FC = () => {
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
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 75);

    // Full 3D Globe Sphere (Fully unclipped and visible)
    const globeRadius = 17;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 36, 26);

    // Vibrant blueprint cyan wireframe
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      wireframe: true,
      transparent: true,
      opacity: 0.48,
    });

    const globe = new THREE.Mesh(sphereGeo, wireframeMat);
    scene.add(globe);

    // Inner glowing atmospheric particle shell for full 3D volumetric presence
    const innerGeo = new THREE.SphereGeometry(globeRadius * 0.98, 20, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x1145A3,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerGlobe = new THREE.Mesh(innerGeo, innerMat);
    globe.add(innerGlobe);

    // Outer orbital ring / equator ring to accentuate the full sphere
    const ringGeo = new THREE.RingGeometry(globeRadius * 1.25, globeRadius * 1.27, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    globe.add(ringMesh);

    // Lat/Lon to 3D Cartesian coordinates
    const latLongToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Mumbai coordinates: 19.0760 N, 72.8777 E
    const mumbaiPos = latLongToVector3(19.076, 72.8777, globeRadius);

    // Mumbai Node Beacon Marker in white & cyan
    const mumbaiMarker = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.95 })
    );
    mumbaiMarker.position.copy(mumbaiPos);
    globe.add(mumbaiMarker);

    // Global defense nodes
    const targetNodes = [
      { name: 'LON', lat: 51.5074, lon: -0.1278 },
      { name: 'SFO', lat: 37.7749, lon: -122.4194 },
      { name: 'TYO', lat: 35.6762, lon: 139.6503 },
      { name: 'SIN', lat: 1.3521, lon: 103.8198 },
      { name: 'SYD', lat: -33.8688, lon: 151.2093 },
      { name: 'FRA', lat: 50.1109, lon: 8.6821 },
    ];

    targetNodes.forEach((node) => {
      const destPos = latLongToVector3(node.lat, node.lon, globeRadius);

      const nodePin = new THREE.Mesh(
        new THREE.SphereGeometry(0.65, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.9 })
      );
      nodePin.position.copy(destPos);
      globe.add(nodePin);

      // Arc between Mumbai and destination node
      const midPoint = new THREE.Vector3().addVectors(mumbaiPos, destPos).multiplyScalar(0.5);
      const distance = mumbaiPos.distanceTo(destPos);
      midPoint.normalize().multiplyScalar(globeRadius + distance * 0.32);

      const curve = new THREE.QuadraticBezierCurve3(mumbaiPos, midPoint, destPos);
      const points = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.65,
      });
      const arcLine = new THREE.Line(lineGeo, lineMat);
      globe.add(arcLine);
    });

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

    const updateLayout = () => {
      if (!container || !canvas) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      // Position full globe: On desktop place comfortably on the right side so all 360 degrees are in view; on mobile center it
      if (width >= 1024) {
        globe.position.set(16, 0, 0);
      } else {
        globe.position.set(0, -6, 0);
      }
    };

    updateLayout();
    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(container);

    // Mouse parallax tracking
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotX = normY * 0.25;
      targetRotY = normX * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || !isTabActive) return;

      // Continuous full globe rotation
      globe.rotation.y += 0.005;
      globe.rotation.x += (targetRotX - globe.rotation.x) * 0.05;

      ringMesh.rotation.z += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      resizeObserver.disconnect();
      observer.disconnect();
      sphereGeo.dispose();
      innerGeo.dispose();
      ringGeo.dispose();
      wireframeMat.dispose();
      innerMat.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-25 sm:opacity-85 select-none transition-opacity duration-500"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
