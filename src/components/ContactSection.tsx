import React, { useState } from 'react';
import { Mail, Github, Linkedin, ExternalLink, Send, CheckCircle2, Radio, Copy, Check } from 'lucide-react';
import { Contact3DGlobe } from './Contact3DGlobe';
import { playClick, playHoverTick, playTelemetryPulse, playSuccessChime, playTypingTick, playCardHover } from '../utils/sound';
import { SheetRevisionStamp } from './SheetRevisionStamp';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMode, setMobileMode] = useState<'channels' | 'form' | 'all'>('channels');

  const handleSendDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;

    playTelemetryPulse();
    setStatus('transmitting');

    setTimeout(() => {
      setStatus('sent');
      playSuccessChime();
      const mailtoUri = `mailto:armaan.mulla001@gmail.com?subject=Cybersecurity%20Analyst%20Inquiry%20from%20${encodeURIComponent(
        senderName || 'Recruiter / Engineering Lead'
      )}&body=${encodeURIComponent(`From: ${senderName} (${senderEmail})\n\nMessage:\n${message}`)}`;
      window.open(mailtoUri, '_blank');
    }, 850);
  };

  const handleCopyEmail = () => {
    playSuccessChime();
    navigator.clipboard.writeText('armaan.mulla001@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="sheet-07"
      className="drawing-sheet p-4 sm:p-10 md:p-14 min-h-[70vh] sm:min-h-[85vh] flex flex-col justify-between overflow-hidden relative scroll-mt-16 lg:scroll-mt-6"
    >
      <div className="crosshair-corner top-2 left-2" />
      <div className="crosshair-corner top-2 right-2" />
      <div className="crosshair-corner bottom-2 left-2" />
      <div className="crosshair-corner bottom-2 right-2" />

      {/* Sheet Engineering Header */}
      <div className="flex flex-wrap justify-between items-baseline border-b border-white/25 pb-2.5 sm:pb-3 mb-4 sm:mb-6 font-mono relative z-10 gap-2">
        <div>
          <span className="text-xs text-cyan-200/70 block">CARRIER TRANSMISSION LINK</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            SHEET 07 / TRANSMISSION
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span className="text-xs text-cyan-200/80 tracking-wider">
            TX_ORIGIN: 19.0760 N, 72.8777 E
          </span>
        </div>
      </div>

      {/* Prominent, Clearly Visible 3D Rotating Globe */}
      <Contact3DGlobe />

      {/* Transmission Content */}
      <div className="relative z-10 my-auto py-3 sm:py-6 max-w-4xl space-y-4 sm:space-y-8">
        <div className="border-l-2 border-white pl-3 sm:pl-6 space-y-2 sm:space-y-3">
          <div
            onMouseEnter={playCardHover}
            className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs text-cyan-200 border border-white/30 px-2.5 py-0.5 bg-[#082357]/90 cursor-default"
          >
            <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="tracking-widest">STATUS: READY FOR DEPLOYMENT</span>
          </div>

          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white font-sans leading-tight">
            Open to cybersecurity analyst, threat defense and security engineering roles.
          </h3>

          <p className="font-sans text-xs sm:text-sm text-cyan-100/90 max-w-2xl leading-relaxed">
            Available for immediate deployment in threat detection, security monitoring, incident
            response operations, and defensive engineering. Welcoming Cybersecurity Analyst,
            Incident Response, and Offensive Infrastructure opportunities.
          </p>
        </div>

        {/* Mobile View Mode Switcher (Direct Channels vs Transmit Console) */}
        <div className="flex sm:hidden gap-1.5 font-mono text-xs select-none">
          <button
            onClick={() => {
              playClick();
              setMobileMode('channels');
            }}
            className={`flex-1 py-1.5 border text-[11px] text-center transition-all ${
              mobileMode === 'channels'
                ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
            }`}
          >
            01. CHANNELS (4)
          </button>
          <button
            onClick={() => {
              playClick();
              setMobileMode('form');
            }}
            className={`flex-1 py-1.5 border text-[11px] text-center transition-all ${
              mobileMode === 'form'
                ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
            }`}
          >
            02. TRANSMIT
          </button>
          <button
            onClick={() => {
              playClick();
              setMobileMode('all');
            }}
            className={`px-2.5 py-1.5 border text-[11px] text-center transition-all ${
              mobileMode === 'all'
                ? 'border-cyan-300 bg-cyan-400/20 text-white font-bold'
                : 'border-white/20 text-cyan-200/70 bg-[#082357]/60'
            }`}
          >
            ALL
          </button>
        </div>

        {/* Transmission Routing Channels - Unstacked 2-column layout on mobile */}
        <div
          className={`${
            mobileMode === 'form' ? 'hidden sm:grid' : 'grid'
          } grid-cols-2 gap-2 sm:gap-3 font-mono text-xs pt-1 sm:pt-2`}
        >
          {/* EMAIL - Full Width on mobile */}
          <div
            onMouseEnter={playCardHover}
            className="col-span-2 border border-white/40 hover:border-white p-2.5 sm:p-3.5 bg-[#082357]/90 hover:bg-white/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
              <span className="text-cyan-200/80 group-hover:text-white text-[11px] sm:text-xs">EMAIL</span>
            </div>
            <div className="flex items-center gap-2 truncate">
              <a
                href="mailto:armaan.mulla001@gmail.com"
                onClick={playClick}
                onMouseEnter={playHoverTick}
                className="text-white font-bold truncate hover:underline text-[11px] sm:text-xs"
              >
                armaan.mulla001@gmail.com ↗
              </a>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={playHoverTick}
                title="Copy email"
                className="p-1 border border-white/30 hover:border-white text-cyan-200 hover:text-white shrink-0"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* GITHUB */}
          <a
            href="https://github.com/Armaan-z3r0"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={playHoverTick}
            className="border border-white/40 hover:border-white p-2.5 sm:p-3.5 bg-[#082357]/90 hover:bg-white/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Github className="w-4 h-4 text-cyan-300 shrink-0" />
              <span className="text-cyan-200/80 group-hover:text-white text-[11px] sm:text-xs">GITHUB</span>
            </div>
            <span className="text-white font-bold flex items-center gap-1 text-[11px] sm:text-xs">
              <span className="truncate">Armaan-z3r0</span>
              <ExternalLink className="w-3 h-3 text-cyan-200 shrink-0" />
            </span>
          </a>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/armaan-mulla-0322b12a1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={playHoverTick}
            className="border border-white/40 hover:border-white p-2.5 sm:p-3.5 bg-[#082357]/90 hover:bg-white/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Linkedin className="w-4 h-4 text-cyan-300 shrink-0" />
              <span className="text-cyan-200/80 group-hover:text-white text-[11px] sm:text-xs">LINKEDIN</span>
            </div>
            <span className="text-white font-bold flex items-center gap-1 text-[11px] sm:text-xs">
              <span className="truncate">armaan-mulla</span>
              <ExternalLink className="w-3 h-3 text-cyan-200 shrink-0" />
            </span>
          </a>

          {/* FIELD NOTES - Full width */}
          <a
            href="https://blog.armaan404.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            onMouseEnter={playHoverTick}
            className="col-span-2 border border-white/40 hover:border-white p-2.5 sm:p-3.5 bg-[#082357]/90 hover:bg-white/10 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-300 shrink-0" />
              <span className="text-cyan-200/80 group-hover:text-white text-[11px] sm:text-xs">FIELD NOTES</span>
            </div>
            <span className="text-white font-bold flex items-center gap-1 text-[11px] sm:text-xs">
              <span>blog.armaan404.com</span>
              <ExternalLink className="w-3 h-3 text-cyan-200 shrink-0" />
            </span>
          </a>
        </div>

        {/* Quick Transmission Dispatch Terminal Form */}
        <div
          className={`${
            mobileMode === 'channels' ? 'hidden sm:block' : 'block'
          } border border-white/30 bg-[#082357]/80 p-3.5 sm:p-6 font-mono text-xs space-y-3 sm:space-y-4 shadow-xl`}
        >
          <div className="flex justify-between items-center border-b border-white/15 pb-2 text-[10px] sm:text-[11px]">
            <span className="text-white font-bold tracking-wider">
              DIRECT DISPATCH CONSOLE // RECRUITER TRANSMIT
            </span>
            <span className="text-cyan-200/60 hidden xs:inline">ENC: AES_GCM_256</span>
          </div>

          {status === 'sent' ? (
            <div className="p-3.5 sm:p-4 border border-emerald-400/40 bg-emerald-950/40 text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PACKET TRANSMITTED SUCCESSFULLY</span>
              </div>
              <p className="text-xs font-sans text-cyan-100">
                Opening default mail carrier client. You can also reach out directly to{' '}
                <a href="mailto:armaan.mulla001@gmail.com" className="underline font-mono">
                  armaan.mulla001@gmail.com
                </a>
                .
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendDispatch} className="space-y-2.5 sm:space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[10px] text-cyan-200/70 mb-1">
                    OPERATOR NAME / ORG
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance (Lead Cyber Defense)"
                    value={senderName}
                    onFocus={playCardHover}
                    onChange={(e) => {
                      playTypingTick();
                      setSenderName(e.target.value);
                    }}
                    className="w-full bg-[#0A2A66]/90 border border-white/30 text-white placeholder-cyan-200/40 px-2.5 py-1.5 text-xs focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-cyan-200/70 mb-1">
                    RETURN CARRIER ADDRESS (EMAIL)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@defense-corp.com"
                    value={senderEmail}
                    onFocus={playCardHover}
                    onChange={(e) => {
                      playTypingTick();
                      setSenderEmail(e.target.value);
                    }}
                    className="w-full bg-[#0A2A66]/90 border border-white/30 text-white placeholder-cyan-200/40 px-2.5 py-1.5 text-xs focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-cyan-200/70 mb-1">
                  PAYLOAD / INQUIRY DETAILS
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Details on open cybersecurity roles, engineering team scope, or questions..."
                  value={message}
                  onFocus={playCardHover}
                  onChange={(e) => {
                    playTypingTick();
                    setMessage(e.target.value);
                  }}
                  className="w-full bg-[#0A2A66]/90 border border-white/30 text-white placeholder-cyan-200/40 px-2.5 py-1.5 text-xs focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={status === 'transmitting'}
                  onMouseEnter={playHoverTick}
                  className="border border-white bg-white text-[#0A2A66] hover:bg-transparent hover:text-white px-5 sm:px-6 py-2 font-bold uppercase transition-all flex items-center justify-center gap-2 w-full sm:w-auto text-xs"
                >
                  {status === 'transmitting' ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-[#0A2A66] border-t-transparent animate-spin rounded-full" />
                      <span>ENCRYPTING PACKET...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>TRANSMIT DISPATCH</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Technical Callout Footer in Sheet */}
      <div className="relative z-10 font-mono text-[11px] text-cyan-200/70 border-t border-white/20 pt-3 flex flex-wrap justify-between gap-2 pr-28 sm:pr-32">
        <span>TRANSMISSION PROTOCOL: TLS_1.3 // RFC 8446</span>
        <span>LATENCY: LOW // MUMBAI 19.0760 N, 72.8777 E</span>
        <span>END OF PACKET</span>
      </div>

      {/* Dynamic Drawing Sheet Revision Stamp */}
      <SheetRevisionStamp sheetId="07" status="TRANSMITTED" />
    </section>
  );
};
