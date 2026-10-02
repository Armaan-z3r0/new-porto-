import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Crosshair, Terminal, Menu, X, ExternalLink, Radio, BookOpen, Printer } from 'lucide-react';
import { playClick, playHoverTick, playSectionSweep, playCardHover, playCadToggle } from '../utils/sound';

interface NavigationProps {
  cadOverlay: boolean;
  setCadOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  soundOn: boolean;
  onToggleSound: () => void;
  onOpenTerminal: () => void;
  hardCopyMode: boolean;
  onToggleHardCopy: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  cadOverlay,
  setCadOverlay,
  soundOn,
  onToggleSound,
  onOpenTerminal,
  hardCopyMode,
  onToggleHardCopy,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSheet, setActiveSheet] = useState<string>('sheet-00');
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  const navItems = [
    { num: '00', label: 'TITLE BLOCK', href: '#sheet-00', id: 'sheet-00' },
    { num: '01', label: 'SPECIFICATION', href: '#sheet-01', id: 'sheet-01' },
    { num: '02', label: 'BILL OF MATERIALS', href: '#sheet-02', id: 'sheet-02' },
    { num: '03', label: 'ASSEMBLIES', href: '#sheet-03', id: 'sheet-03' },
    { num: '04', label: 'REVISION HISTORY', href: '#sheet-04', id: 'sheet-04' },
    { num: '05', label: 'STANDARDS & CERTS', href: '#sheet-05', id: 'sheet-05' },
    { num: '06', label: 'FIELD NOTES', href: '#sheet-06', id: 'sheet-06' },
    { num: '07', label: 'TRANSMISSION', href: '#sheet-07', id: 'sheet-07' },
  ];

  // High-precision scroll-spy that always accurately highlights the current visible sheet
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const offset = window.innerWidth >= 1024 ? 100 : 120;
      const scrollPos = window.scrollY + offset;

      // Check bottom of page threshold for Sheet 07
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isBottom) {
        setActiveSheet('sheet-07');
        return;
      }

      let currentId = navItems[0].id;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentId = item.id;
          }
        }
      }

      setActiveSheet(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, id: string) => {
    playClick();
    setMobileMenuOpen(false);

    // Immediately highlight the clicked item and lock scroll-spy during movement
    setActiveSheet(id);
    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const targetEl = document.querySelector(href);
    if (targetEl) {
      const isDesktop = window.innerWidth >= 1024;
      const navOffset = isDesktop ? 24 : 64;
      const elementTop = targetEl.getBoundingClientRect().top + window.scrollY;
      const targetScroll = Math.max(0, elementTop - navOffset);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      playSectionSweep();
    }

    scrollTimeout.current = window.setTimeout(() => {
      isClickScrolling.current = false;
      try {
        window.history.replaceState(null, '', href);
      } catch {
        // Ignore
      }
    }, 850);
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[#071f4d]/98 backdrop-blur-md border-b border-white/20 px-3 sm:px-4 flex items-center justify-between font-mono text-xs select-none">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="w-2.5 h-2.5 bg-cyan-300 animate-pulse shrink-0" />
          <a
            href="#sheet-00"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#sheet-00', 'sheet-00');
            }}
            className="text-white font-bold tracking-wider truncate text-[11px] sm:text-xs"
          >
            AM-SEC-2025
          </a>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              playClick();
              onToggleHardCopy();
            }}
            className={`p-2 border transition-all text-xs flex items-center justify-center min-w-[36px] min-h-[36px] ${
              hardCopyMode
                ? 'border-cyan-300 bg-cyan-400/20 text-cyan-200'
                : 'border-white/30 text-white/60'
            }`}
            title="Toggle High-Contrast B&W Hard Copy View"
            aria-label="Toggle High-Contrast B&W Hard Copy View"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              playClick();
              onToggleSound();
            }}
            className={`p-2 border transition-all text-xs flex items-center justify-center min-w-[36px] min-h-[36px] ${
              soundOn
                ? 'border-cyan-300 bg-cyan-400/20 text-cyan-200'
                : 'border-white/30 text-white/60'
            }`}
            title="Toggle Sound"
            aria-label="Toggle Sound"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              playClick();
              onOpenTerminal();
            }}
            className="border border-cyan-400/60 bg-cyan-500/10 text-cyan-200 px-2 py-1.5 flex items-center gap-1 font-bold text-[11px] min-h-[36px]"
            title="Open Diagnostic Shell"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">SHELL</span>
          </button>

          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 border border-white/30 text-white min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#071f4d]/98 backdrop-blur-lg pt-16 p-4 flex flex-col justify-between font-mono text-xs animate-fadeIn select-none overflow-y-auto">
          <div className="space-y-3 pb-4">
            <div className="text-[10px] text-cyan-200/70 pb-2 border-b border-white/15 flex justify-between">
              <span>DRAWING SHEETS INDEX</span>
              <span>DWG NO. AM-SEC-2025</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSheet === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href, item.id);
                    }}
                    className={`p-2.5 border transition-all flex items-center justify-between ${
                      isActive
                        ? 'border-cyan-300 bg-cyan-500/20 text-white font-bold border-l-4'
                        : 'border-white/10 bg-[#082357]/60 text-cyan-100/80 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-cyan-300 font-bold">{item.num}.</span>
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_8px_#38BDF8]" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Touch Utility Controls */}
            <div className="pt-3 border-t border-white/15 space-y-2">
              <span className="text-[10px] text-cyan-200/70 block">SYSTEM & DRAFTING CONTROLS</span>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <button
                  onClick={() => {
                    const next = !cadOverlay;
                    playCadToggle(next);
                    setCadOverlay(next);
                  }}
                  className={`p-2.5 border flex flex-col items-center justify-center gap-1 transition-all ${
                    cadOverlay
                      ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                      : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
                  }`}
                >
                  <Crosshair className="w-4 h-4 text-cyan-300" />
                  <span>CAD HUD</span>
                </button>

                <button
                  onClick={() => {
                    playClick();
                    onToggleSound();
                  }}
                  className={`p-2.5 border flex flex-col items-center justify-center gap-1 transition-all ${
                    soundOn
                      ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                      : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
                  }`}
                >
                  {soundOn ? <Volume2 className="w-4 h-4 text-cyan-300" /> : <VolumeX className="w-4 h-4 text-white/50" />}
                  <span>{soundOn ? 'SFX ON' : 'MUTED'}</span>
                </button>

                <button
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                    onToggleHardCopy();
                  }}
                  className={`p-2.5 border flex flex-col items-center justify-center gap-1 transition-all ${
                    hardCopyMode
                      ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                      : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
                  }`}
                >
                  <Printer className="w-4 h-4 text-cyan-300" />
                  <span>B&W SPEC</span>
                </button>
              </div>

              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full border border-cyan-400/60 bg-cyan-500/15 text-white p-2.5 flex items-center justify-between text-xs font-bold"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-300" />
                  <span>LAUNCH DIAGNOSTIC SHELL</span>
                </span>
                <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded font-mono">TTY1</span>
              </button>
            </div>
          </div>

          {/* Mobile Bottom Field Notes Card */}
          <div className="pt-2 border-t border-white/20 pb-2">
            <a
              href="https://blog.armaan404.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="p-3 border border-cyan-400/50 bg-[#082357] text-white block transition-all group"
            >
              <div className="flex items-center justify-between text-[10px] text-cyan-200/80 mb-1">
                <span className="flex items-center gap-1.5 font-bold text-cyan-300">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                  <span>FIELD NOTES</span>
                </span>
                <ExternalLink className="w-3 h-3 text-cyan-300" />
              </div>
              <div className="font-bold text-white text-xs">blog.armaan404.com</div>
              <div className="text-[10px] text-cyan-100/70 mt-0.5">
                Threat detection & recon write-ups
              </div>
            </a>
          </div>
        </div>
      )}

      {/* SLIM DESKTOP LEFT SIDEBAR NAVIGATION */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-56 xl:w-60 z-40 bg-[#071f4d]/98 backdrop-blur-md border-r border-cyan-400/25 flex-col justify-between p-3.5 xl:p-4 select-none font-mono text-xs overflow-y-auto shadow-2xl">
        {/* TOP SECTION: DRAWING TITLE BLOCK */}
        <div className="space-y-2.5 border-b border-white/15 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-cyan-300 animate-pulse inline-block" />
              <span className="text-white font-bold tracking-wider text-xs">
                AM-SEC-2025
              </span>
            </div>
            <span className="text-[9px] border border-cyan-400/40 text-cyan-200 px-1 py-0.2 bg-cyan-950/40 font-bold">
              REV 2.4
            </span>
          </div>

          <div className="space-y-0.5 text-[10px] text-cyan-200/80">
            <div className="text-white font-bold font-sans text-xs">Armaan Mulla</div>
            <div className="text-cyan-200/70 text-[10px] truncate">Cybersecurity & Defense</div>
            <div className="text-[9px] text-cyan-300/60 pt-0.5">19.076° N, 72.877° E</div>
          </div>
        </div>

        {/* MIDDLE SECTION: SLIM SHEETS INDEX */}
        <div className="my-auto py-2 space-y-2">
          <div className="text-[9px] text-cyan-200/60 tracking-wider uppercase border-b border-white/10 pb-1 flex justify-between items-center">
            <span>SHEETS INDEX</span>
            <span className="text-[8px] text-cyan-300 font-bold">LIVE</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSheet === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.id);
                  }}
                  onMouseEnter={playHoverTick}
                  className={`px-2 py-1.5 transition-all flex items-center justify-between text-[11px] rounded-sm ${
                    isActive
                      ? 'border-l-[3px] border-cyan-300 bg-cyan-500/20 text-white font-bold shadow-[inset_0_0_12px_rgba(56,189,248,0.18)] pl-2.5'
                      : 'border-l-[3px] border-transparent text-cyan-100/75 hover:text-white hover:bg-white/5 pl-2'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className={`text-[10px] font-bold ${
                        isActive ? 'text-cyan-300' : 'text-cyan-200/60'
                      }`}
                    >
                      {item.num}.
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_6px_#38BDF8] shrink-0" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Slim Utility Controls */}
          <div className="pt-2 border-t border-white/15 space-y-1.5">
            <div className="grid grid-cols-3 gap-1 text-[9px]">
              {/* CAD Guidelines Toggle */}
              <button
                onClick={() => {
                  const next = !cadOverlay;
                  playCadToggle(next);
                  setCadOverlay(next);
                }}
                onMouseEnter={playHoverTick}
                className={`border p-1 flex items-center justify-center gap-1 transition-all ${
                  cadOverlay
                    ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                    : 'border-white/20 text-cyan-200/70 hover:border-white hover:text-white bg-[#082357]/60'
                }`}
                title="Toggle CAD Guidelines"
              >
                <Crosshair className="w-3 h-3" />
                <span>CAD</span>
              </button>

              {/* Sound Synthesizer Toggle */}
              <button
                onClick={() => {
                  playClick();
                  onToggleSound();
                }}
                onMouseEnter={playHoverTick}
                className={`border p-1 flex items-center justify-center gap-1 transition-all ${
                  soundOn
                    ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                    : 'border-white/20 text-cyan-200/70 hover:border-white hover:text-white bg-[#082357]/60'
                }`}
                title="Toggle Sound Synthesizer"
              >
                {soundOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                <span>{soundOn ? 'SFX' : 'MUTE'}</span>
              </button>

              {/* High-Contrast Hard Copy View for Printing */}
              <button
                onClick={() => {
                  playClick();
                  onToggleHardCopy();
                }}
                onMouseEnter={playHoverTick}
                className={`border p-1 flex items-center justify-center gap-1 transition-all ${
                  hardCopyMode
                    ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                    : 'border-white/20 text-cyan-200/70 hover:border-white hover:text-white bg-[#082357]/60'
                }`}
                title="Toggle High-Contrast B&W Hard Copy View"
              >
                <Printer className="w-3 h-3" />
                <span>B&W SPEC</span>
              </button>
            </div>

            {/* Launch Shell Terminal */}
            <button
              onClick={() => {
                playClick();
                onOpenTerminal();
              }}
              onMouseEnter={playHoverTick}
              className="w-full border border-cyan-400/50 hover:border-cyan-200 bg-cyan-500/15 hover:bg-cyan-400 hover:text-[#0A2A66] text-white p-1.5 transition-all flex items-center justify-between text-[10px] font-bold"
            >
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-cyan-300" />
                <span>DIAGNOSTIC SHELL</span>
              </span>
              <span className="text-[8px] bg-white/20 px-1 rounded font-mono">
                TTY1
              </span>
            </button>
          </div>
        </div>

        {/* BOTTOM SECTION: SLIM REFINED FIELD NOTES CARD */}
        <div className="pt-2.5 border-t border-white/15">
          <a
            href="https://blog.armaan404.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick()}
            onMouseEnter={() => {
              playHoverTick();
              playCardHover();
            }}
            className="p-2.5 border border-cyan-400/40 hover:border-cyan-300 bg-[#082357]/80 hover:bg-[#0e3e8f] transition-all block group relative shadow-md rounded-sm"
          >
            {/* Top row with status beacon */}
            <div className="flex items-center justify-between text-[9px] text-cyan-200/90 mb-1">
              <span className="flex items-center gap-1 font-bold text-cyan-300">
                <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                <span>FIELD NOTES</span>
              </span>
              <span className="flex items-center gap-0.5 text-[8px] text-white font-bold group-hover:translate-x-0.5 transition-transform">
                <span>OPEN</span>
                <ExternalLink className="w-2.5 h-2.5 text-cyan-300" />
              </span>
            </div>

            {/* Main blog address */}
            <div className="font-bold text-white text-[11px] group-hover:text-cyan-200 tracking-wide flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-cyan-300 shrink-0" />
              <span className="truncate">blog.armaan404.com</span>
            </div>

            {/* Quick jump to Sheet 06 */}
            <div className="mt-1.5 pt-1 border-t border-white/10 flex justify-between items-center text-[8px] text-cyan-200/60">
              <span>DISPATCHES</span>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick('#sheet-06', 'sheet-06');
                }}
                className="hover:text-white underline cursor-pointer text-cyan-300"
              >
                GOTO SHEET 06
              </span>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
};
