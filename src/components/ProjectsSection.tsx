import React, { useState } from 'react';
import { ExternalLink, Layers, Terminal, ChevronRight, Activity, Maximize2 } from 'lucide-react';
import { AssemblyData } from '../types';
import { AssemblyDiagram } from './AssemblyDiagram';
import { playClick, playHoverTick, playOpen, playCardHover } from '../utils/sound';
import { SheetRevisionStamp } from './SheetRevisionStamp';

interface ProjectsSectionProps {
  onSelectAssembly: (assembly: AssemblyData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectAssembly }) => {
  const [mobileTab, setMobileTab] = useState<string>('all');
  const assemblies: AssemblyData[] = [
    {
      id: 'asm-01',
      code: 'ASM-01 // PRODUCTION',
      tag: 'ERGODE AUTOMATION',
      title: 'WATS - Workstation Automation & Tracking',
      badge: 'ENTERPRISE PRODUCTION',
      circuitLabel: 'CIRCUIT: ENDPOINT_HEARTBEAT_SCHEDULER',
      circuitStatus: '[ACTIVE TELEMETRY]',
      summary:
        'Web application designed to monitor endpoint hardware and software states in real time across the corporate fleet.',
      details:
        'Centralized command distribution, online/offline status health checks, and scheduled Python script execution without interactive user disruption. Real-time telemetry streams empower engineers to triage anomalies before hardware faults escalate.',
      stack: 'Python / FastAPI / REST / SQLite / Agent Daemon',
      metric: 'ROLE: Core Eng // 200+ Nodes Tracked',
      mitreTechniques: ['T1082 - System Information Discovery', 'T1059.006 - Python Interpreter', 'T1053 - Scheduled Task/Job'],
      sampleLog: `[2026-04-12 10:22:04] WATS-AGENT-094: Heartbeat OK (CPU: 14%, RAM: 58%, Disk: 42GB free)
[2026-04-12 10:22:05] TELEMETRY-BROKER: Packet acknowledged by Central Hub. Sequence 0x4F12.
[2026-04-12 10:22:08] SCHEDULED_TASK: Checking patch compliance level... Compliant (Patch Ring A).`,
    },
    {
      id: 'asm-02',
      code: 'ASM-02 // OFFENSIVE TOOLING',
      tag: 'GITHUB // ACTIVE DEV',
      badgeLink: 'https://github.com/Armaan-z3r0',
      title: 'HackHawk - Reconnaissance Automation',
      badge: 'GITHUB REPO ↗',
      circuitLabel: 'PIPELINE: SUBFINDER → NMAP → NUCLEI ENGINE',
      circuitStatus: '[AUTOMATED DISCOVERY]',
      summary:
        'Modular Python reconnaissance tool orchestrating automated subdomain discovery, comprehensive port enumeration, and vulnerability verification.',
      details:
        'Chains Subfinder, Nuclei, and Nmap with custom parsing pipelines to rapidly reduce time-to-surface for attack vectors. Features regex-based deduplication, passive DNS resolution, and JSON output formatting tailored for red team engagements.',
      stack: 'Python / Subfinder / Nuclei / Nmap / Regex Filters',
      metric: 'STATUS: Active Dev // Open Source',
      mitreTechniques: ['T1596 - Search Open Technical Databases', 'T1595.001 - Active Port Scanning', 'T1595.002 - Vulnerability Scanning'],
      sampleLog: `[+] HackHawk Initialized for Target: target-scope.internal
[*] Stage 1: Running Subfinder (Passive DNS & Cert Transparency)... Found 48 subdomains.
[*] Stage 2: Filtering alive hosts with HTTP probing... 31 responding 200/302.
[*] Stage 3: Port Enumeration (Nmap top 100 ports)... Identified 4 non-standard HTTP listeners.
[!] Stage 4: Nuclei template scan: CVE-2023-XXXX potential exposure flagged on port 8443.`,
    },
    {
      id: 'asm-03',
      code: 'ASM-03 // DEFENSIVE TELEMETRY',
      tag: 'SIMULATION LAB',
      title: 'Azure Sentinel Security Lab',
      badge: 'CLOUD HONEYNET',
      circuitLabel: 'TOPOLOGY: ARC_AGENT → LOG_ANALYTICS → SENTINEL SIEM',
      circuitStatus: '[LIVE HONEYPOT]',
      summary:
        'Dedicated cloud security lab featuring a vulnerable Windows endpoint connected via Azure Arc and Azure Monitor Agent (AMA).',
      details:
        'Practicing live event correlation, KQL rule authoring, alert triage, and MITRE ATT&CK technique detection under simulated adversary conditions. Customized Data Collection Rules (DCR) capturing Event 4624 (Logon), 4625 (Failed Logon), and Sysmon Event 1 (Process Creation).',
      stack: 'Azure Sentinel / KQL / Azure Arc / AMA / Honeynet',
      metric: 'OUTCOME: 40+ Incident Scenarios Triaged',
      mitreTechniques: ['T1078 - Valid Accounts (Brute-Force)', 'T1059.001 - PowerShell Execution', 'T1110.001 - Password Guessing'],
      sampleLog: `SecurityEvent
| where TimeGenerated > ago(1h)
| where EventID == 4625 // Failed logon attempt
| summarize FailedCount = count() by Account, IpAddress, bin(TimeGenerated, 5m)
| where FailedCount > 15
| extend AlertSeverity = "Medium", Category = "CredentialAccess"`,
    },
    {
      id: 'asm-04',
      code: 'ASM-04 // PRODUCTION DEPLOYMENT',
      tag: 'ERGODE OWNERSHIP',
      title: 'EDR Deployment - Single Location',
      badge: 'ZERO DEFECTS',
      circuitLabel: 'ARCHITECTURE: 100% COVERAGE // ISOLATION POLICIES',
      circuitStatus: '[ZERO DEFECTS]',
      summary:
        'Independently owned end-to-end rollout, configuration, sensor health verification, and ongoing telemetry monitoring for an organizational facility.',
      details:
        'Configured strict exclusion boundaries, sensor update rings, behavioral block rules, and validated remediation playbooks for endpoint containment. Maintained continuous operational uptime with zero false-positive service disruptions across critical workstation groups.',
      stack: 'Enterprise EDR / Group Policy / Sysmon / Sensor Rings',
      metric: 'METRIC: 100% Host Enrollment & Audit',
      mitreTechniques: ['T1562.001 - Impair Defenses (EDR Tamper Protection)', 'T1036 - Masquerading', 'T1055 - Process Injection'],
      sampleLog: `[EDR-POLICY-ENGINE] Rule "Prevent-Unauthorized-VSS-Deletion" Triggered on Host WKSTN-MUM-41
[EDR-TELEMETRY] Process 'vssadmin.exe delete shadows /all' spawned by unverified child thread.
[EDR-RESPONSE] Automated Action: Terminate Process + Host Isolated from LAN. Alert escalated to Tier-2 SOC.`,
    },
  ];

  return (
    <section id="sheet-03" className="drawing-sheet p-4 sm:p-10 md:p-12 relative scroll-mt-16 lg:scroll-mt-6">
      <div className="crosshair-corner top-2 left-2" />
      <div className="crosshair-corner top-2 right-2" />
      <div className="crosshair-corner bottom-2 left-2" />
      <div className="crosshair-corner bottom-2 right-2" />

      {/* Sheet Engineering Header */}
      <div className="flex flex-wrap justify-between items-baseline border-b border-white/25 pb-2.5 sm:pb-3 mb-4 sm:mb-8 font-mono gap-2">
        <div>
          <span className="text-xs text-cyan-200/70 block">SUB-ASSEMBLY FABRICATIONS</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            SHEET 03 / ASSEMBLIES
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-xs text-cyan-200/80 tracking-wider">
            EXPLODED VIEW: CLICK SCHEMATIC
          </span>
        </div>
      </div>

      {/* Mobile Assembly Segmented Bar (Eliminates 4-card tall stacking on phones) */}
      <div className="flex lg:hidden gap-1.5 overflow-x-auto pb-2 mb-4 font-mono text-xs select-none">
        <button
          onClick={() => {
            playClick();
            setMobileTab('all');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            mobileTab === 'all'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          ALL (4)
        </button>
        {assemblies.map((asm) => (
          <button
            key={asm.id}
            onClick={() => {
              playClick();
              setMobileTab(asm.id);
            }}
            className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
              mobileTab === asm.id
                ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
            }`}
          >
            {asm.code.split(' // ')[0]}
          </button>
        ))}
      </div>

      {/* 4 Project Assemblies Grid - Full-width on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {assemblies
          .filter((asm) => mobileTab === 'all' || asm.id === mobileTab)
          .map((asm, idx) => (
          <article
            key={asm.id}
            onClick={() => {
              playOpen();
              onSelectAssembly(asm);
            }}
            onMouseEnter={playCardHover}
            className="w-full border border-white/30 bg-[#082357]/70 p-4 sm:p-6 relative group flex flex-col justify-between hover:border-cyan-300/80 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)] transition-all rounded-xs cursor-pointer overflow-hidden"
          >
            {/* Subtle Schematic Scan Background Layer (Reveals and sweeps across on hover) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
              {/* Drafting Sub-Grid Layer */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(56,189,248,0.35) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(56,189,248,0.35) 1px, transparent 1px)
                  `,
                  backgroundSize: '18px 18px',
                }}
              />

              {/* Sweeping Schematic Scan Laser Line & Phosphor Glow */}
              <div className="schematic-scan-beam" />

              {/* Technical Scan Status Identifier */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 font-mono text-[8px] text-cyan-200/90 bg-[#061838]/90 px-1.5 py-0.5 border border-cyan-400/40 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                <span>SCHEMATIC_SCAN</span>
              </div>
            </div>

            <div className="relative z-10">
              {/* Assembly Header */}
              <div className="flex justify-between items-start font-mono text-xs border-b border-white/20 pb-3 mb-3 gap-2">
                <div>
                  <span className="text-cyan-300 font-bold text-[10px] tracking-wider block">{asm.code}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-sans mt-0.5 leading-snug group-hover:text-cyan-200 transition-colors">
                    {asm.title}
                  </h3>
                </div>
                {asm.badgeLink ? (
                  <a
                    href={asm.badgeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    onMouseEnter={playHoverTick}
                    className="border border-cyan-400/50 hover:border-white px-2.5 py-1 text-[10px] bg-cyan-950/40 hover:bg-white hover:text-[#0A2A66] transition-colors flex items-center gap-1 font-bold shrink-0 text-cyan-200 hover:text-[#0A2A66]"
                  >
                    <span>{asm.badge}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="border border-cyan-400/40 px-2 py-0.5 text-[10px] bg-cyan-950/30 text-cyan-200 shrink-0 font-bold">
                    {asm.tag}
                  </span>
                )}
              </div>

              {/* Elevated CAD Blueprint Architecture Schematic */}
              <div
                onClick={() => {
                  playOpen();
                  onSelectAssembly(asm);
                }}
                className="my-3 cursor-pointer group/diagram relative"
              >
                {/* Circuit Label Bar */}
                <div className="text-[10px] font-mono bg-[#071f4d] border border-cyan-400/40 border-b-0 px-3 py-1.5 flex justify-between items-center text-cyan-200">
                  <span className="flex items-center gap-1.5 font-bold truncate">
                    <Activity className="w-3 h-3 text-cyan-300 animate-pulse" />
                    <span>{asm.circuitLabel}</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold shrink-0 text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>{asm.circuitStatus}</span>
                  </span>
                </div>

                {/* High-Fidelity SVG Diagram */}
                <AssemblyDiagram assemblyIndex={idx} />

                {/* Click-to-Inspect Overlay Prompt */}
                <div className="absolute inset-0 bg-[#0A2A66]/60 opacity-0 group-hover/diagram:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-[1px]">
                  <div className="bg-[#071f4d] border border-cyan-300 text-white font-mono text-xs px-3 py-1.5 shadow-xl flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
                    <span className="font-bold">INSPECT SCHEMATIC TELEMETRY</span>
                  </div>
                </div>
              </div>

              {/* Exploded Details */}
              <div className="space-y-2 text-xs text-cyan-100/90 font-sans mt-3">
                <p className="leading-relaxed">{asm.summary}</p>
                <p className="leading-relaxed text-cyan-200/70">{asm.details}</p>
              </div>
            </div>

            {/* Bottom Stack & Drilldown Trigger */}
            <div className="relative z-10 pt-4 mt-4 border-t border-white/15 font-mono text-[11px] space-y-3">
              <div className="flex flex-wrap justify-between text-cyan-200/80 gap-1 text-[10px]">
                <span className="text-cyan-300 font-bold">{asm.stack}</span>
                <span className="text-white font-semibold">{asm.metric}</span>
              </div>

              <button
                onClick={() => {
                  playOpen();
                  onSelectAssembly(asm);
                }}
                onMouseEnter={playHoverTick}
                className="w-full border border-cyan-400/40 hover:border-cyan-200 bg-cyan-500/10 hover:bg-cyan-400 hover:text-[#0A2A66] py-2 px-3 transition-all flex items-center justify-between text-xs font-mono font-bold text-white"
              >
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-300 group-hover:text-[#0A2A66]" />
                  <span>INSPECT TELEMETRY & MITRE SCHEMATIC</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Dynamic Drawing Sheet Revision Stamp */}
      <SheetRevisionStamp sheetId="03" status="VERIFIED" />
    </section>
  );
};
