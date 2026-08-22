import { useState, useCallback } from "react";

// Web Audio API Synthesizer for Realistic Page Flip / Paper Swish Sound
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Custom Hook for realistic, subtle page-flip audio effects.
 * Includes localStorage persistence and a toggle control state.
 */
export function usePageFlipAudio() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("app_page_flip_sound_enabled") !== "false";
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("app_page_flip_sound_enabled", String(next));
      }
      return next;
    });
  }, []);

  const playPageFlipSound = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const duration = 0.18; // Subtle short paper flip duration (180ms)

      // 1. Create Noise Buffer for Paper Rustle / Friction Sound
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        // White noise with subtle falloff curve
        output[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 0.5);
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      // 2. Bandpass Filter simulating paper swish resonance
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(500, now + duration);
      filter.Q.setValueAtTime(2.2, now);

      // 3. Gain Envelope (Fade-in swish then rapid dampening)
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.01, now);
      gainNode.gain.linearRampToValueAtTime(0.07, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // 4. Subtle low sine tone simulating book spine movement
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = "sine";
      thudOsc.frequency.setValueAtTime(180, now + 0.02);
      thudOsc.frequency.exponentialRampToValueAtTime(70, now + duration);

      thudGain.gain.setValueAtTime(0.03, now + 0.02);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Connect Nodes
      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);

      // Play sound
      whiteNoise.start(now);
      whiteNoise.stop(now + duration);

      thudOsc.start(now + 0.02);
      thudOsc.stop(now + duration);
    } catch {
      // Ignore audio context errors
    }
  }, [soundEnabled]);

  return {
    soundEnabled,
    toggleSound,
    playPageFlipSound,
  };
}
