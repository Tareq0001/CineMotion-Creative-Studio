export type AudioMood = 'synthwave' | 'kinfolk' | 'tiktok' | 'lofi';

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.8;
  private currentMood: AudioMood = 'synthwave';
  private loopTimer: number | null = null;
  private step: number = 0;
  private bpm: number = 120;
  private vinylNode: AudioBufferSourceNode | null = null;

  constructor() {
    // Initialized lazily on user gesture to comply with browser audio autoplay policy
  }

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.8;

    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  public setMood(mood: AudioMood) {
    this.currentMood = mood;
    switch (mood) {
      case 'synthwave':
        this.bpm = 120;
        break;
      case 'kinfolk':
        this.bpm = 72;
        break;
      case 'tiktok':
        this.bpm = 128;
        break;
      case 'lofi':
        this.bpm = 84;
        break;
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.startSequencer();
  }

  public stop() {
    this.isPlaying = false;
    if (this.loopTimer !== null) {
      clearInterval(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.vinylNode) {
      try { this.vinylNode.stop(); } catch {}
      this.vinylNode = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(64);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public getWaveformData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(64);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(data);
    return data;
  }

  private startSequencer() {
    if (!this.ctx) return;
    const intervalMs = (60 / this.bpm / 4) * 1000; // 16th note subdivision
    this.loopTimer = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      this.triggerStep(this.step % 16);
      this.step++;
    }, intervalMs);
  }

  private triggerStep(s: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    switch (this.currentMood) {
      case 'synthwave':
        this.stepSynthwave(s, now);
        break;
      case 'kinfolk':
        this.stepKinfolk(s, now);
        break;
      case 'tiktok':
        this.stepTikTok(s, now);
        break;
      case 'lofi':
        this.stepLofi(s, now);
        break;
    }
  }

  // --- Mood 1: Synthwave ---
  private stepSynthwave(s: number, now: number) {
    // 4-on-the-floor kick
    if (s % 4 === 0) {
      this.playKick(now, 120, 35, 0.25);
    }
    // Snare on 4 and 12
    if (s === 4 || s === 12) {
      this.playSnare(now, 0.2);
    }
    // Hi-hat on every offbeat
    if (s % 2 === 1) {
      this.playHiHat(now, 0.05, 0.04);
    }
    // Rolling 16th Synth Bass Arpeggio (Am -> F -> C -> G)
    const chords = [
      [110, 130.81, 164.81], // A
      [87.31, 130.81, 174.61], // F
      [130.81, 164.81, 196.0], // C
      [98.0, 123.47, 146.83]   // G
    ];
    const chordIdx = Math.floor(this.step / 16) % chords.length;
    const notes = chords[chordIdx];
    const note = notes[s % notes.length];
    this.playSynthBass(now, note, 0.12);
  }

  // --- Mood 2: Kinfolk Organic Ambient ---
  private stepKinfolk(s: number, now: number) {
    // Soft deep heartbeat kick every 8 steps
    if (s === 0) {
      this.playKick(now, 65, 30, 0.4);
    }
    // Ambient warm pad chord on measure start
    if (s === 0) {
      const pads = [220, 261.63, 329.63, 392.0]; // A minor 7th
      pads.forEach((freq, idx) => {
        this.playPad(now, freq, 2.5, 0.06 / (idx + 1));
      });
    }
    // Gentle bell chime on random steps
    if (s === 6 || s === 14) {
      this.playBell(now, 523.25 * (s === 6 ? 1 : 1.25), 0.8, 0.04);
    }
  }

  // --- Mood 3: TikTok Kinetic Product Ad ---
  private stepTikTok(s: number, now: number) {
    // Fast Punchy 808
    if (s === 0 || s === 6 || s === 10) {
      this.playKick(now, 140, 42, 0.3);
    }
    // Snap on 4, 12
    if (s === 4 || s === 12) {
      this.playSnare(now, 0.15, true);
    }
    // Syncopated Hi-hats
    if (s % 2 === 0 || s === 7 || s === 15) {
      this.playHiHat(now, 0.03, 0.06);
    }
    // Staccato synth stab
    if (s === 0 || s === 3 || s === 8 || s === 11) {
      this.playSynthStab(now, 261.63, 0.1);
    }
  }

  // --- Mood 4: Lofi Sunset ---
  private stepLofi(s: number, now: number) {
    // Soft dusty boom-bap kick
    if (s === 0 || s === 7) {
      this.playKick(now, 90, 40, 0.3);
    }
    // Rimshot on 4, 12
    if (s === 4 || s === 12) {
      this.playSnare(now, 0.1, false, 800);
    }
    // Swung Hi-hat
    if (s % 2 === 1) {
      this.playHiHat(now, 0.06, 0.03, 5000);
    }
    // Warm Rhodes Piano 7th chord on step 0
    if (s === 0) {
      const chords = [
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [164.81, 196.0, 246.94, 293.66], // Em7
        [146.83, 174.61, 220.0, 261.63], // Dm7
        [130.81, 164.81, 196.0, 246.94]  // Cmaj7
      ];
      const c = chords[Math.floor(this.step / 16) % chords.length];
      c.forEach(f => this.playRhodes(now, f, 1.6, 0.04));
    }
  }

  // --- Instrument Generators ---
  private playKick(time: number, startFreq: number, endFreq: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + dur);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }

  private playSnare(time: number, dur: number, isSnap: boolean = false, filterFreq: number = 3000) {
    if (!this.ctx || !this.masterGain) return;
    // Noise buffer
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = isSnap ? 'highpass' : 'bandpass';
    filter.frequency.value = filterFreq;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    whiteNoise.start(time);
    whiteNoise.stop(time + dur);
  }

  private playHiHat(time: number, dur: number, vol: number = 0.05, filterFreq: number = 8000) {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * dur;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = filterFreq;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + dur);
  }

  private playSynthBass(time: number, freq: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, time);
    filter.frequency.exponentialRampToValueAtTime(150, time + dur);

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }

  private playPad(time: number, freq: number, dur: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }

  private playBell(time: number, freq: number, dur: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }

  private playSynthStab(time: number, freq: number, dur: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }

  private playRhodes(time: number, freq: number, dur: number, vol: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + dur);
  }
}
