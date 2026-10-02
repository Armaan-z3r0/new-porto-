import React from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { useTextScramble } from '../hooks/useTextScramble';
import { playClick, playHoverTick, playOpen, playCardHover } from '../utils/sound';
import { SheetRevisionStamp } from './SheetRevisionStamp';

export const HeroSection: React.FC = () => {
  const { text: titleText, replay: replayTitle } = useTextScramble('ARMAAN MULLA', 120);

  return (
    <section
      id="sheet-00"
      className="drawing-sheet p-4 sm:p-10 md:p-14 min-h-[70vh] sm:min-h-[85vh] flex flex-col justify-between overflow-hidden relative scroll-mt-16 lg:scroll-mt-6"
    >
      {/* 4 CAD Corner Crosshairs */}
      <div className="crosshair-corner top-2 left-2" />
      <div className="crosshair-corner top-2 right-2" />
      <div className="crosshair-corner bottom-2 left-2" />
      <div className="crosshair-corner bottom-2 right-2" />

      {/* Sheet Engineering Header Line */}
      <div className="relative z-10 flex flex-wrap justify-between items-start font-mono text-xs text-white/70 mb-4 sm:mb-8 border-b border-white/20 pb-2 sm:pb-3 gap-2">
        <div className="space-y-0.5">
          <p className="text-white font-bold tracking-widest text-xs sm:text-sm">SHEET 00 / 07</p>
          <p className="text-[10px] sm:text-[11px] text-cyan-200/80">GRID: 24MM FIELD METRICS</p>
        </div>
        <div className="text-right space-y-0.5">
          <p className="text-[10px] sm:text-[11px] text-white">SECTION: HERO_INITIALIZE</p>
          <p className="text-[10px] sm:text-[11px] text-cyan-200/80">COORD: 19.0760 N, 72.8777 E</p>
        </div>
      </div>

      {/* Highly Visible 3D Wave Particle Cloud (Behind Content) */}
      <Hero3DCanvas />

      {/* Main Blueprint Hero Content */}
      <div className="relative z-10 my-auto py-6 max-w-4xl space-y-6">
        {/* Status Tag */}
        <div
          onMouseEnter={playCardHover}
          className="inline-flex items-center gap-2 border border-white/60 px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-mono bg-[#082357]/90 text-white backdrop-blur-sm shadow-sm cursor-default max-w-full"
        >
          <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse shrink-0" />
          <span className="tracking-wide truncate">STATUS: READY FOR CYBER DEFENSE DEPLOYMENT</span>
        </div>

        {/* Primary Title with Scramble Effect */}
        <h1
          onClick={() => {
            playClick();
            replayTitle();
          }}
          onMouseEnter={() => {
            playHoverTick();
            replayTitle();
          }}
          title="Click or hover to decode telemetry"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase font-sans select-none cursor-pointer leading-none hover:text-cyan-200 transition-colors break-words"
        >
          {titleText}
        </h1>

        {/* Subtitle & Focus */}
        <div className="space-y-2.5 max-w-2xl">
          <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium font-sans leading-snug">
            Cybersecurity Analyst, drawn to both sides of the wire.
          </p>
          <p className="text-sm sm:text-base text-cyan-100/90 font-mono leading-relaxed">
            Threat detection, endpoint defense, security engineering and offensive reconnaissance. Mumbai, India.
          </p>
        </div>

        {/* Technical Dimension Indicator Line */}
        <div className="py-2 max-w-lg">
          <div className="dim-line-h w-full pt-1.5 flex justify-between font-mono text-[9px] sm:text-[10px] text-cyan-200/60 tracking-wider">
            <span>VECTOR [00]</span>
            <span className="hidden xs:inline">CYBER_DEFENSE</span>
            <span>SECURITY_ENGINEERING</span>
          </div>
        </div>

        {/* Action Controls - Inline 2-column on mobile, row on tablet/desktop */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-4 pt-3 font-mono text-xs w-full sm:w-auto">
          <a
            href="#sheet-01"
            onClick={playOpen}
            onMouseEnter={playHoverTick}
            className="border-2 border-white bg-white text-[#0A2A66] hover:bg-transparent hover:text-white px-3 sm:px-7 py-2.5 sm:py-3.5 font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-none text-center text-[11px] sm:text-xs"
          >
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="truncate">Open drawings</span>
          </a>

          <a
            href="https://blog.armaan404.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={playHoverTick}
            className="border border-white/60 hover:border-white text-white bg-[#082357]/80 hover:bg-white/10 px-3 sm:px-7 py-2.5 sm:py-3.5 font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2.5 backdrop-blur-sm text-center text-[11px] sm:text-xs"
          >
            <span className="truncate">Field notes</span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
          </a>
        </div>
      </div>

      {/* Bottom Sheet Metadata Bar */}
      <div className="relative z-10 flex flex-wrap justify-between items-center text-[11px] font-mono text-white/70 border-t border-white/20 pt-3 pr-32 sm:pr-36 gap-2">
        <span>PROJECT REF: SEC-DEFENSE-2025-Q1</span>
        <span className="hidden sm:inline">CYBERSECURITY BLUEPRINT ARCHITECTURE</span>
        <a
          href="#sheet-01"
          onClick={playClick}
          onMouseEnter={playHoverTick}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <span className="w-1.5 h-1.5 bg-white inline-block" />
          <span>SCROLL FOR SPECIFICATIONS</span>
        </a>
      </div>

      {/* Dynamic Drawing Sheet Revision Stamp */}
      <SheetRevisionStamp sheetId="00" status="ACTIVE" />
    </section>
  );
};
