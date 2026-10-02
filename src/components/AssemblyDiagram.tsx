import React from 'react';

interface AssemblyDiagramProps {
  assemblyIndex: number;
}

export const AssemblyDiagram: React.FC<AssemblyDiagramProps> = ({ assemblyIndex }) => {
  return (
    <div className="w-full h-44 sm:h-48 relative overflow-hidden bg-[#061838] border border-cyan-400/30 rounded-xs select-none">
      {/* Background CAD Coordinate Grid with Grid Labels */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(56,189,248,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56,189,248,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Axis Reference Identifiers */}
      <div className="absolute top-1 left-2 text-[7px] font-mono text-cyan-300/40 pointer-events-none flex gap-6">
        <span>X.01</span>
        <span>X.02</span>
        <span>X.03</span>
        <span>X.04</span>
      </div>
      <div className="absolute bottom-1 right-2 text-[7px] font-mono text-cyan-300/40 pointer-events-none">
        REF: SCHEMATIC_DWG_REV2
      </div>

      {/* ========================================================
          DIAGRAM 0: WATS - Centralized Telemetry & Fleet Heartbeat
          ======================================================== */}
      {assemblyIndex === 0 && (
        <svg
          className="w-full h-full"
          viewBox="0 0 540 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="watsTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glowWats" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Coordinate Bus Lines with Chamfered 45deg Corners */}
          <path
            d="M 125 55 L 170 55 L 195 90 L 230 90"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          <path
            d="M 125 125 L 170 125 L 195 90 L 230 90"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          <path
            d="M 330 90 L 370 90 L 390 55 L 425 55"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.6"
          />
          <path
            d="M 330 90 L 370 90 L 390 125 L 425 125"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.6"
          />

          {/* Heartbeat Sine Waveform behind Central Hub */}
          <path
            d="M 235 155 Q 245 155 250 145 T 260 165 T 270 140 T 280 170 T 290 155 L 325 155"
            stroke="#38BDF8"
            strokeWidth="1.2"
            opacity="0.35"
            fill="none"
          />
          <text x="280" y="168" fill="#38BDF8" opacity="0.6" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
            HEARTBEAT PULSE: 1.0s
          </text>

          {/* Animated Telemetry Packets Gliding on Traces */}
          <circle r="3" fill="#FFFFFF" filter="url(#glowWats)">
            <animateMotion
              path="M 125 55 L 170 55 L 195 90 L 230 90"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#38BDF8" filter="url(#glowWats)">
            <animateMotion
              path="M 125 125 L 170 125 L 195 90 L 230 90"
              dur="2.8s"
              begin="0.7s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#38BDF8" filter="url(#glowWats)">
            <animateMotion
              path="M 330 90 L 370 90 L 390 55 L 425 55"
              dur="2.2s"
              begin="0.3s"
              repeatCount="indefinite"
            />
          </circle>
          <circle r="3" fill="#FFFFFF" filter="url(#glowWats)">
            <animateMotion
              path="M 330 90 L 370 90 L 390 125 L 425 125"
              dur="2.5s"
              begin="1.2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* NODE 1: WORKSTATION POD A */}
          <g transform="translate(25, 30)">
            <rect width="100" height="48" rx="2" fill="#0A2A66" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="0" y="0" width="100" height="12" fill="#1145A3" />
            <text x="8" y="9" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">
              ENDPOINT: WKSTN-01..99
            </text>
            <text x="8" y="24" fill="#38BDF8" fontSize="7.5" fontFamily="monospace">
              DAEMON // OS METRICS
            </text>
            <text x="8" y="38" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace">
              CPU: 14% | RAM: 58%
            </text>
            <circle cx="90" cy="6" r="2.5" fill="#34D399" />
          </g>

          {/* NODE 2: WORKSTATION POD B */}
          <g transform="translate(25, 102)">
            <rect width="100" height="48" rx="2" fill="#0A2A66" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="0" y="0" width="100" height="12" fill="#1145A3" />
            <text x="8" y="9" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">
              ENDPOINT: WKSTN-100..200+
            </text>
            <text x="8" y="24" fill="#38BDF8" fontSize="7.5" fontFamily="monospace">
              HEARTBEAT AGENT
            </text>
            <text x="8" y="38" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace">
              STATUS: SYNCED [OK]
            </text>
            <circle cx="90" cy="6" r="2.5" fill="#34D399" />
          </g>

          {/* NODE 3: CENTRAL FASTAPI HUB & SCHEDULER (CORE IC PROCESSOR) */}
          <g transform="translate(230, 45)">
            {/* IC Package Pin Legs */}
            <line x1="-6" y1="20" x2="0" y2="20" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="-6" y1="45" x2="0" y2="45" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="-6" y1="70" x2="0" y2="70" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="100" y1="20" x2="106" y2="20" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="100" y1="45" x2="106" y2="45" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="100" y1="70" x2="106" y2="70" stroke="#FFFFFF" strokeWidth="1.5" />

            <rect width="100" height="90" rx="3" fill="#082357" stroke="#FFFFFF" strokeWidth="1.8" filter="url(#glowWats)" />
            <rect x="0" y="0" width="100" height="16" fill="#0A2A66" />
            <text x="50" y="11" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              WATS CORE BROKER
            </text>
            <text x="50" y="32" fill="#38BDF8" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              FASTAPI ENGINE
            </text>
            <text x="50" y="47" fill="#FFFFFF" opacity="0.85" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              REST TELEMETRY
            </text>
            <text x="50" y="60" fill="#FFFFFF" opacity="0.85" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              NON-BLOCKING QUEUE
            </text>
            <line x1="12" y1="68" x2="88" y2="68" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
            <text x="50" y="80" fill="#34D399" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              200+ NODES HEALTHY
            </text>
          </g>

          {/* NODE 4: AUTOMATED SCRIPT EXECUTOR */}
          <g transform="translate(425, 30)">
            <rect width="90" height="48" rx="2" fill="#0A2A66" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="0" y="0" width="90" height="12" fill="#1145A3" />
            <text x="6" y="9" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">
              EXEC DISPATCH
            </text>
            <text x="6" y="24" fill="#38BDF8" fontSize="7" fontFamily="monospace">
              PYTHON RUNNER
            </text>
            <text x="6" y="38" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace">
              NON-INTRUSIVE JOB
            </text>
            <circle cx="82" cy="6" r="2.5" fill="#38BDF8" />
          </g>

          {/* NODE 5: SQLITE TELEMETRY AUDIT REPO */}
          <g transform="translate(425, 102)">
            <rect width="90" height="48" rx="2" fill="#0A2A66" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="0" y="0" width="90" height="12" fill="#1145A3" />
            <text x="6" y="9" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold">
              STATE DATABASE
            </text>
            <text x="6" y="24" fill="#38BDF8" fontSize="7" fontFamily="monospace">
              SQLITE TELEMETRY
            </text>
            <text x="6" y="38" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace">
              HISTORICAL LOGS
            </text>
            <circle cx="82" cy="6" r="2.5" fill="#38BDF8" />
          </g>
        </svg>
      )}

      {/* ========================================================
          DIAGRAM 1: HackHawk - Reconnaissance Automation Pipeline
          ======================================================== */}
      {assemblyIndex === 1 && (
        <svg
          className="w-full h-full"
          viewBox="0 0 540 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glowHawk" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="scanBeam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Sequential Pipeline Flow Arrows */}
          <path
            d="M 105 90 L 140 90"
            stroke="#38BDF8"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
          <path
            d="M 235 90 L 270 90"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <path
            d="M 365 90 L 400 90"
            stroke="#38BDF8"
            strokeWidth="2"
          />

          {/* Moving Reconnaissance Packet along Pipeline */}
          <circle r="3.5" fill="#FFFFFF" filter="url(#glowHawk)">
            <animateMotion
              path="M 30 90 L 510 90"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Vertical Laser Scan Line Animation */}
          <line x1="0" y1="10" x2="0" y2="170" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6">
            <animate
              attributeName="x1"
              values="30; 510; 30"
              dur="5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              values="30; 510; 30"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>

          {/* STAGE 0: TARGET SPECIFICATION */}
          <g transform="translate(15, 55)">
            <rect width="90" height="70" rx="3" fill="#0A2A66" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="0" y="0" width="90" height="14" fill="#1145A3" />
            <text x="45" y="10" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              TARGET INPUT
            </text>
            <text x="45" y="30" fill="#FFFFFF" fontSize="7" fontFamily="monospace" textAnchor="middle">
              *.domain.com
            </text>
            <text x="45" y="44" fill="#38BDF8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              SCOPE BOUNDARY
            </text>
            <text x="45" y="58" fill="#34D399" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              [WILDCARD]
            </text>
          </g>

          {/* STAGE 1: SUBFINDER ENGINE */}
          <g transform="translate(140, 50)">
            <rect width="95" height="80" rx="3" fill="#082357" stroke="#FFFFFF" strokeWidth="1.6" filter="url(#glowHawk)" />
            <rect x="0" y="0" width="95" height="16" fill="#0A2A66" />
            <text x="47" y="11" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              STAGE 01: SUBFINDER
            </text>
            <text x="47" y="32" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              PASSIVE ENUM
            </text>
            <text x="47" y="46" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              DNS + CRT.SH
            </text>
            <text x="47" y="60" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              DEDUPLICATION
            </text>
            <text x="47" y="73" fill="#34D399" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              FOUND: 48 HOSTS
            </text>
          </g>

          {/* STAGE 2: NMAP PORT & SERVICE PROBE */}
          <g transform="translate(270, 50)">
            <rect width="95" height="80" rx="3" fill="#082357" stroke="#FFFFFF" strokeWidth="1.6" filter="url(#glowHawk)" />
            <rect x="0" y="0" width="95" height="16" fill="#0A2A66" />
            <text x="47" y="11" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              STAGE 02: NMAP
            </text>
            <text x="47" y="32" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              PORT SCANNER
            </text>
            <text x="47" y="46" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              TOP 100 PORTS
            </text>
            <text x="47" y="60" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              SERVICE FINGERPRINT
            </text>
            <text x="47" y="73" fill="#34D399" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              ALIVE: 31 ACTIVE
            </text>
          </g>

          {/* STAGE 3: NUCLEI VULNERABILITY AUDIT & JSON EXPORT */}
          <g transform="translate(400, 50)">
            <rect width="105" height="80" rx="3" fill="#082357" stroke="#38BDF8" strokeWidth="1.6" />
            <rect x="0" y="0" width="105" height="16" fill="#1145A3" />
            <text x="52" y="11" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              STAGE 03: NUCLEI
            </text>
            <text x="52" y="32" fill="#F87171" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              CVE VERIFICATION
            </text>
            <text x="52" y="46" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              COMMUNITY TEMPLATES
            </text>
            <text x="52" y="60" fill="#FFFFFF" opacity="0.8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              PARSED JSON STREAM
            </text>
            <text x="52" y="73" fill="#38BDF8" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              SURFACE MAP [READY]
            </text>
          </g>
        </svg>
      )}

      {/* ========================================================
          DIAGRAM 2: Azure Sentinel Security Lab - Cloud SIEM Topology
          ======================================================== */}
      {assemblyIndex === 2 && (
        <svg
          className="w-full h-full"
          viewBox="0 0 540 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glowSentinel" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cloud Perimeter Boundary Dashed Box */}
          <rect
            x="160"
            y="25"
            width="360"
            height="135"
            rx="4"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="6 3"
            opacity="0.4"
          />
          <text x="175" y="40" fill="#38BDF8" opacity="0.8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            AZURE CLOUD TENANT // HYBRID ENVIRONMENT
          </text>

          {/* Connection Traces */}
          <path
            d="M 125 95 L 180 95"
            stroke="#F87171"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <path
            d="M 285 95 L 340 95"
            stroke="#38BDF8"
            strokeWidth="2"
          />

          {/* Telemetry packet from Honeynet */}
          <circle r="3.5" fill="#F87171" filter="url(#glowSentinel)">
            <animateMotion
              path="M 125 95 L 180 95"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Telemetry packet from Ingestion to Sentinel */}
          <circle r="3.5" fill="#38BDF8" filter="url(#glowSentinel)">
            <animateMotion
              path="M 285 95 L 340 95"
              dur="1.8s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* COMPONENT 1: VULNERABLE HYBRID HONEYPOT (WINDOWS 11 + ARC) */}
          <g transform="translate(20, 50)">
            <rect width="105" height="85" rx="3" fill="#082357" stroke="#F87171" strokeWidth="1.6" />
            <rect x="0" y="0" width="105" height="16" fill="#7F1D1D" />
            <text x="52" y="11" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              HONEYPOT ENDPOINT
            </text>
            <text x="52" y="32" fill="#FCA5A5" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              WIN11 + AZURE ARC
            </text>
            <text x="52" y="46" fill="#FFFFFF" opacity="0.85" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              AMA AGENT ACTIVE
            </text>
            <text x="52" y="60" fill="#FFFFFF" opacity="0.85" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              EVENT 4625 SPIKE
            </text>
            <text x="52" y="74" fill="#F87171" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              BRUTE FORCE SIM
            </text>
          </g>

          {/* COMPONENT 2: DATA COLLECTION RULE & LOG ANALYTICS */}
          <g transform="translate(180, 55)">
            <rect width="105" height="78" rx="3" fill="#0A2A66" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="0" y="0" width="105" height="15" fill="#1145A3" />
            <text x="52" y="11" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              LOG ANALYTICS
            </text>
            <text x="52" y="30" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              DCR DATA PIPELINE
            </text>
            <text x="52" y="44" fill="#FFFFFF" opacity="0.85" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              SecurityEvent TABLE
            </text>
            <text x="52" y="58" fill="#FFFFFF" opacity="0.85" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              Sysmon Event 1
            </text>
            <text x="52" y="71" fill="#34D399" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              INGESTION: LIVE
            </text>
          </g>

          {/* COMPONENT 3: MICROSOFT SENTINEL SIEM ANALYTICS RULE */}
          <g transform="translate(340, 48)">
            <rect width="165" height="92" rx="3" fill="#082357" stroke="#FFFFFF" strokeWidth="1.8" filter="url(#glowSentinel)" />
            <rect x="0" y="0" width="165" height="16" fill="#0A2A66" />
            <text x="82" y="11" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              MICROSOFT SENTINEL SIEM
            </text>
            <text x="82" y="32" fill="#38BDF8" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              KQL CORRELATION ENGINE
            </text>
            <text x="82" y="46" fill="#FFFFFF" opacity="0.9" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              `where EventID == 4625 | summarize`
            </text>
            <text x="82" y="59" fill="#FFFFFF" opacity="0.9" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              THRESHOLD: &gt;15 FAILED LOGONS / 5m
            </text>
            <line x1="15" y1="67" x2="150" y2="67" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
            <text x="82" y="80" fill="#F87171" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              INCIDENT #404: ALERT TRIAGED [OK]
            </text>
          </g>
        </svg>
      )}

      {/* ========================================================
          DIAGRAM 3: EDR Deployment - Single Location Architecture
          ======================================================== */}
      {assemblyIndex === 3 && (
        <svg
          className="w-full h-full"
          viewBox="0 0 540 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glowEdr" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Defense Shield Perimeter Boundary */}
          <circle
            cx="145"
            cy="90"
            r="65"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="4 3"
            opacity="0.5"
          />
          <circle
            cx="145"
            cy="90"
            r="75"
            stroke="#34D399"
            strokeWidth="1"
            opacity="0.3"
          />
          <text x="145" y="172" fill="#38BDF8" opacity="0.8" fontSize="7" fontFamily="monospace" textAnchor="middle">
            LOCAL DEFENSE PERIMETER // 100% ENROLLED
          </text>

          {/* Connection to Central Cloud Console */}
          <path
            d="M 220 90 L 320 90"
            stroke="#34D399"
            strokeWidth="2"
          />

          {/* Telemetry packet from Local Sensors to Console */}
          <circle r="3.5" fill="#34D399" filter="url(#glowEdr)">
            <animateMotion
              path="M 220 90 L 320 90"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* LOCAL WORKSTATIONS & SENSORS */}
          <g transform="translate(70, 48)">
            <rect width="150" height="85" rx="3" fill="#082357" stroke="#38BDF8" strokeWidth="1.6" />
            <rect x="0" y="0" width="150" height="15" fill="#1145A3" />
            <text x="75" y="11" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              LOCAL FACILITY HOSTS (100%)
            </text>
            <text x="75" y="30" fill="#38BDF8" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              EDR SENSOR RING A / B
            </text>
            <text x="75" y="44" fill="#FFFFFF" opacity="0.85" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              KERNEL DRIVER TAMPER PROOF
            </text>
            <text x="75" y="58" fill="#FFFFFF" opacity="0.85" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              BEHAVIORAL BLOCK: VSS PROTECTION
            </text>
            <text x="75" y="73" fill="#34D399" fontSize="6.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              ZERO FALSE POSITIVE TRIPS
            </text>
          </g>

          {/* CENTRAL EDR CLOUD CONSOLE */}
          <g transform="translate(320, 42)">
            <rect width="190" height="96" rx="3" fill="#082357" stroke="#FFFFFF" strokeWidth="1.8" filter="url(#glowEdr)" />
            <rect x="0" y="0" width="190" height="16" fill="#0A2A66" />
            <text x="95" y="11" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              ENTERPRISE EDR CLOUD CONSOLE
            </text>
            <text x="95" y="32" fill="#34D399" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              FLEET TELEMETRY & POLICY ENGINE
            </text>
            <text x="95" y="46" fill="#FFFFFF" opacity="0.9" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              UPDATE RINGS // CONTROLLED ROLLOUT
            </text>
            <text x="95" y="59" fill="#FFFFFF" opacity="0.9" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              INSTANT NETWORK ISOLATION CAPABILITY
            </text>
            <line x1="20" y1="67" x2="170" y2="67" stroke="#38BDF8" strokeWidth="0.8" opacity="0.5" />
            <text x="95" y="80" fill="#38BDF8" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              AUDIT STATUS: FULLY ENROLLED (100%)
            </text>
          </g>
        </svg>
      )}
    </div>
  );
};
