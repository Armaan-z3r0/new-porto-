// Web Audio API Blueprint Acoustic Sound Engine
// Rich drafting pen clicks, mechanical switches, paper glides, radar sweeps, and data-center hum

let audioCtx: AudioContext | null = null;
let isAudioInitialized = false;

// Master Ambient Soundscape Nodes (Data Center & Plotter Hum)
let ambientMasterGain: GainNode | null = null;
let fanSource: AudioBufferSourceNode | null = null;
let fanFilter: BiquadFilterNode | null = null;
let fanGain: GainNode | null = null;
let fanLfo: OscillatorNode | null = null;
let fanLfoGain: GainNode | null = null;

let humOsc1: OscillatorNode | null = null;
let humOsc2: OscillatorNode | null = null;
let humOsc3: OscillatorNode | null = null;
let humFilter: BiquadFilterNode | null = null;
let humGain: GainNode | null = null;

let plotterOsc: OscillatorNode | null = null;
let plotterFilter: BiquadFilterNode | null = null;
let plotterGain: GainNode | null = null;
let plotterLfo: OscillatorNode | null = null;
let plotterLfoGain: GainNode | null = null;

// Calibrated low-volume atmospheric master target level (subtle, non-fatiguing)
const AMBIENT_TARGET_VOLUME = 0.042;

// Check stored preference or default to ACTIVE
const checkInitialSoundState = (): boolean => {
  if (typeof window === 'undefined') return true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return false;
  }

  try {
    const saved = localStorage.getItem('sec_portfolio_sound');
    if (saved !== null) {
      return saved === 'true';
    }
  } catch {
    // Storage access restricted
  }
  return true;
};

let soundEnabled = checkInitialSoundState();

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

export const ensureAudioActive = () => {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
  if (soundEnabled && !ambientMasterGain) {
    startAmbientDrone();
  }
};

// Start subtle, looping ambient soundscape: Data Center cooling airflow, 60Hz/120Hz transformer hum & plotter resonance
export const startAmbientDrone = () => {
  const ctx = getAudioContext();
  if (!ctx || ambientMasterGain) return;

  try {
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Master Soundscape Bus
    ambientMasterGain = ctx.createGain();
    ambientMasterGain.gain.setValueAtTime(0.0001, now);
    ambientMasterGain.gain.exponentialRampToValueAtTime(AMBIENT_TARGET_VOLUME, now + 1.8);
    ambientMasterGain.connect(ctx.destination);

    // 1. DATA CENTER AIRFLOW / COOLING FAN (Looping pink noise with gentle breathing filter)
    const bufferDuration = 4.0;
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * bufferDuration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Paul Kellet's filtered pink noise algorithm for warm, soft airflow
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    fanSource = ctx.createBufferSource();
    fanSource.buffer = noiseBuffer;
    fanSource.loop = true;

    fanFilter = ctx.createBiquadFilter();
    fanFilter.type = 'lowpass';
    fanFilter.frequency.setValueAtTime(260, now);
    fanFilter.Q.setValueAtTime(0.7, now);

    // Slow organic airflow modulation (0.07 Hz LFO)
    fanLfo = ctx.createOscillator();
    fanLfo.frequency.setValueAtTime(0.07, now);
    fanLfoGain = ctx.createGain();
    fanLfoGain.gain.setValueAtTime(40, now); // Modulates filter between ~220Hz and 300Hz
    fanLfo.connect(fanLfoGain);
    fanLfoGain.connect(fanFilter.frequency);

    fanGain = ctx.createGain();
    fanGain.gain.setValueAtTime(0.28, now);

    fanSource.connect(fanFilter);
    fanFilter.connect(fanGain);
    fanGain.connect(ambientMasterGain);

    fanSource.start(now);
    fanLfo.start(now);

    // 2. SERVER POWER TRANSFORMER 60Hz & 120Hz HUM (Dual detuned sine waves with gentle phase beating)
    humFilter = ctx.createBiquadFilter();
    humFilter.type = 'lowpass';
    humFilter.frequency.setValueAtTime(145, now);
    humFilter.Q.setValueAtTime(1.1, now);

    humOsc1 = ctx.createOscillator();
    humOsc1.type = 'sine';
    humOsc1.frequency.setValueAtTime(60.0, now); // 60Hz fundamental power hum

    humOsc2 = ctx.createOscillator();
    humOsc2.type = 'sine';
    humOsc2.frequency.setValueAtTime(59.7, now); // 0.3Hz slow soothing beat frequency

    humOsc3 = ctx.createOscillator();
    humOsc3.type = 'sine';
    humOsc3.frequency.setValueAtTime(120.1, now); // 2nd harmonic hum

    humGain = ctx.createGain();
    humGain.gain.setValueAtTime(0.32, now);

    humOsc1.connect(humFilter);
    humOsc2.connect(humFilter);
    humOsc3.connect(humFilter);
    humFilter.connect(humGain);
    humGain.connect(ambientMasterGain);

    humOsc1.start(now);
    humOsc2.start(now);
    humOsc3.start(now);

    // 3. BLUEPRINT PLOTTER / PRINTER CARRIAGE STEPPER MOTOR RESONANCE
    plotterFilter = ctx.createBiquadFilter();
    plotterFilter.type = 'bandpass';
    plotterFilter.frequency.setValueAtTime(182, now);
    plotterFilter.Q.setValueAtTime(2.6, now);

    plotterOsc = ctx.createOscillator();
    plotterOsc.type = 'triangle';
    plotterOsc.frequency.setValueAtTime(182, now);

    plotterGain = ctx.createGain();
    plotterGain.gain.setValueAtTime(0.12, now);

    // Slow rhythmic motor modulation LFO (0.11 Hz)
    plotterLfo = ctx.createOscillator();
    plotterLfo.frequency.setValueAtTime(0.11, now);
    plotterLfoGain = ctx.createGain();
    plotterLfoGain.gain.setValueAtTime(0.04, now);
    plotterLfo.connect(plotterLfoGain);
    plotterLfoGain.connect(plotterGain.gain);

    plotterOsc.connect(plotterFilter);
    plotterFilter.connect(plotterGain);
    plotterGain.connect(ambientMasterGain);

    plotterOsc.start(now);
    plotterLfo.start(now);
  } catch {
    // Audio fallback gracefully handled
  }
};

