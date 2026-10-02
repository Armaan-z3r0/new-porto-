import React from 'react';
import { CURRENT_REVISION } from '../constants/version';

interface SheetRevisionStampProps {
  sheetId: string; // e.g. "00", "01", "02", "03", "04", "05", "06", "07"
  revision?: string; // defaults to CURRENT_REVISION (e.g. "REV: 1.0.4")
  status?: string; // e.g. "VERIFIED", "APPROVED", "CALIBRATED"
}

/**
 * Dynamic CAD/ISO Engineering Revision Stamp rendered in the bottom-right corner
 * of each Drawing Sheet component.
 */
export const SheetRevisionStamp: React.FC<SheetRevisionStampProps> = ({
  sheetId,
  revision = CURRENT_REVISION,
  status = 'CHECKED',
}) => {
  return (
    <div
      className="sheet-rev-stamp absolute bottom-2.5 right-4 sm:right-6 z-20 pointer-events-none select-none print:bottom-1 print:right-3"
      aria-label={`Drawing Sheet ${sheetId} ${revision}`}
    >
      <div className="border border-cyan-400/50 bg-[#061838]/95 px-2 py-0.5 font-mono text-[9px] sm:text-[10px] flex items-center gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.2)] text-cyan-200 backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
        <span className="font-bold text-white tracking-wider">{revision}</span>
        <span className="text-cyan-300/80 hidden xs:inline">// SH-{sheetId}</span>
        <span className="text-[8px] bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 px-1 py-0.2 hidden sm:inline font-semibold">
          {status}
        </span>
      </div>
    </div>
  );
};
