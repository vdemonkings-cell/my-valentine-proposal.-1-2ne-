
import { ROMANTIC_TUNE_URL } from '.Sound Effect by <a href="https://pixabay.com/users/prettyjohn1-54616349/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=483360">prettyjohn1</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=483360">Pixabay</a>./constants';

export class SoundManager {
  private ctx: AudioContext | null = null;
  private backgroundAudio: HTMLAudioElement | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playBackgroundMusic() {
    if (!this.backgroundAudio) {
      this.backgroundAudio = new Audio(ROMANTIC_TUNE_URL);
      this.backgroundAudio.loop = true;
      this.backgroundAudio.volume = 0.4;
    }
    this.backgroundAudio.play().catch(e => console.log("Audio play blocked until user interaction", e));
  }

  stopBackgroundMusic() {
    if (this.backgroundAudio) {
      this.backgroundAudio.pause();
    }
  }

  playNo() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playYes() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046.50, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playCelebration() {
    this.init();
    if (!this.ctx) return;
    const noise = this.ctx.createBufferSource();
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    noise.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    noise.start();
    for (let i = 0; i < 15; i++) {
      const time = this.ctx.currentTime + Math.random() * 2;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000 + Math.random() * 3000, time);
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.03, time + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.3);
    }
  }
}

export const sounds = new SoundManager();