export const stopAmbientDrone = () => {
  if (!ambientMasterGain || !audioCtx) return;
  try {
    const ctx = audioCtx;
    const now = ctx.currentTime;
    ambientMasterGain.gain.cancelScheduledValues(now);
    ambientMasterGain.gain.setValueAtTime(ambientMasterGain.gain.value, now);
    ambientMasterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    const oldMasterGain = ambientMasterGain;
    const oldFanSource = fanSource;
    const oldFanLfo = fanLfo;
    const oldHum1 = humOsc1;
    const oldHum2 = humOsc2;
    const oldHum3 = humOsc3;
    const oldPlotterOsc = plotterOsc;
    const oldPlotterLfo = plotterLfo;

    ambientMasterGain = null;
    fanSource = null;
    fanFilter = null;
    fanGain = null;
    fanLfo = null;
    fanLfoGain = null;
    humOsc1 = null;
    humOsc2 = null;
    humOsc3 = null;
    humFilter = null;
    humGain = null;
    plotterOsc = null;
    plotterFilter = null;
    plotterGain = null;
    plotterLfo = null;
    plotterLfoGain = null;

    setTimeout(() => {
      try {
        oldFanSource?.stop();
        oldFanLfo?.stop();
        oldHum1?.stop();
        oldHum2?.stop();
        oldHum3?.stop();
        oldPlotterOsc?.stop();
        oldPlotterLfo?.stop();
        oldMasterGain?.disconnect();
      } catch {
        // Safe cleanup
      }
    }, 450);
  } catch {
    ambientMasterGain = null;
  }
};

