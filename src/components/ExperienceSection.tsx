import React from 'react';
import { History, Building2, MapPin, CheckCircle2, Calendar } from 'lucide-react';
import { playCardHover, playHoverTick } from '../utils/sound';
import { SheetRevisionStamp } from './SheetRevisionStamp';

export const ExperienceSection: React.FC = () => {
  const revisions = [
    {
      id: 'rev-02',
      code: 'REV 02',
      status: 'PRODUCTION APPROVED',
      statusColor: 'emerald',
      date: 'FEB 2026 - AUG 2026',
      company: 'Ergode',
      role: 'Hardware & Networking Intern',
      location: 'Mumbai, India',
      domain: 'Infrastructure & Automation',
      deliverables: [
        'Resolved complex hardware diagnostics, maintained managed enterprise access points, and oversaw network boundary integrity across operational facilities.',
        'Administered IT asset tracking across equipment lifecycles from initial provisioning and secure baseline configuration to decommissioning.',
        'Designed and deployed a Puppet-based configuration automation project, thoroughly reviewed and approved for organizational infrastructure.',
        'Wrote custom Python automation scripts to monitor system reliability, flag error frequencies, and automate scheduled backups, significantly eliminating manual health-check overhead.',
      ],
      tags: ['Puppet Automation', 'Python Scripting', 'Network Diagnostics', 'Asset Lifecycle', 'Enterprise APs'],
    },
    {
      id: 'rev-01',
      code: 'REV 01',
      status: 'MILESTONE COMPLETED',
      statusColor: 'cyan',
      date: 'AUG 2025 - OCT 2025',
      company: 'Minting Minds',
      role: 'Software Developer Intern',
      location: 'Mumbai, India',
      domain: 'Full-Stack Client Integration',
      deliverables: [
        'Executed ASP.NET front-end integration for live client web applications under agile release schedules.',
        'Debugged component interactions and refined UI/UX behavioral consistency alongside senior engineering staff.',
        'Participated directly in technical stakeholder sessions evaluating functional client requirements and project scope.',
        'Contributed to code review audits and documentation for production deliverables and staging verification.',
      ],
      tags: ['ASP.NET', 'Frontend Integration', 'UI/UX Consistency', 'Agile Sprints', 'Client Delivery'],
    },
  ];

  return (
    <section id="sheet-04" className="drawing-sheet p-4 sm:p-10 md:p-12 relative scroll-mt-16 lg:scroll-mt-6">
      <div className="crosshair-corner top-2 left-2" />
      <div className="crosshair-corner top-2 right-2" />
      <div className="crosshair-corner bottom-2 left-2" />
      <div className="crosshair-corner bottom-2 right-2" />

      {/* Sheet Engineering Header */}
      <div className="flex flex-wrap justify-between items-baseline border-b border-white/25 pb-2.5 sm:pb-3 mb-4 sm:mb-8 font-mono gap-2">
        <div>
          <span className="text-xs text-cyan-200/70 block">CHRONOLOGICAL FIELD MODIFICATIONS</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            SHEET 04 / REVISION HISTORY
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <History className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-xs text-cyan-200/80 tracking-wider">FORMAT: ISO_DRAWING_REV</span>
        </div>
      </div>

      {/* 2 Revision Modifications Grid - Full-width on mobile, side-by-side on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 font-mono text-xs">
        {revisions.map((rev) => (
          <article
            key={rev.id}
            onMouseEnter={playCardHover}
            className="w-full border border-white/30 bg-[#082357]/70 p-4 sm:p-6 relative group flex flex-col justify-between hover:border-cyan-300/80 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)] transition-all rounded-xs overflow-hidden"
          >
            {/* Subtle Drafting Sub-Grid Background Layer */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(56,189,248,0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(56,189,248,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />

            <div className="space-y-4 relative z-10">
              {/* Card Header Block */}
              <div className="border-b border-white/20 pb-3 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="border border-white/40 px-2 py-0.5 font-bold text-white bg-white/10 text-xs">
                      {rev.code}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 border ${
                        rev.statusColor === 'emerald'
                          ? 'border-emerald-400/40 text-emerald-300 bg-emerald-950/40'
                          : 'border-cyan-400/40 text-cyan-300 bg-cyan-950/40'
                      }`}
                    >
                      {rev.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-white font-bold tracking-wider flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyan-300 shrink-0" />
                    <span>{rev.date}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                    {rev.company}
                  </h3>
                  <p className="text-cyan-200 text-xs sm:text-sm font-sans font-medium mt-0.5">
                    {rev.role}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[10px] text-cyan-200/70 pt-1 border-t border-white/10 gap-1.5">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-cyan-300 shrink-0" />
                    <span>DOMAIN: {rev.domain}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-300 shrink-0" />
                    <span>{rev.location}</span>
                  </span>
                </div>
              </div>

              {/* Engineering Deliverables / Tasks */}
              <div className="space-y-2 text-cyan-100/90 font-sans text-xs sm:text-sm leading-relaxed">
                <span className="text-[10px] font-mono text-cyan-300/80 font-bold block uppercase tracking-wider">
                  ENGINEERING DELIVERABLES & SCOPE:
                </span>
                <ul className="space-y-2">
                  {rev.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-300 font-bold font-mono mt-0.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer Tech Tags */}
            <div className="pt-3 sm:pt-4 mt-4 border-t border-white/15 flex flex-wrap gap-1.5 font-mono text-[10px] relative z-10">
              {rev.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 border border-white/20 bg-white/5 text-cyan-200/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* Engineering Compliance Footnote */}
      <div className="mt-4 pt-2 border-t border-white/15 flex flex-wrap justify-between text-[11px] font-mono text-cyan-200/70 pr-28 sm:pr-32">
        <span>ALL FIELD REVISIONS AUDITED UNDER SUPERVISED ENGINEERING OVERSIGHT</span>
        <span>VERIFIED BY TECHNICAL LEADERSHIP</span>
      </div>

      {/* Dynamic Drawing Sheet Revision Stamp */}
      <SheetRevisionStamp sheetId="04" status="AUDITED" />
    </section>
  );
};
