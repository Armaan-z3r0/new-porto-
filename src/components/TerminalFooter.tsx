import React from 'react';
import { ExternalLink } from 'lucide-react';
import { playClick, playHoverTick, playCardHover } from '../utils/sound';
import { CURRENT_REVISION } from '../constants/version';

export const TerminalFooter: React.FC = () => {
  return (
    <footer className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-16 font-mono text-xs">
      <div
        onMouseEnter={playCardHover}
        className="border-2 border-white/70 bg-[#082357] p-4 sm:p-6 text-white space-y-4 shadow-2xl relative"
      >
        {/* ISO Standard Header */}
        <div className="text-[10px] text-cyan-200/70 border-b border-white/20 pb-1.5 flex flex-wrap justify-between items-center gap-2">
          <span className="tracking-wider">
            STANDARD ENGINEERING SPECIFICATION BLOCK // ISO-7200
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tracking-wider">{CURRENT_REVISION}</span>
            <span className="text-cyan-300/60 hidden sm:inline">// AM-SEC-2025</span>
          </div>
        </div>

        {/* 6 Specification Fields */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 border-b border-white/20 pb-4">
          <div onMouseEnter={playHoverTick}>
            <span className="text-cyan-200/60 text-[9px] block tracking-wider">PROJECT NAME</span>
            <span className="font-bold text-white text-xs sm:text-sm">PORTFOLIO_BLUEPRINT</span>
          </div>
          <div onMouseEnter={playHoverTick}>
            <span className="text-cyan-200/60 text-[9px] block tracking-wider">DRAWN BY</span>
            <span className="font-bold text-white text-xs sm:text-sm">Armaan Mulla</span>
          </div>
          <div onMouseEnter={playHoverTick}>
            <span className="text-cyan-200/60 text-[9px] block tracking-wider">DISCIPLINE</span>
            <span className="font-bold text-white text-xs sm:text-sm">Cybersecurity</span>
          </div>
          <div onMouseEnter={playHoverTick}>
            <span className="text-cyan-200/60 text-[9px] block tracking-wider">REVISION</span>
            <span className="font-bold text-white text-xs sm:text-sm">{CURRENT_REVISION}</span>
          </div>
          <div onMouseEnter={playHoverTick}>
            <span className="text-cyan-200/60 text-[9px] block tracking-wider">SCALE</span>
            <span className="font-bold text-white text-xs sm:text-sm">1:1 TRUE</span>
          </div>
          <div onMouseEnter={playHoverTick}>
            <span className="text-cyan-200/60 text-[9px] block tracking-wider">STATUS</span>
            <span className="font-bold text-cyan-300 text-xs sm:text-sm tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" />
              OPERATIONAL
            </span>
          </div>
        </div>

        {/* Accreditation and Location Bar */}
        <div className="flex flex-wrap justify-between items-center text-[10px] text-cyan-200/70 pt-1 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span>LOCATION: MUMBAI, INDIA</span>
            <span className="text-white/30">|</span>
            <a
              href="https://blog.armaan404.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHoverTick}
              className="hover:text-white underline inline-flex items-center gap-1"
            >
              <span>BLOG: BLOG.ARMAAN404.COM</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
          <div>
            <span>ALL SPECIFICATIONS ACCREDITED // 2025 ARMAAN MULLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
