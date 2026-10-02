/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
      } ${hardCopyMode ? 'hard-copy-active pt-12 sm:pt-10' : ''}`}
    >
      {/* High-Contrast Hard Copy Floating Toolbar */}
      {hardCopyMode && (
        <div className="hard-copy-toolbar print:hidden fixed top-0 left-0 right-0 z-50 bg-[#000000] text-white px-3 sm:px-4 py-2 sm:py-2.5 flex justify-between items-center font-mono text-xs border-b-2 border-black shadow-2xl animate-fadeIn">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="w-2.5 h-2.5 bg-white inline-block shrink-0" />
            <div className="flex items-baseline gap-2 truncate">
              <span className="font-bold tracking-wider text-[10px] sm:text-xs truncate">
                [HARD COPY SPEC // B&W DRAFT]
              </span>
              <span className="text-[10px] text-gray-400 hidden md:inline">
                • ALL UI CONTROLS SUPPRESSED • BLACK INK ON WHITE VELLUM
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="hidden sm:flex border border-white/30 bg-white/10 px-2 py-1 text-[10px] sm:text-[11px] font-mono text-gray-200 items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-white" />
              <span>PRINT [CTRL+P / ⌘P]</span>
            </div>
            <button
              onClick={() => {
                playClick();
                setHardCopyMode(false);
              }}
              className="border border-white/60 hover:bg-white/20 text-white px-2.5 sm:px-3 py-1 font-bold flex items-center gap-1 text-[11px] sm:text-xs cursor-pointer transition-colors"
              title="Exit Hard Copy View (ESC)"
            >
              <X className="w-3.5 h-3.5" />
              <span>EXIT (ESC)</span>
            </button>
          </div>
        </div>
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
