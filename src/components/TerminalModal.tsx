import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';
import { playClick, playHoverTick, playTelemetryPulse, playTypingTick, playSuccessChime, playOpen, toggleSound, isSoundEnabled } from '../utils/sound';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerHardCopy?: () => void;
}

interface CommandLog {
  id: number;
  type: 'input' | 'output' | 'error';
  content: string | React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  'help',
  'clear',
  'print',
  'hardcopy',
  'audio',
  'sound',
  'scan',
  'whoami',
  'spec',
  'skills',
  'projects',
  'recon',
  'sentinel',
  'certs',
  'contact',
  'exit',
];

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onTriggerHardCopy }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 1,
      type: 'output',
      content: (
        <div className="space-y-1">
          <p className="text-white font-bold tracking-wide">
            ARMAAN MULLA // CYBERSECURITY BLUEPRINT DIAGNOSTIC TERMINAL [v2.4.0]
          </p>
          <p className="text-cyan-200 text-[11px]">
            Type <span className="text-cyan-300 font-bold">help</span>, <span className="text-cyan-300 font-bold">scan</span>, or press{' '}
            <span className="text-white font-bold bg-white/10 px-1 py-0.5 rounded">TAB</span> to view and autocomplete commands.
          </p>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return [];
    return AVAILABLE_COMMANDS.filter((cmd) => cmd.startsWith(trimmed) || cmd.includes(trimmed));
  }, [inputVal]);

  const topSuggestion = suggestions.length > 0 ? suggestions[0] : '';
  const phantomSuffix =
    topSuggestion && inputVal.trim() && topSuggestion.startsWith(inputVal.trim().toLowerCase())
      ? topSuggestion.slice(inputVal.trim().length)
      : '';

  useEffect(() => {
    if (isOpen) {
      playOpen();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setInputVal('');
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLogs: CommandLog[] = [
      ...logs,
      { id: Date.now(), type: 'input', content: `$ ${trimmed}` },
    ];

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();

    playTelemetryPulse();

    switch (command) {
      case 'help':
      case '?':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1.5 text-cyan-100">
              <p className="text-white font-bold tracking-wide">AVAILABLE DIAGNOSTIC ROUTINES:</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">help</span> - List all diagnostic routines</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">scan</span> - Run perimeter port scan and attack surface telemetry</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">whoami</span> - Identity and targeted cybersecurity roles</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">spec</span> - Degree, CGPI, location, tolerance metrics</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">skills</span> - Calibrated capability matrix</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">projects</span> - Security project deployments (WATS, HackHawk, Sentinel, EDR)</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">recon</span> - Simulate HackHawk pipeline execution</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">sentinel</span> - Run simulated KQL rule verification</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">certs</span> - Verify CEH and ADIS accreditation tokens</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">contact</span> - Carrier coordinates and communication links</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">audio</span> - Toggle data center & plotter ambient hum soundscape</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">print</span> - High-contrast black and white Hard Copy print view</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">clear</span> - Purge terminal scrollback</p>
              <p><span className="text-cyan-300 w-24 inline-block font-mono font-bold">exit</span> - Close diagnostic shell</p>
            </div>
          ),
        });
        break;

      case 'scan':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1 text-cyan-200">
              <p className="text-white font-bold">[SCAN-ENGINE] Initiating surface perimeter port scan...</p>
              <p>[*] Probing target: armaan.sec.internal (TCP Ports 1-1024)</p>
              <p>[OK] Port 22/tcp (SSH) - Filtered / Hardened Key-Only Auth</p>
              <p>[OK] Port 80/tcp (HTTP) - Open (301 Permanent Redirect to HTTPS)</p>
              <p>[OK] Port 443/tcp (HTTPS) - Open (TLS 1.3 Active, Strong Cipher Suite)</p>
              <p>[+] Perimeter status: 0 critical vulnerabilities, 0 rogue listeners flagged.</p>
            </div>
          ),
        });
        break;

      case 'whoami':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1">
              <p className="text-white font-bold">OPERATOR: Armaan Mulla</p>
              <p>ROLE: Cybersecurity Analyst / Security Engineer</p>
              <p>DISCIPLINE: Threat Detection, Endpoint Defense & Offensive Reconnaissance</p>
              <p>LOCATION: Mumbai, India (Ready for immediate global deployment)</p>
            </div>
          ),
        });
        break;

      case 'spec':
      case 'about':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1">
              <p>DEGREE: B.Sc. IT (Mumbai University, 2022–2025)</p>
              <p>CGPI: 8.77 / 10.00 (High Distinction)</p>
              <p>CERTIFICATION: Certified Ethical Hacker (CEH) - EC-Council</p>
              <p>INFRASTRUCTURE: Linux (Arch/NixOS), Windows Server, Puppet Automation</p>
            </div>
          ),
        });
        break;

      case 'skills':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1">
              <p className="text-white font-bold">CAPABILITY MATRIX:</p>
              <p>[CAL-94] Reconnaissance & OSINT Automation</p>
              <p>[CAL-93] Python (FastAPI, Networking, Tooling)</p>
              <p>[CAL-92] Threat Detection & Incident Handling</p>
              <p>[CAL-90] EDR Deployment & Management</p>
              <p>[CAL-88] MITRE ATT&CK Framework Mapping</p>
              <p>[CAL-86] Microsoft Azure Sentinel & KQL</p>
              <p>[CAL-85] Incident Response Lifecycle & Containment</p>
            </div>
          ),
        });
        break;

      case 'projects':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1">
              <p><span className="text-cyan-300 font-bold">PROJ-01: WATS</span> - Workstation Automation & Tracking (FastAPI, Agent Daemon)</p>
              <p><span className="text-cyan-300 font-bold">PROJ-02: HackHawk</span> - Recon Automation (Subfinder, Nuclei, Nmap)</p>
              <p><span className="text-cyan-300 font-bold">PROJ-03: Sentinel Lab</span> - Azure Arc + AMA Honeynet & KQL Hunting</p>
              <p><span className="text-cyan-300 font-bold">PROJ-04: EDR Deployment</span> - 100% Host Enrollment & Policy Isolation</p>
            </div>
          ),
        });
        break;

      case 'recon':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1 text-cyan-200">
              <p>[*] Initializing HackHawk Recon Daemon...</p>
              <p>[*] Enumerating subdomains via Certificate Transparency & Passive DNS...</p>
              <p>[+] 38 unique hosts identified. Probing active HTTP listeners...</p>
              <p>[*] Port scan: Ports 80, 443, 8443, 8080 open.</p>
              <p>[+] Pipeline finished. Zero critical CVE disclosures in sample scope.</p>
            </div>
          ),
        });
        break;

      case 'sentinel':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1 text-cyan-200">
              <p>[KQL-TEST] Query: SecurityEvent | where EventID == 4625 | summarize count() by bin(TimeGenerated, 5m)</p>
              <p>[AMA-STREAM] Connecting to Log Analytics Workspace 'la-sentinel-lab'...</p>
              <p>[CORRELATION] 24 failed logon bursts detected from 192.168.1.104 -&gt; Alert Triggered: Brute Force Attempt.</p>
            </div>
          ),
        });
        break;

      case 'certs':
      case 'credentials':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1">
              <p>[OK] Certified Ethical Hacker (CEH) - EC-Council (Nov 2024)</p>
              <p>[OK] Adv. Diploma in Info Security v2 - Verified (2023)</p>
              <p>[OK] B.Sc. Information Technology - Mumbai University (CGPI 8.77/10)</p>
            </div>
          ),
        });
        break;

      case 'contact':
        playSuccessChime();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1">
              <p>EMAIL: armaan.mulla001@gmail.com</p>
              <p>GITHUB: https://github.com/Armaan-z3r0</p>
              <p>LINKEDIN: https://www.linkedin.com/in/armaan-mulla-0322b12a1</p>
              <p>BLOG: https://blog.armaan404.com/</p>
            </div>
          ),
        });
        break;

      case 'audio':
      case 'sound':
      case 'hum': {
        playSuccessChime();
        const nextState = toggleSound();
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1 text-cyan-200">
              <p className="text-white font-bold">[AUDIO-SUBSYSTEM] Ambient Soundscape Engine</p>
              <p>
                STATUS:{' '}
                <span className={nextState ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {nextState ? 'ACTIVE // DATA CENTER & PLOTTER HUM ENGAGED' : 'MUTED // SOUNDSCAPE DISENGAGED'}
                </span>
              </p>
              <p className="text-cyan-300/80">
                PROFILE: 60Hz/120Hz Transformer Hum + Modulated Cooling Fan Airflow + Stepper Motor Micro-Resonance.
              </p>
            </div>
          ),
        });
        break;
      }

      case 'print':
      case 'hardcopy': {
        playSuccessChime();
        if (onTriggerHardCopy) {
          onTriggerHardCopy();
        }
        newLogs.push({
          id: Date.now() + 1,
          type: 'output',
          content: (
            <div className="space-y-1 text-cyan-200">
              <p className="text-white font-bold">[PRINT-SUBSYSTEM] High-Contrast Hard Copy Specification Engaged</p>
              <p>STATUS: <span className="text-emerald-400 font-bold">READY FOR PHYSICAL PLOTTER / PRINTER</span></p>
              <p className="text-cyan-300/80">Extraneous UI controls suppressed • Crisp black drafting ink on pure white vellum activated.</p>
              <p className="text-white">Use browser print (Ctrl+P / Cmd+P) to output physical sheets or PDF. Press ESC to return to blueprint shell.</p>
            </div>
          ),
        });
        break;
      }

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        setInputVal('');
        onClose();
        return;

      default:
        newLogs.push({
          id: Date.now() + 1,
          type: 'error',
          content: `Command not recognized: '${trimmed}'. Type 'help' or press TAB for commands menu.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLogs([]);
      setInputVal('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (topSuggestion) {
        setInputVal(topSuggestion);
        playClick();
      }
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex] || '');
        playHoverTick();
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        }
        playHoverTick();
      }
    } else if (e.key === 'Escape') {
      playClick();
      onClose();
    }
  };

  const selectSuggestion = (cmd: string) => {
    playClick();
    setInputVal(cmd);
    inputRef.current?.focus();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0A2A66]/70 backdrop-blur-md animate-fadeIn"
      onClick={() => {
        playClick();
        onClose();
      }}
    >
      <div
        className="w-full max-w-3xl h-[88vh] sm:h-[530px] max-h-[600px] bg-[#0A2A66] border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(14,62,143,0.7)] flex flex-col font-mono text-xs overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blueprint Terminal Header */}
        <div className="bg-[#0e3e8f] px-4 py-2.5 border-b border-cyan-400/30 flex items-center justify-between text-white select-none">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyan-300" />
            <span className="font-bold tracking-wider text-[11px] text-white">
              armaan@sec-blueprint:~ (tty1)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-cyan-200 hidden sm:inline">[PRESS ESC TO EXIT]</span>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              onMouseEnter={playHoverTick}
              className="text-cyan-200 hover:text-white p-1 hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Terminal Screen (Blueprint Navy Blue) */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#082252] cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {logs.map((log) => (
            <div
              key={log.id}
              className={`${
                log.type === 'input'
                  ? 'text-white font-bold'
                  : log.type === 'error'
                  ? 'text-red-400'
                  : 'text-cyan-100 font-mono leading-relaxed'
              }`}
            >
              {log.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Autocomplete Helper Row */}
        {suggestions.length > 0 && inputVal.trim() && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a2f70] border-t border-cyan-400/25 text-[10px] text-cyan-200 overflow-x-auto select-none">
            <span className="text-white/60 font-bold shrink-0">SUGGESTIONS [TAB]:</span>
            {suggestions.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => selectSuggestion(cmd)}
                onMouseEnter={playHoverTick}
                className="border border-cyan-400/40 bg-[#0e4499] hover:bg-cyan-300 hover:text-[#0A2A66] px-2 py-0.5 rounded transition-all font-mono font-medium text-white"
              >
                {cmd}
              </button>
            ))}
          </div>
        )}

        {/* Command Input Prompt Bar */}
        <div className="p-3 bg-[#0B327B] border-t border-cyan-400/30 flex items-center gap-2 relative">
          <span className="text-cyan-300 font-bold text-sm select-none">$</span>

          {/* Interactive input with phantom ghost autocomplete text */}
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => {
                playTypingTick();
                setInputVal(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'clear', 'scan')..."
              className="w-full bg-transparent text-white focus:outline-none font-mono text-xs placeholder-cyan-200/40 relative z-10"
            />
            {phantomSuffix && (
              <span className="absolute left-0 pointer-events-none font-mono text-xs text-cyan-300/40 select-none z-0">
                <span className="opacity-0">{inputVal}</span>
                <span>{phantomSuffix}</span>
              </span>
            )}
          </div>

          <button
            onClick={() => handleCommand(inputVal)}
            onMouseEnter={playHoverTick}
            className="border border-cyan-300/50 hover:border-cyan-200 px-3 py-1 bg-cyan-500/20 hover:bg-cyan-300 hover:text-[#0A2A66] text-[10px] font-bold uppercase transition-all text-white flex items-center gap-1"
          >
            <span>EXEC</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
