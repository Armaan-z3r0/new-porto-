import React, { useState } from 'react';
import { Check, Copy, Shield, Target, FileText } from 'lucide-react';
import { playClick, playHoverTick, playCardHover, playSuccessChime } from '../utils/sound';
import { SheetRevisionStamp } from './SheetRevisionStamp';

export const AboutSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const specRows = [
    { label: 'ROLE TARGET', value: 'Cybersecurity Analyst / Security Engineer', highlight: true },
    { label: 'LOCATION', value: 'Mumbai, India (Open to Remote/Reloc)', highlight: false },
    { label: 'EDUCATION', value: 'B.Sc. IT, Mumbai Univ (2022–2025)', highlight: false },
    { label: 'CGPI', value: '8.77 / 10.00', highlight: true },
    { label: 'CERTIFICATION', value: 'Certified Ethical Hacker (CEH)', highlight: true },
    { label: 'DEFENSE FOCUS', value: 'Threat Detection, Endpoint, Telemetry', highlight: false },
    { label: 'OFFENSIVE DRILL', value: 'OSINT, Recon Tooling, Subdomain Enum', highlight: false },
    { label: 'AVAILABILITY', value: 'Immediate // Full-time Deployment', highlight: true },
  ];

  const handleCopySummary = () => {
    playSuccessChime();
    const summary = `Armaan Mulla | Cybersecurity Analyst & Security Engineer
Location: Mumbai, India
Degree: B.Sc. IT, Mumbai University (CGPI: 8.77/10)
Certification: Certified Ethical Hacker (CEH)
Target Roles: Cybersecurity Analyst / Security Engineer / Threat Defense
Contact: armaan.mulla001@gmail.com
Blog: https://blog.armaan404.com/
GitHub: https://github.com/Armaan-z3r0`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="sheet-01" className="drawing-sheet p-4 sm:p-10 md:p-12 relative scroll-mt-16 lg:scroll-mt-6">
      <div className="crosshair-corner top-2 left-2" />
      <div className="crosshair-corner top-2 right-2" />
      <div className="crosshair-corner bottom-2 left-2" />
      <div className="crosshair-corner bottom-2 right-2" />

      {/* Sheet Engineering Header */}
      <div className="flex flex-wrap justify-between items-baseline border-b border-white/25 pb-2.5 sm:pb-3 mb-4 sm:mb-8 font-mono gap-2">
        <div>
          <span className="text-xs text-cyan-200/70 block">SECTION ARCHETYPE: PERSONNEL_METRICS</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            SHEET 01 / SPECIFICATION
          </h2>
        </div>
        <span className="text-xs text-white/60 tracking-wider">TOLERANCE: STRICT // ISO-CALIBRATED</span>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        {/* Left Column: Technical Narrative & Philosophy */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed text-white/90">
          <div className="space-y-3 sm:space-y-4 font-sans text-xs sm:text-sm">
            <p>
              Information Technology graduate with a firm operational grasp on endpoint defense,
              alert triage, and security telemetry. Builds and defends infrastructure systems with
              practical knowledge of incident handling and proactive cyber hygiene.
            </p>
            <p>
              Experienced in engineering Python tooling for real-time monitoring, infrastructure
              automation, and automated attack-surface reconnaissance. Holds Certified Ethical
              Hacker (CEH) accreditation, bridging defensive monitoring workflows with offensive threat
              actor simulation.
            </p>
            <p className="hidden xs:block">
              Targeted at Cybersecurity Analyst, Security Engineering, and Threat Defense positions,
              sustaining an active offensive practice through automated tool development and
              continuous bug bounty and vulnerability research.
            </p>
          </div>

          {/* Blueprint Engineering Callout Quote */}
          <div
            onMouseEnter={playCardHover}
            className="border-l-2 border-white/70 pl-3 sm:pl-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-mono text-cyan-100 bg-white/5 pr-3 sm:pr-4 italic cursor-default transition-colors hover:bg-white/10"
          >
            "Defensive precision requires an intimate familiarity with adversary telemetry."
          </div>

          {/* Operational Principles - 2 Columns on all devices, no mobile stacking */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 font-mono text-xs pt-1 sm:pt-2">
            <div
              onMouseEnter={playCardHover}
              className="border border-white/20 hover:border-white/50 p-2.5 sm:p-3.5 bg-[#082357]/60 space-y-1 sm:space-y-1.5 transition-all"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-[11px] sm:text-xs">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                <span className="truncate">DEFENSE-DEPTH</span>
              </div>
              <p className="text-cyan-100/80 text-[10px] sm:text-[11px] font-sans leading-snug">
                Correlating EDR agent events, firewall logs, and cloud telemetry.
              </p>
            </div>

            <div
              onMouseEnter={playCardHover}
              className="border border-white/20 hover:border-white/50 p-2.5 sm:p-3.5 bg-[#082357]/60 space-y-1 sm:space-y-1.5 transition-all"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-white font-bold text-[11px] sm:text-xs">
                <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300 shrink-0" />
                <span className="truncate">ADVERSARY RECON</span>
              </div>
              <p className="text-cyan-100/80 text-[10px] sm:text-[11px] font-sans leading-snug">
                Emulating red team methodology with automated subdomain scans.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Monospace Specification Table */}
        <div className="lg:col-span-5 font-mono text-xs border border-white/35 bg-[#082357]/80 p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="border-b border-white/25 pb-2.5 flex justify-between items-center font-bold text-white">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-300" />
              <span>PARAMETER AUDIT</span>
            </span>
            <span className="text-[10px] text-cyan-200/70">VAL_TOLERANCE 0.0</span>
          </div>

          <div className="divide-y divide-white/10 space-y-0.5">
            {specRows.map((row) => (
              <div
                key={row.label}
                onMouseEnter={playHoverTick}
                className="flex justify-between py-2 items-center gap-2 hover:bg-white/5 px-1 rounded transition-colors"
              >
                <span className="text-cyan-200/70 text-[11px] shrink-0">{row.label}</span>
                <span
                  className={`text-right font-medium text-[11px] ${
                    row.highlight ? 'text-white font-bold' : 'text-cyan-100'
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Copy Spec Button */}
          <div className="pt-2">
            <button
              onClick={handleCopySummary}
              onMouseEnter={playHoverTick}
              className="w-full border border-white/40 hover:border-white text-white bg-white/10 hover:bg-white hover:text-[#0A2A66] py-2 px-3 transition-all flex items-center justify-center gap-2 font-mono text-xs uppercase font-semibold"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-200" />
                  <span>COPY CANDIDATE SPEC SUMMARY</span>
                </>
              )}
            </button>
          </div>

          {/* Dimension Lines under spec */}
          <div className="pt-2">
            <div className="dim-line-h w-full pt-1.5 flex justify-between text-[10px] text-cyan-200/50 pr-28 sm:pr-32">
              <span>SPEC_VER: 2025.2</span>
              <span>CYBER DEFENSE REGISTRY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Drawing Sheet Revision Stamp */}
      <SheetRevisionStamp sheetId="01" status="CHECKED" />
    </section>
  );
};
