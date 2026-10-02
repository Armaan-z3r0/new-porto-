import React, { useState, useEffect } from 'react';
import { Crosshair, X, Compass } from 'lucide-react';
import { playClick, playHoverTick } from '../utils/sound';

interface CadOverlayProps {
  isActive: boolean;
  onToggle: () => void;
}

export const CadOverlay: React.FC<CadOverlayProps> = ({ isActive, onToggle }) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!isActive) return;

    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onToggle();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, onToggle]);

  if (!isActive) return null;

  const { x, y } = mousePos;
  const isInside = x >= 0 && y >= 0 && x <= windowDimensions.width && y <= windowDimensions.height;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden font-mono">
      {/* 1. DYNAMIC FULLSCREEN CROSSHAIRS (TRACKING MOUSE) */}
      {isInside && (
        <>
          {/* Horizontal Hairline */}
          <div
            className="absolute left-0 right-0 border-t border-cyan-300/40 border-dashed pointer-events-none"
            style={{ top: `${y}px` }}
          />

          {/* Vertical Hairline */}
          <div
            className="absolute top-0 bottom-0 border-l border-cyan-300/40 border-dashed pointer-events-none"
            style={{ left: `${x}px` }}
          />

          {/* Reticle Target Box [ + ] at cursor */}
          <div
            className="absolute w-8 h-8 -ml-4 -mt-4 border border-cyan-300/70 pointer-events-none flex items-center justify-center"
            style={{ left: `${x}px`, top: `${y}px` }}
          >
            <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-ping" />
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyan-200" />
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-cyan-200" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-cyan-200" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyan-200" />
          </div>

          {/* Floating Live Telemetry HUD Tag (Follows Cursor) */}
          <div
            className="absolute pointer-events-none bg-[#071f4d]/95 border border-cyan-300/70 p-2 shadow-[0_0_15px_rgba(56,189,248,0.3)] text-[9px] text-cyan-200 space-y-0.5 rounded-sm"
            style={{
              left: `${Math.min(x + 18, windowDimensions.width - 140)}px`,
              top: `${Math.min(y + 18, windowDimensions.height - 75)}px`,
            }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-cyan-400/30 pb-0.5 text-white font-bold">
              <span className="flex items-center gap-1 text-cyan-300">
                <Compass className="w-2.5 h-2.5" />
                <span>CROSSHAIR</span>
              </span>
              <span className="text-[8px] text-cyan-300/80">AM-SEC</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-cyan-300/70">X:</span>
              <span className="font-bold text-white">{x} px</span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-cyan-300/70">Y:</span>
              <span className="font-bold text-white">{y} px</span>
            </div>
          </div>
        </>
      )}

      {/* 2. FLOATING TOP-RIGHT CAD STATUS BADGE & CLOSE CONTROL */}
      <div className="absolute top-4 right-4 pointer-events-auto flex items-center gap-2">
        <div className="border border-cyan-300/60 bg-[#071f4d]/95 text-white text-[10px] px-3 py-1 flex items-center gap-2 shadow-lg backdrop-blur">
          <Crosshair className="w-3.5 h-3.5 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-bold tracking-wider text-cyan-200">CAD CROSSHAIR: ACTIVE</span>
          <button
            onClick={() => {
              playClick();
              onToggle();
            }}
            onMouseEnter={playHoverTick}
            className="ml-1 p-0.5 hover:bg-white/20 rounded text-cyan-200 hover:text-white transition-colors"
            title="Exit CAD Mode (or press ESC)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
