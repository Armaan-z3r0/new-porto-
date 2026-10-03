/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Printer, X } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CredentialsSection } from './components/CredentialsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { TerminalFooter } from './components/TerminalFooter';
import { AssemblyModal } from './components/AssemblyModal';
import { TerminalModal } from './components/TerminalModal';
import { CadOverlay } from './components/CadOverlay';
import { HexAmbientBackground } from './components/HexAmbientBackground';
import { BlueprintWatermark } from './components/BlueprintWatermark';
import { AssemblyData } from './types';
import {
  initAudioOnFirstInteraction,
  toggleSound,
  isSoundEnabled,
  playCadToggle,
  playClick,
} from './utils/sound';

export default function App() {
  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());
  const [cadOverlay, setCadOverlay] = useState(false);
  const [hardCopyMode, setHardCopyMode] = useState(false);
  const [selectedAssembly, setSelectedAssembly] = useState<AssemblyData | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Initialize Web Audio listener on first user interaction
  useEffect(() => {
    initAudioOnFirstInteraction();
  }, []);

  // Listen for Escape key to exit hard copy mode and beforeprint events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hardCopyMode) {
        setHardCopyMode(false);
      }
    };

    const handleBeforePrint = () => {
      setHardCopyMode(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeprint', handleBeforePrint);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeprint', handleBeforePrint);
    };
  }, [hardCopyMode]);

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const handleToggleHardCopy = () => {
    playClick();
    setHardCopyMode((prev) => !prev);
  };

  return (
    <div
      className={`blueprint-grid-bg min-h-screen text-white relative selection:bg-white selection:text-[#0A2A66] ${
        cadOverlay && !hardCopyMode ? 'cad-overlay-active' : ''
      } ${hardCopyMode ? 'hard-copy-active pt-14 sm:pt-12' : ''}`}
    >
      {/* High-Contrast Hard Copy Floating Toolbar & Escape Controls (Rendered into document.body to bypass parent stacking contexts) */}
      {hardCopyMode && typeof document !== 'undefined' && createPortal(
        <>
          <div
            role="banner"
            aria-label="Hard Copy Drafting Mode Toolbar"
            className="hard-copy-toolbar print:hidden fixed top-0 left-0 right-0 w-full z-[2147483647] bg-black text-white px-3 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center font-mono text-xs border-b-2 border-neutral-700 shadow-2xl animate-fadeIn"
            style={{ zIndex: 2147483647 }}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="w-2.5 h-2.5 bg-white inline-block shrink-0 animate-pulse" />
              <div className="flex items-baseline gap-2 truncate">
                <span className="font-bold tracking-wider text-[11px] sm:text-xs truncate text-white">
                  [HARD COPY SPEC // B&W DRAFT]
                </span>
                <span className="text-[10px] text-gray-400 hidden md:inline">
                  • BLACK INK ON WHITE VELLUM
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => {
                  playClick();
                  window.print();
                }}
                className="print-btn hidden sm:flex border border-neutral-600 bg-neutral-900 hover:bg-neutral-800 text-white px-3 py-1.5 text-xs font-mono items-center gap-1.5 cursor-pointer transition-colors"
                title="Print Specification (⌘P / Ctrl+P)"
              >
                <Printer className="w-3.5 h-3.5 text-white" />
                <span>PRINT [⌘P]</span>
              </button>
              <button
                onClick={() => {
                  playClick();
                  setHardCopyMode(false);
                }}
                className="exit-btn bg-white hover:bg-neutral-200 text-black px-3.5 sm:px-4 py-1.5 font-mono font-bold flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer transition-all border-2 border-white rounded-xs shadow-lg"
                title="Exit Hard Copy View (ESC)"
              >
                <X className="w-4 h-4 text-black shrink-0" strokeWidth={3} />
                <span className="font-extrabold text-black tracking-wider">EXIT (ESC)</span>
              </button>
            </div>
          </div>

          {/* Persistent Floating Escape Pill (Accessible anywhere while scrolling or on mobile) */}
          <div
            className="fixed bottom-5 right-5 z-[2147483647] print:hidden"
            style={{ zIndex: 2147483647 }}
          >
            <button
              onClick={() => {
                playClick();
                setHardCopyMode(false);
              }}
              className="hard-copy-fab bg-black text-white hover:bg-white hover:text-black border-2 border-white px-4 py-2.5 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_24px_rgba(0,0,0,0.85)] cursor-pointer transition-all rounded-xs"
              style={{ zIndex: 2147483647 }}
              title="Exit Hard Copy View (ESC)"
            >
              <X className="w-4 h-4 shrink-0" strokeWidth={3} />
              <span className="tracking-wider font-extrabold">EXIT B&W (ESC)</span>
            </button>
          </div>
        </>,
        document.body
      )}

      {/* Repeating Faint REDACTED / BLUEPRINT DRAFT Watermark (Suppressed in Hard Copy) */}
      {!hardCopyMode && <BlueprintWatermark />}

      {/* Subtle Background Hex Ambient Token Stream (Suppressed in Hard Copy) */}
      {!hardCopyMode && <HexAmbientBackground />}

      {/* Slim, High-Precision Left Sidebar Navigation */}
      <Navigation
        cadOverlay={cadOverlay}
        setCadOverlay={setCadOverlay}
        soundOn={soundOn}
        onToggleSound={handleToggleSound}
        onOpenTerminal={() => setTerminalOpen(true)}
        hardCopyMode={hardCopyMode}
        onToggleHardCopy={handleToggleHardCopy}
      />

      {/* Main Content Area Offset for Slim Left Sidebar (Offset removed in Hard Copy/Print) */}
      <div className="lg:pl-56 xl:pl-60 transition-all duration-300">
        <main className="max-w-6xl mx-auto px-3 sm:px-6 md:px-8 pt-16 lg:pt-6 pb-12 sm:pb-16 space-y-6 sm:space-y-10 lg:space-y-14 relative z-10">
          {/* SHEET 00 - TITLE BLOCK (HERO) */}
          <HeroSection />

          {/* SHEET 01 - SPECIFICATION */}
          <AboutSection />

          {/* SHEET 02 - BILL OF MATERIALS */}
          <SkillsSection />

          {/* SHEET 03 - ASSEMBLIES */}
          <ProjectsSection onSelectAssembly={(asm) => setSelectedAssembly(asm)} />

          {/* SHEET 04 - REVISION HISTORY */}
          <ExperienceSection />

          {/* SHEET 05 - STANDARDS & CREDENTIALS */}
          <CredentialsSection />

          {/* SHEET 06 - FIELD NOTES */}
          <BlogSection />

          {/* SHEET 07 - TRANSMISSION */}
          <ContactSection />
        </main>

        {/* ISO-7200 Standard Engineering Specification Footer */}
        <TerminalFooter />
      </div>

      {/* Telemetry Inspection Modal for Projects */}
      <AssemblyModal
        assembly={selectedAssembly}
        onClose={() => setSelectedAssembly(null)}
      />

      {/* Interactive Diagnostics Terminal Modal with Autocomplete */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onTriggerHardCopy={() => {
          setTerminalOpen(false);
          setHardCopyMode(true);
        }}
      />

      {/* Enhanced Interactive CAD Precision Crosshairs & Dimension HUD */}
      {!hardCopyMode && (
        <CadOverlay
          isActive={cadOverlay}
          onToggle={() => {
            const next = !cadOverlay;
            playCadToggle(next);
            setCadOverlay(next);
          }}
        />
      )}
    </div>
  );
}
