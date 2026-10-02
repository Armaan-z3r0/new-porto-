import React, { useEffect, useRef } from 'react';

const HEX_CHARS = [
  '00', '1A', '2F', '3C', '4E', '5B', '68', '7D',
  '89', '94', 'A1', 'B7', 'C2', 'DE', 'E5', 'FF',
  '0x4F', '0x1C', '0x88', '0xDE', '0xAD', '0xBE', '0xEF',
  'SYS', 'SEC', 'TCP', 'UDP', 'ACK', 'SYN', 'MEM', 'PTR'
];

interface HexCell {
  x: number;
  y: number;
  val: string;
  baseOpacity: number;
  scanHighlight: number;
}

export const HexAmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;

    let cells: HexCell[] = [];
    const colSpacing = 64;
    const rowSpacing = 36;
    const scanRadius = 175;

    const initGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      cells = [];
      const cols = Math.ceil(width / colSpacing) + 1;
      const rows = Math.ceil(height / rowSpacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * colSpacing + (r % 2 === 0 ? 0 : colSpacing / 2) + (Math.random() * 8 - 4);
          const y = r * rowSpacing + 20 + (Math.random() * 6 - 3);
          const val = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
          const baseOpacity = 0.10 + Math.random() * 0.08; // Clearly visible baseline (10% - 18%)

          cells.push({
            x,
            y,
            val,
            baseOpacity,
            scanHighlight: 0,
          });
        }
      }
    };

    initGrid();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', initGrid);

    let animationFrameId: number;
    let isTabVisible = !document.hidden;

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let frameCount = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isTabVisible) return;

      frameCount++;

      if (targetMouseX > -5000) {
        mouseX += (targetMouseX - mouseX) * 0.2;
        mouseY += (targetMouseY - mouseY) * 0.2;
      } else {
        mouseX = -9999;
        mouseY = -9999;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Draw visible scanning radar ring around cursor
      if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
        const ringGrad = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, scanRadius
        );
        ringGrad.addColorStop(0, 'rgba(56, 189, 248, 0.12)'); // Cyan glow center
        ringGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.05)');
        ringGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = ringGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, scanRadius, 0, Math.PI * 2);
        ctx.fill();

        // Scanner reticle
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 45, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, scanRadius * 0.85, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Render & update each hex cell
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        let targetHighlight = 0;

        if (mouseX > -5000) {
          const dx = cell.x - mouseX;
          const dy = cell.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < scanRadius) {
            targetHighlight = Math.pow(1 - dist / scanRadius, 1.3);

            if (frameCount % 5 === 0 && Math.random() < 0.35 * targetHighlight) {
              cell.val = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
            }
          }
        }

        cell.scanHighlight += (targetHighlight - cell.scanHighlight) * 0.18;

        const currentOpacity = cell.baseOpacity + cell.scanHighlight * 0.55;

        if (cell.scanHighlight > 0.08) {
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(138, 143, 152, ${currentOpacity.toFixed(3)})`;
        }

        ctx.fillText(cell.val, cell.x, cell.y);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', initGrid);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none block"
      style={{ opacity: 0.95 }}
    />
  );
};
