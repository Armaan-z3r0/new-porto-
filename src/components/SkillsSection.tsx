import React, { useState } from 'react';
import { Search, ShieldAlert, Network, Terminal, Cpu, CheckCircle2 } from 'lucide-react';
import { playClick, playHoverTick, playTypingTick, playCardHover } from '../utils/sound';
import { SheetRevisionStamp } from './SheetRevisionStamp';

interface SkillItem {
  name: string;
  cal: number;
  code: string;
  evidence: string;
}

interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
}

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: SkillCategory[] = [
    {
      id: 'cat-01',
      title: '01. DETECTION & THREAT DEFENSE',
      subtitle: 'DEFENSIVE ARCHITECTURE',
      icon: ShieldAlert,
      skills: [
        {
          name: 'Threat Detection & Alert Triage / Incident Handling',
          cal: 92,
          code: 'CAL-92',
          evidence: 'Practiced alert categorization, severity ranking, and false positive reduction in enterprise honeynet and production systems.',
        },
        {
          name: 'MITRE ATT&CK Framework Mapping',
          cal: 88,
          code: 'CAL-88',
          evidence: 'Mapping telemetry alerts to adversary tactics (Initial Access T1190, Execution T1059, Persistence T1547).',
        },
        {
          name: 'Incident Response Lifecycle & Containment',
          cal: 85,
          code: 'CAL-85',
          evidence: 'End-to-end familiarity with preparation, detection, containment, eradication, recovery, and post-incident review.',
        },
        {
          name: 'EDR Deployment & Management',
          cal: 90,
          code: 'CAL-90',
          evidence: 'Independently owned organizational endpoint agent rollout with 100% host coverage and isolation policies.',
        },
        {
          name: 'SIEM: Microsoft Azure Sentinel & KQL',
          cal: 86,
          code: 'CAL-86',
          evidence: 'Connected Azure Arc machines, configured AMA data collection rules, and authored custom KQL detection rules.',
        },
      ],
    },
    {
      id: 'cat-02',
      title: '02. OFFENSIVE PRACTICE',
      subtitle: 'RED TEAMING BASIS',
      icon: Network,
      skills: [
        {
          name: 'Reconnaissance & OSINT Automation',
          cal: 94,
          code: 'CAL-94',
          evidence: 'Authored HackHawk Python reconnaissance suite chaining passive & active subdomain discovery pipelines.',
        },
        {
          name: 'Vulnerability Scanning & Assessment',
          cal: 88,
          code: 'CAL-88',
          evidence: 'Templated Nuclei scanning, CVE correlation, and service banner analysis against authorized lab boundaries.',
        },
        {
          name: 'Penetration Testing / Adversary Emulation',
          cal: 80,
          code: 'CAL-80',
          evidence: 'Simulated multi-stage adversary attacks to test host-based detection efficacy and SIEM alert triggering.',
        },
        {
          name: 'Port Enumeration & Attack Surface Mapping',
          cal: 92,
          code: 'CAL-92',
          evidence: 'Nmap timing templates, NSE script tailoring, and perimeter exposed surface footprinting.',
        },
      ],
    },
    {
      id: 'cat-03',
      title: '03. AUTOMATION & CODE',
      subtitle: 'SYSTEM PIPELINES',
      icon: Terminal,
      skills: [
        {
          name: 'Python (FastAPI, Networking, Automation Tooling)',
          cal: 93,
          code: 'CAL-93',
          evidence: 'Engineered WATS endpoint daemon, telemetry receivers, REST APIs, and automated triage workers.',
        },
        {
          name: 'Bash / Shell Scripting & Infrastructure Cron',
          cal: 85,
          code: 'CAL-85',
          evidence: 'Linux administration cronjobs, log rotation watchers, and automated workstation audit scripts.',
        },
        {
          name: 'C Fundamentals (System Memory & Sockets)',
          cal: 72,
          code: 'CAL-72',
          evidence: 'Low-level understanding of pointers, stack layouts, buffer protections, and POSIX socket basics.',
        },
      ],
    },
    {
      id: 'cat-04',
      title: '04. INFRASTRUCTURE & TOOLING',
      subtitle: 'OPERATIONAL FABRIC',
      icon: Cpu,
      skills: [
        {
          name: 'Linux Administration (Arch, NixOS, CachyOS)',
          cal: 92,
          code: 'CAL-92',
          evidence: 'Deep systemd service management, kernel log inspection, permissions lockdown, and declarative configs.',
        },
        {
          name: 'Windows Administration & Active Directory GPO',
          cal: 86,
          code: 'CAL-86',
          evidence: 'Registry forensics, Event Viewer XML filtering, Sysmon configuration, and Active Directory foundations.',
        },
        {
          name: 'Puppet Configuration Management',
          cal: 84,
          code: 'CAL-84',
          evidence: 'Built and submitted production-approved infrastructure automation manifests at Ergode.',
        },
        {
          name: 'Azure Arc & Azure Monitor Agent (AMA)',
          cal: 88,
          code: 'CAL-88',
          evidence: 'Hybrid cloud machine enrollment, DCR rules, and centralized Windows security event streaming.',
        },
      ],
    },
  ];

  const infrastructureChips = [
    'Linux (Arch, NixOS, CachyOS)',
    'Windows Administration',
    'Network & AP Administration',
    'Puppet Config Mgmt',
    'IT Asset Lifecycle',
    'Azure Monitor Agent & Arc',
    'Nmap',
    'Subfinder',
    'Nuclei',
    'Git & GitHub CI',
    'Sysmon & Event Viewer',
    'Kusto Query Language (KQL)',
    'FastAPI & SQLite',
    'Wireshark & Packet Capture',
  ];

  return (
    <section id="sheet-02" className="drawing-sheet p-4 sm:p-10 md:p-12 relative scroll-mt-16 lg:scroll-mt-6">
      <div className="crosshair-corner top-2 left-2" />
      <div className="crosshair-corner top-2 right-2" />
      <div className="crosshair-corner bottom-2 left-2" />
      <div className="crosshair-corner bottom-2 right-2" />

      {/* Sheet Engineering Header */}
      <div className="flex flex-wrap justify-between items-baseline border-b border-white/25 pb-2.5 sm:pb-3 mb-4 sm:mb-6 font-mono gap-2">
        <div>
          <span className="text-xs text-cyan-200/70 block">COMPONENT AUDIT & CAPABILITY MATRIX</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            SHEET 02 / BILL OF MATERIALS
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-300 rounded-full animate-ping" />
          <span className="text-xs text-cyan-200/80 tracking-wider">GAUGE CALIBRATION: OPERATIONAL</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 mb-4 sm:mb-8 font-mono">
        <p className="font-sans text-xs sm:text-sm text-cyan-100/90 max-w-2xl leading-relaxed">
          Technical cybersecurity proficiency catalogued as calibrated measurement rulers and operational gauges.
          Evaluated by practical incident response, vulnerability assessment, and infrastructure engineering depth.
        </p>

        {/* Live Filter Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300" />
          <input
            type="text"
            placeholder="Search BOM competencies..."
            value={searchQuery}
            onFocus={playCardHover}
            onChange={(e) => {
              playTypingTick();
              setSearchQuery(e.target.value);
            }}
            className="w-full bg-[#082357]/80 border border-white/30 text-white placeholder-cyan-200/50 text-xs pl-8 pr-3 py-1.5 font-mono focus:border-white focus:outline-none"
          />
        </div>
      </div>

      {/* Mobile Category Tab Selector (Eliminates vertical stacking on mobile) */}
      <div className="flex md:hidden gap-1.5 overflow-x-auto pb-2 mb-4 font-mono text-xs select-none">
        <button
          onClick={() => {
            playClick();
            setActiveCategory('all');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          ALL (3)
        </button>
        <button
          onClick={() => {
            playClick();
            setActiveCategory('cat-01');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            activeCategory === 'cat-01'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          01. DEFENSE
        </button>
        <button
          onClick={() => {
            playClick();
            setActiveCategory('cat-02');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            activeCategory === 'cat-02'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          02. OFFENSIVE
        </button>
        <button
          onClick={() => {
            playClick();
            setActiveCategory('cat-03');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            activeCategory === 'cat-03'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          03. SYSTEMS
        </button>
      </div>

      {/* Gauges & Rulers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 font-mono text-xs">
        {categories
          .filter((cat) => activeCategory === 'all' || cat.id === activeCategory)
          .map((category) => {
          const filteredSkills = category.skills.filter(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.code.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (filteredSkills.length === 0 && searchQuery) return null;

          const Icon = category.icon;

          return (
            <div
              key={category.id}
              onMouseEnter={playCardHover}
              className="border border-white/25 p-3.5 sm:p-6 bg-[#082357]/60 space-y-3 sm:space-y-5 transition-all hover:border-white/50"
            >
              {/* Category Header */}
              <div className="flex justify-between items-center border-b border-white/20 pb-2.5 sm:pb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-cyan-300" />
                  <span className="text-white font-bold text-xs sm:text-sm tracking-wider">
                    {category.title}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-cyan-200/70 tracking-wider">
                  {category.subtitle}
                </span>
              </div>

              {/* Skills with Calibrated Measurement Rulers */}
              <div className="space-y-2.5 sm:space-y-4">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => {
                      playClick();
                      setSelectedSkill(skill === selectedSkill ? null : skill);
                    }}
                    onMouseEnter={playHoverTick}
                    className="cursor-pointer group p-1 -m-1 rounded hover:bg-white/5 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1 text-[11px]">
                      <span className="text-white/90 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-cyan-200 font-bold group-hover:text-white">
                        {skill.code}
                      </span>
                    </div>

                    {/* Architectural Calibrated Measurement Ruler */}
                    <div className="h-3 border border-white/40 relative overflow-hidden bg-white/5">
                      <div
                        className="h-full bg-cyan-400/50 group-hover:bg-cyan-300/80 transition-all duration-500"
                        style={{ width: `${skill.cal}%` }}
                      />
                      {/* Measurement tick marks */}
                      <div className="absolute inset-0 flex justify-between px-1 text-[8px] text-white/60 pointer-events-none select-none items-center">
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                        <span>|</span>
                      </div>
                    </div>

                    {/* Drill-down field evidence on click / toggle */}
                    {selectedSkill?.name === skill.name && (
                      <div className="mt-2 p-2 border border-white/30 bg-[#0A2A66]/95 text-[11px] font-sans text-cyan-100 leading-normal animate-fadeIn flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-mono text-white text-[10px]">OPERATIONAL EVIDENCE:</strong>{' '}
                          {skill.evidence}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooling Fabric Tag Cloud */}
      <div className="mt-8 border border-white/20 p-5 bg-[#082357]/40 font-mono text-xs space-y-3">
        <div className="flex justify-between items-center border-b border-white/15 pb-2">
          <span className="text-white font-bold tracking-wider text-xs">
            04. EXTENDED TOOLING & SYSTEM RUNTIMES
          </span>
          <span className="text-[10px] text-cyan-200/70">14 ACTIVE MODULES</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1 text-[11px] pr-28 sm:pr-32">
          {infrastructureChips.map((chip) => (
            <span
              key={chip}
              onMouseEnter={playHoverTick}
              className="border border-white/35 px-2.5 py-1 bg-white/5 hover:bg-white hover:text-[#0A2A66] transition-all cursor-default select-none text-cyan-100 hover:font-bold"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Dynamic Drawing Sheet Revision Stamp */}
      <SheetRevisionStamp sheetId="02" status="CALIBRATED" />
    </section>
  );
};
