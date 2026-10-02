import React from 'react';
import { ExternalLink, BookOpen, ArrowUpRight, Clock, Tag, Radio, FileCode2 } from 'lucide-react';
import { playClick, playHoverTick, playCardHover } from '../utils/sound';
import { SheetRevisionStamp } from './SheetRevisionStamp';

export const BlogSection: React.FC = () => {
  const dispatches = [
    {
      id: 'DISP-04',
      title: 'Dissecting Sysmon Event ID 1 & 3: Correlating Process Creations with Network Sockets',
      date: '2026.03.14',
      tag: 'DETECTION',
      readTime: '6 MIN',
      summary: 'Practical approaches to catching lateral movement and remote payload drops before command-and-control handshakes settle.',
      topics: ['Sysmon EID 1', 'Socket Correlation', 'Parent-Child Trees'],
    },
    {
      id: 'DISP-03',
      title: 'Building HackHawk: Automating Passive & Active Subdomain Enumeration Pipelines',
      date: '2026.02.08',
      tag: 'OFFENSIVE',
      readTime: '8 MIN',
      summary: 'Architecting an asynchronous Python orchestrator across Subfinder, Nmap, and Nuclei with automated JSON deduplication.',
      topics: ['Subfinder', 'Nuclei Automation', 'Async Python'],
    },
    {
      id: 'DISP-02',
      title: 'Lessons from Rolling Out Enterprise EDR to 200+ Production Workstations',
      date: '2025.11.20',
      tag: 'INFRASTRUCTURE',
      readTime: '10 MIN',
      summary: 'Handling sensor ring updates, configuring exclusions for developer environments, and validating automated host isolation.',
      topics: ['EDR Deployment', 'Sensor Rings', 'Host Isolation'],
    },
    {
      id: 'DISP-01',
      title: 'KQL Hunting Queries: Detecting Suspicious Parent-Child Process Spawns in Sentinel',
      date: '2025.09.12',
      tag: 'SIEM / KQL',
      readTime: '5 MIN',
      summary: 'Crafting high-fidelity Kusto queries to spot living-off-the-land binaries (wmic, mshta, certutil) in noisy telemetry.',
      topics: ['Azure Sentinel', 'KQL Syntax', 'LOLBAS Defense'],
    },
  ];

  return (
    <section id="sheet-06" className="drawing-sheet p-4 sm:p-10 md:p-12 relative overflow-hidden scroll-mt-16 lg:scroll-mt-6">
      <div className="crosshair-corner top-2 left-2" />
      <div className="crosshair-corner top-2 right-2" />
      <div className="crosshair-corner bottom-2 left-2" />
      <div className="crosshair-corner bottom-2 right-2" />

      {/* Sheet Engineering Header */}
      <div className="flex flex-wrap justify-between items-baseline border-b border-white/25 pb-2.5 sm:pb-3 mb-4 sm:mb-8 font-mono gap-2">
        <div>
          <span className="text-xs text-cyan-200/70 block">TECHNICAL DISPATCHES // REPOSITORY</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            SHEET 06 / FIELD NOTES
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span className="text-xs text-cyan-200/80 tracking-wider">
            LIVE TRANSMITTER: BLOG.ARMAAN404.COM
          </span>
        </div>
      </div>

      {/* Main Forwarder Callout Block */}
      <div
        onMouseEnter={playCardHover}
        className="border-2 border-white/45 bg-[#082357]/85 p-4 sm:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-8 shadow-2xl relative"
      >
        <div className="space-y-2.5 sm:space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs text-cyan-200 border border-white/20 px-2.5 py-0.5 bg-white/5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="font-bold tracking-wider">DISPATCH REPOSITORY // READ WRITE</span>
          </div>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white font-sans leading-tight">
            Working notes on security, systems and the things learned along the way.
          </h3>

          <p className="font-sans text-xs sm:text-base text-cyan-100/90 leading-relaxed">
            Unfiltered field write-ups covering detection engineering, vulnerability reproduction,
            lab telemetry quirks, and Python automation workflows. Direct from the command line.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-mono text-cyan-200/70 pt-1">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
              <span>4 VERIFIED DISPATCHES</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <FileCode2 className="w-3.5 h-3.5 text-cyan-300" />
              <span>KQL & PYTHON ARTIFACTS</span>
            </span>
            <span>•</span>
            <span>PUBLIC REPO</span>
          </div>
        </div>

        <a
          href="https://blog.armaan404.com/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          onMouseEnter={playHoverTick}
          className="shrink-0 border-2 border-white bg-white text-[#0A2A66] hover:bg-transparent hover:text-white px-5 sm:px-8 py-3 sm:py-4 font-mono font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 sm:gap-3 hover:border-cyan-300 w-full sm:w-auto text-center"
        >
          <span>Open field notes</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Dispatch Previews Grid */}
      <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 font-mono text-xs">
        {dispatches.map((dispatch) => (
          <a
            key={dispatch.id}
            href="https://blog.armaan404.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={() => {
              playHoverTick();
              playCardHover();
            }}
            className="border border-white/25 hover:border-cyan-300 p-3.5 sm:p-5 bg-[#082357]/60 hover:bg-[#082357]/90 transition-all group flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center text-[10px] text-cyan-200/60 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="border border-white/30 text-white px-1.5 py-0.2 text-[9px] font-bold">
                    {dispatch.id}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-300 font-bold">
                    <Tag className="w-3 h-3 text-cyan-300" />
                    <span>{dispatch.tag}</span>
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{dispatch.readTime}</span>
                </span>
              </div>

              <h4 className="font-bold text-white font-sans text-base group-hover:text-cyan-200 transition-colors leading-snug">
                {dispatch.title}
              </h4>

              <p className="font-sans text-xs text-cyan-100/80 leading-relaxed">
                {dispatch.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {dispatch.topics.map((t) => (
                  <span
                    key={t}
                    className="border border-white/15 px-2 py-0.5 text-[10px] bg-white/5 text-cyan-200/80"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex justify-between items-center text-[11px] text-cyan-200/70 group-hover:text-white">
              <span>PUBLISHED {dispatch.date}</span>
              <span className="flex items-center gap-1 font-bold text-cyan-300 group-hover:translate-x-1 transition-transform">
                <span>READ DISPATCH</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Engineering Compliance Footnote */}
      <div className="mt-8 pt-3 border-t border-white/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-cyan-200/70 gap-2 pr-28 sm:pr-32">
        <span>FIELD DISPATCH REPOSITORY // HOSTED AT BLOG.ARMAAN404.COM</span>
        <span>AUTOMATED TELEMETRY DEPLOYMENT // ZERO EXTERNAL TELEMETRY</span>
      </div>

      {/* Dynamic Drawing Sheet Revision Stamp */}
      <SheetRevisionStamp sheetId="06" status="DISPATCHED" />
    </section>
  );
};
