import React from 'react';

/**
 * Faint, repeating watermark layer across the background blueprint grid
 * Displays "BLUEPRINT DRAFT // REDACTED" and technical drawing registration marks.
 * Only visible when not in Hard Copy mode.
 */
export const BlueprintWatermark: React.FC = () => {
  return (
    <div
      className="blueprint-watermark-layer fixed inset-0 pointer-events-none z-0 select-none overflow-hidden print:hidden"
      aria-hidden="true"
    >
      <svg className="w-full h-full opacity-[0.038]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="blueprint-watermark-pattern"
            width="420"
            height="260"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-25)"
          >
            {/* Primary Watermark Text */}
            <text
              x="20"
              y="60"
              fill="#38BDF8"
              fontSize="18"
              fontFamily="monospace"
              fontWeight="900"
              letterSpacing="0.22em"
            >
              BLUEPRINT DRAFT // REDACTED
            </text>

            {/* Classification Guideline */}
            <line
              x1="18"
              y1="75"
              x2="380"
              y2="75"
              stroke="#38BDF8"
              strokeWidth="1"
              strokeDasharray="6 4"
            />

            {/* Secondary Restricted Notice */}
            <text
              x="30"
              y="170"
              fill="#FFFFFF"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="0.28em"
            >
              RESTRICTED SPEC // DWG AM-SEC-2025
            </text>

            {/* Security Mark Stamp */}
            <rect
              x="20"
              y="145"
              width="360"
              height="40"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-watermark-pattern)" />
      </svg>
    </div>
  );
};
