import React, { useEffect } from 'react';
import { X, ShieldAlert, Terminal, Activity, Layers } from 'lucide-react';
import { AssemblyData } from '../types';
import { AssemblyDiagram } from './AssemblyDiagram';
import { playClick, playHoverTick } from '../utils/sound';

interface AssemblyModalProps {
  assembly: AssemblyData | null;
  onClose: () => void;
}

export const AssemblyModal: React.FC<AssemblyModalProps> = ({ assembly, onClose }) => {
  useEffect(() => {
    if (!assembly) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [assembly, onClose]);

  if (!assembly) return null;

  const assemblyIndex =
    assembly.id === 'asm-01' ? 0 : assembly.id === 'asm-02' ? 1 : assembly.id === 'asm-03' ? 2 : 3;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <div
        className="terminal-window bg-[#061a40] border-2 border-cyan-400/60 max-w-4xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 relative shadow-[0_0_50px_rgba(56,189,248,0.25)] space-y-6 rounded-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Title Bar */}
        <div className="flex justify-between items-start border-b border-cyan-400/30 pb-3 font-mono">
          <div>
            <span className="text-[10px] text-cyan-300 font-bold tracking-wider block">
              [TELEMETRY_INSPECTION_MODE] // {assembly.code}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans mt-0.5">
              {assembly.title}
            </h3>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            onMouseEnter={playHoverTick}
            className="border border-cyan-400/40 hover:border-white p-1 text-cyan-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Inspection (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================
            FULL CAD ARCHITECTURE SCHEMATIC DIAGRAM IN MODAL
            ======================================================== */}
        <div className="border border-cyan-400/40 bg-[#071f4d] p-3 sm:p-4 space-y-2">
          <div className="flex flex-wrap justify-between items-center text-[10px] font-mono border-b border-cyan-400/20 pb-2 text-cyan-200 gap-2">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Activity className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>{assembly.circuitLabel}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-cyan-300/70 hidden sm:inline">CAD BLUEPRINT SCHEMATIC</span>
              <span className="text-emerald-400 font-bold px-2 py-0.5 bg-emerald-950/60 border border-emerald-500/40">
                {assembly.circuitStatus}
              </span>
            </div>
          </div>

          {/* Interactive Blueprint Schematic Diagram */}
          <div className="border border-cyan-400/30">
            <AssemblyDiagram assemblyIndex={assemblyIndex} />
          </div>
        </div>

        {/* Operational Architecture Details */}
        <div className="space-y-2 font-sans text-sm text-cyan-100">
          <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>OPERATIONAL ARCHITECTURE & IMPLEMENTATION</span>
          </h4>
          <p className="leading-relaxed">{assembly.details}</p>
        </div>

        {/* MITRE ATT&CK Matrix Alignment */}
        <div className="border border-cyan-400/30 bg-[#082357]/80 p-4 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-white font-bold border-b border-cyan-400/20 pb-2">
            <ShieldAlert className="w-4 h-4 text-cyan-300" />
            <span>MITRE ATT&CK MAPPING & DETECTION COVERAGE</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {assembly.mitreTechniques.map((tech) => (
              <span
                key={tech}
                className="border border-cyan-400/40 bg-cyan-950/60 text-cyan-200 px-2.5 py-1 text-[11px] font-mono font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Live Telemetry / Execution Log Console */}
        <div className="border border-cyan-400/30 bg-black/90 p-4 font-mono text-xs space-y-2">
          <div className="flex justify-between items-center text-[10px] text-cyan-300 border-b border-cyan-400/20 pb-1.5">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE BUFFER TRACE / SYSTEM AUDIT LOG</span>
            </span>
            <span className="text-emerald-400 font-bold">[STREAM_OK]</span>
          </div>
          <pre className="text-[11px] text-emerald-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
            {assembly.sampleLog}
          </pre>
        </div>

        {/* Stack & Metric Footer */}
        <div className="pt-2 border-t border-cyan-400/20 flex flex-wrap justify-between items-center text-xs font-mono text-cyan-200/80 gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
            <span className="text-cyan-300 font-bold">{assembly.stack}</span>
            <span className="text-white font-semibold">{assembly.metric}</span>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            onMouseEnter={playHoverTick}
            className="border border-cyan-300 bg-cyan-400 text-[#0A2A66] hover:bg-transparent hover:text-white px-5 py-2 font-bold uppercase transition-all shadow-md"
          >
            DISMISS INSPECTION [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
