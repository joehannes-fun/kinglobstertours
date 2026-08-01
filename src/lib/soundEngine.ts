/**
 * Web Audio Caribbean & Ocean Sound FX Engine
 * Pure Web Audio API synthesizers for interactive audio feedback and DJ sample previews.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Generates a buffer of stereo white noise
   */
  private createNoiseBuffer(duration: number): AudioBuffer | null {
    const ctx = this.getContext();
    if (!ctx) return null;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * 🌊 Ocean Surf Wave Sweep FX
   * Simulates rolling ocean wave crash with lowpass filter modulation.
   */
  playOceanWaveFx(duration = 3.5): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const noiseBuffer = this.createNoiseBuffer(duration);
    if (!noiseBuffer) return;

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + duration * 0.4);
    filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + duration * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start();
    noiseSource.stop(ctx.currentTime + duration);
  }

  /**
   * 🐚 Conch Shell (Caracol) Horn FX
   * Harmonic blow resonance sound.
   */
  playCaribbeanHornFx(duration = 2.2): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    // Conch shell pitch blow with subtle swelling pitch rise
    osc1.frequency.setValueAtTime(240, now);
    osc1.frequency.linearRampToValueAtTime(262, now + 0.3);
    osc1.frequency.setValueAtTime(262, now + duration - 0.4);
    osc1.frequency.linearRampToValueAtTime(235, now + duration);

    osc2.frequency.setValueAtTime(480, now);
    osc2.frequency.linearRampToValueAtTime(524, now + 0.3);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.4);
    gain.gain.setValueAtTime(0.4, now + duration - 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  /**
   * 💦 Tropical Water Splash Ring FX
   * Highpass noise burst with sine pitch drop.
   */
  playTropicalSplashFx(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const noiseBuffer = this.createNoiseBuffer(0.5);
    if (!noiseBuffer) return;

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.4);
    filter.Q.setValueAtTime(2.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    // Droplet pop sine
    const pop = ctx.createOscillator();
    pop.type = 'sine';
    pop.frequency.setValueAtTime(650, now);
    pop.frequency.exponentialRampToValueAtTime(200, now + 0.15);

    const popGain = ctx.createGain();
    popGain.gain.setValueAtTime(0.3, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    pop.connect(popGain);
    popGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.5);
    pop.start(now);
    pop.stop(now + 0.15);
  }

  /**
   * 🥁 Caribbean Bongo Tap FX
   * Rhythmic percussion bongo tap sound.
   */
  playBongoTapFx(pitch: 'high' | 'low' = 'high'): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const startFreq = pitch === 'high' ? 320 : 210;
    const endFreq = pitch === 'high' ? 140 : 90;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.12);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * 🎉 Tropical Party Cheer Swell FX
   * Multi-modulated crowd cheer resonance.
   */
  playPartyCheerFx(duration = 2.0): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const noiseBuffer = this.createNoiseBuffer(duration);
    if (!noiseBuffer) return;

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(900, now);
    filter1.Q.setValueAtTime(1.8, now);

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'bandpass';
    filter2.frequency.setValueAtTime(1400, now);
    filter2.Q.setValueAtTime(2.2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.3);
    gain.gain.setValueAtTime(0.3, now + duration - 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter1);
    noise.connect(filter2);
    filter1.connect(gain);
    filter2.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  }

  /**
   * Synthesized DJ Beat Track Fallback
   * Plays a 7-second sample loop for DJ previews if MP3 file is not present.
   */
  playSynthDjTrack(trackId: string, duration = 7.0, fadeOutTime = 1.0): () => void {
    const ctx = this.getContext();
    if (!ctx) return () => {};

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.4, now);
    masterGain.gain.setValueAtTime(0.4, now + (duration - fadeOutTime));
    masterGain.gain.linearRampToValueAtTime(0.001, now + duration);

    masterGain.connect(ctx.destination);

    const bpmMap: Record<string, number> = {
      'bibijagua-club': 130,
      'dembow-republica': 118,
      'afro-caribe': 105,
      'golden-hour': 122,
      'todo-el-mundo': 128,
    };

    const bpm = bpmMap[trackId] || 120;
    const beatInterval = 60 / bpm;
    const timers: number[] = [];

    // Schedule kick drum & synth notes over the duration
    let beatTime = 0;
    let step = 0;

    while (beatTime < duration) {
      const scheduledTime = now + beatTime;

      // Kick drum on 1, 2, 3, 4
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.frequency.setValueAtTime(150, scheduledTime);
      kickOsc.frequency.exponentialRampToValueAtTime(35, scheduledTime + 0.08);
      kickGain.gain.setValueAtTime(0.7, scheduledTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, scheduledTime + 0.1);
      kickOsc.connect(kickGain);
      kickGain.connect(masterGain);
      kickOsc.start(scheduledTime);
      kickOsc.stop(scheduledTime + 0.1);

      // Synths / melodic notes
      if (step % 2 === 1) {
        const hihatBuffer = this.createNoiseBuffer(0.05);
        if (hihatBuffer) {
          const hh = ctx.createBufferSource();
          hh.buffer = hihatBuffer;
          const hhFilter = ctx.createBiquadFilter();
          hhFilter.type = 'highpass';
          hhFilter.frequency.setValueAtTime(7000, scheduledTime);
          const hhGain = ctx.createGain();
          hhGain.gain.setValueAtTime(0.2, scheduledTime);
          hhGain.gain.exponentialRampToValueAtTime(0.001, scheduledTime + 0.05);
          hh.connect(hhFilter);
          hhFilter.connect(hhGain);
          hhGain.connect(masterGain);
          hh.start(scheduledTime);
          hh.stop(scheduledTime + 0.05);
        }
      }

      beatTime += beatInterval / 2;
      step++;
    }

    const stopTimeout = setTimeout(() => {
      masterGain.disconnect();
    }, duration * 1000);

    return () => {
      clearTimeout(stopTimeout);
      try {
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        setTimeout(() => masterGain.disconnect(), 120);
      } catch {
        // ignore
      }
    };
  }
}

export const soundEngine = new SoundEngine();
