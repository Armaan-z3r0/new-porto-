import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { playClick, playHoverTick } from '../utils/sound';
import { SheetRevisionStamp } from './SheetRevisionStamp';

export const CredentialsSection: React.FC = () => {
  const [activeStamp, setActiveStamp] = useState<string | null>(null);
  const [mobileCredTab, setMobileCredTab] = useState<string>('ceh');

  const credentials = [
    {
      id: 'ceh',
      standard: 'EC-COUNCIL STANDARD',
      header: 'APPROVED // CEH',
      title: 'Certified Ethical Hacker',
      authority: 'EC-Council',
      detail: 'Credential ID: ECC94821037 (Verified)',
      date: 'Issued: November 2024',
      status: 'STAMP: PASSED ASSESSMENT',
      accentColor: 'text-emerald-300',
      competencies: [
        'Network scanning & enumeration',
        'Vulnerability analysis & attack surfaces',
        'Social engineering & malware threats',
        'Web app and wireless security testing',
      ],
    },
    {
      id: 'adis',
      standard: 'ADVANCED CURRICULUM',
      header: 'CERTIFIED // ADIS',
      title: 'Adv. Diploma in Info Security v2',
      authority: 'Comprehensive Cyber Defense Institute',
      detail: 'Comprehensive Cyber Defense & Incident Handling',
      date: 'Issued: 2023',
      status: 'STAMP: CURRICULUM SATISFIED',
      accentColor: 'text-cyan-300',
      competencies: [
        'Endpoint defense architectures',
        'Packet analysis and protocol diagnostics',
        'Security policy authoring & compliance',
        'Host-based containment fundamentals',
      ],
    },
    {
      id: 'degree',
      standard: 'ACADEMIC DEGREE',
      header: 'CONFERRED // B.SC. IT',
      title: 'Bachelor of Science (IT)',
      authority: 'Mumbai University',
      detail: 'Cumulative Grade Point Index: 8.77 / 10.00',
      date: 'Tenure: 2022 - 2025',
      status: 'STAMP: GRADUATE REGISTRY',
      accentColor: 'text-amber-300',
      competencies: [
        'Data structures and algorithms',
        'Computer networks & TCP/IP stack',
        'Relational databases and SQL/KQL',
        'Operating system internals (Linux & Windows)',
      ],
    },
  ];

  return (
    <section id="sheet-05" className="drawing-sheet p-4 sm:p-10 md:p-12 relative scroll-mt-16 lg:scroll-mt-6">
      <div className="crosshair-corner top-2 left-2" />
      <div className="crosshair-corner top-2 right-2" />
      <div className="crosshair-corner bottom-2 left-2" />
      <div className="crosshair-corner bottom-2 right-2" />

      {/* Sheet Engineering Header */}
      <div className="flex flex-wrap justify-between items-baseline border-b border-white/25 pb-2.5 sm:pb-3 mb-3.5 sm:mb-8 font-mono gap-2">
        <div>
          <span className="text-xs text-cyan-200/70 block">STANDARDS COMPLIANCE & ACCREDITATION</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            SHEET 05 / STANDARDS & CREDENTIALS
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-xs text-cyan-200/80 tracking-wider">AUTH: VERIFIED ISSUER</span>
        </div>
      </div>

      {/* Mobile CAD Credential Selector (Eliminates vertical stacking on phones) */}
      <div className="flex sm:hidden gap-1.5 overflow-x-auto pb-2 mb-3.5 font-mono text-xs select-none">
        <button
          onClick={() => {
            playClick();
            setMobileCredTab('ceh');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            mobileCredTab === 'ceh'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          01. CEH (EC-COUNCIL)
        </button>
        <button
          onClick={() => {
            playClick();
            setMobileCredTab('adis');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            mobileCredTab === 'adis'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          02. ADIS (SECURITY)
        </button>
        <button
          onClick={() => {
            playClick();
            setMobileCredTab('degree');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            mobileCredTab === 'degree'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          03. B.SC. IT (DEGREE)
        </button>
        <button
          onClick={() => {
            playClick();
            setMobileCredTab('all');
          }}
          className={`px-2.5 py-1 border text-[11px] whitespace-nowrap transition-all ${
            mobileCredTab === 'all'
              ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
              : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
          }`}
        >
          ALL (3)
        </button>
      </div>

      {/* Stamped Approval Seals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 font-mono text-xs">
        {credentials
          .filter((cred) => mobileCredTab === 'all' || cred.id === mobileCredTab)
          .map((cred) => {
          const isSelected = activeStamp === cred.id || mobileCredTab === cred.id;

          return (
            <div
              key={cred.id}
              onClick={() => {
                playClick();
                setActiveStamp(activeStamp === cred.id ? null : cred.id);
              }}
              onMouseEnter={playHoverTick}
              className={`stamp-badge p-3.5 sm:p-5 flex flex-col justify-between cursor-pointer border-2 border-dashed ${
                isSelected ? 'border-white bg-[#0e3e8f]' : 'border-white/60 hover:border-white'
              }`}
            >
              {/* Seal Header */}
              <div className="border-b border-white/20 pb-1.5 sm:pb-2 text-center">
                <span className="text-[9px] sm:text-[10px] text-cyan-200/70 tracking-widest block">
                  {cred.standard}
                </span>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5 sm:mt-1">
                  {cred.header}
                </div>
              </div>

              {/* Seal Core Details */}
              <div className="my-auto py-2 sm:py-3.5 space-y-1 text-center">
                <p className="font-bold text-white font-sans text-sm sm:text-base leading-snug">
                  {cred.title}
                </p>
                <p className="text-[10px] sm:text-[11px] text-cyan-100/80">{cred.authority}</p>
                <p className={`text-[10px] sm:text-[11px] font-bold ${cred.accentColor}`}>{cred.detail}</p>
                <p className="text-[9px] sm:text-[10px] text-cyan-200/60">{cred.date}</p>
              </div>

              {/* Expanded Competencies */}
              {isSelected && (
                <div className="pt-2 border-t border-white/20 text-left space-y-1.5 my-2 animate-fadeIn text-[11px] font-sans">
                  <span className="text-[10px] font-mono text-cyan-200/70 block font-bold">
                    CORE ACCREDITED SCOPE:
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {cred.competencies.map((c) => (
                      <div key={c} className="flex items-center gap-1.5 text-cyan-100 text-[10.5px] sm:text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seal Stamp Footer */}
              <div className="pt-2.5 sm:pt-3 border-t border-white/20 text-[9px] text-white/70 uppercase tracking-widest text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>{cred.status}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Standards Verification Stamp Mark */}
      <div className="mt-4 sm:mt-8 border border-white/20 p-2.5 sm:p-4 bg-white/5 flex flex-wrap justify-between items-center text-[10px] sm:text-xs font-mono text-cyan-100 gap-2 pr-28 sm:pr-32">
        <span className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />
          <span>CONFIRMED AGAINST REGISTRAR RECORDS</span>
        </span>
        <span className="text-[9px] sm:text-[11px] text-cyan-200/70">SHA256_VERIFIED</span>
      </div>

      {/* Dynamic Drawing Sheet Revision Stamp */}
      <SheetRevisionStamp sheetId="05" status="CONFIRMED" />
    </section>
  );
};