// Auto-activate on first touch, click, scroll or keypress
export const initAudioOnFirstInteraction = () => {
  if (isAudioInitialized || typeof window === 'undefined') return;
  isAudioInitialized = true;

  const unlock = () => {
    ensureAudioActive();
    window.removeEventListener('pointerdown', unlock);
    window.removeEventListener('keydown', unlock);
    window.removeEventListener('touchstart', unlock);
    window.removeEventListener('scroll', unlock);
  };

  window.addEventListener('pointerdown', unlock, { once: true, passive: true });
  window.addEventListener('keydown', unlock, { once: true, passive: true });
  window.addEventListener('touchstart', unlock, { once: true, passive: true });
  window.addEventListener('scroll', unlock, { once: true, passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (ambientMasterGain && audioCtx) {
        ambientMasterGain.gain.cancelScheduledValues(audioCtx.currentTime);
        ambientMasterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      }
    } else {
      if (soundEnabled && ambientMasterGain && audioCtx) {
        ambientMasterGain.gain.cancelScheduledValues(audioCtx.currentTime);
        ambientMasterGain.gain.exponentialRampToValueAtTime(AMBIENT_TARGET_VOLUME, audioCtx.currentTime + 0.8);
      }
    }
  });
};

export const toggleSound = (enabled?: boolean): boolean => {
  const next = enabled !== undefined ? enabled : !soundEnabled;
  soundEnabled = next;

  try {
    localStorage.setItem('sec_portfolio_sound', String(soundEnabled));
  } catch {
    // Ignore storage issues
  }

  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }

  if (soundEnabled) {
    startAmbientDrone();
    playClick();
  } else {
    stopAmbientDrone();
  }

  return soundEnabled;
};

export const isSoundEnabled = (): boolean => soundEnabled;

// Tactile Drafting Click
export const playClick = () => {
  ensureAudioActive();
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

    gain.gain.setValueAtTime(0.36, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(1400, now);
    clickOsc.frequency.exponentialRampToValueAtTime(320, now + 0.02);

    clickGain.gain.setValueAtTime(0.18, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

    osc.connect(gain);
    clickOsc.connect(clickGain);
    gain.connect(ctx.destination);
    clickGain.connect(ctx.destination);

    osc.start(now);
    clickOsc.start(now);
    osc.stop(now + 0.05);
    clickOsc.stop(now + 0.025);
  } catch {
    // Audio fallback
  }
};

// Subtle Compass / Drafting Pencil Tick on Hover
let lastHoverTime = 0;
export const playHoverTick = () => {
  if (!soundEnabled) return;
  const nowMs = performance.now();
  if (nowMs - lastHoverTime < 50) return;
  lastHoverTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.02);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  } catch {
    // Ignore
  }
};

// Blueprint Drafting Sheet Glide on Section Transitions
let lastSweepTime = 0;
export const playSectionSweep = () => {
  if (!soundEnabled) return;
  const nowMs = performance.now();
  if (nowMs - lastSweepTime < 240) return;
  lastSweepTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(2.2, now);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // Ignore
  }
};

// Mechanical Key-Typing Tick for Forms, Terminal & Scramble Decoders
let lastTypingTime = 0;
export const playTypingTick = () => {
  if (!soundEnabled) return;
  const nowMs = performance.now();
  if (nowMs - lastTypingTime < 32) return;
  lastTypingTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = 720 + Math.random() * 320;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.022);
  } catch {
    // Ignore
  }
};

// Dialog / Inspection Open Tone
export const playOpen = () => {
  ensureAudioActive();
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    // Ignore
  }
};

// Pulse Sound for Transmissions / Shell Scan
export const playTelemetryPulse = () => {
  ensureAudioActive();
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.07);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Ignore
  }
};

// Subtle Resonant Card Hover
let lastCardHoverTime = 0;
export const playCardHover = () => {
  if (!soundEnabled) return;
  const nowMs = performance.now();
  if (nowMs - lastCardHoverTime < 90) return;
  lastCardHoverTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Ignore
  }
};

// Success Confirmation Chime (for copy or send actions)
export const playSuccessChime = () => {
  ensureAudioActive();
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc2.frequency.setValueAtTime(880, now + 0.07); // A5

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.09);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.3);
  } catch {
    // Ignore
  }
};

// CAD Crosshair Drafting Snap Tone
export const playCadToggle = (active: boolean) => {
  ensureAudioActive();
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    if (active) {
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(940, now + 0.08);
    } else {
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.08);
    }

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.095);
  } catch {
    // Ignore
  }
};

