/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AmbientAtmosphereType =
  "lofi" | "rain" | "coffee" | "nature" | "ocean" | "cosmic";

export interface AtmosphereInfo {
  id: AmbientAtmosphereType;
  nameVi: string;
  nameEn: string;
  descVi: string;
  descEn: string;
  icon: string;
  color: string;
  audioUrls: string[];
}

export const ATMOSPHERES: Record<AmbientAtmosphereType, AtmosphereInfo> = {
  lofi: {
    id: "lofi",
    nameVi: "Nhạc Lofi Thư Giãn (Lofi Chill Beat)",
    nameEn: "Lofi Chill Study Beat",
    descVi: "Giai điệu lofi ấm áp, êm dịu giúp tập trung và giảm căng thẳng",
    descEn: "Warm, soothing lofi instrumental beats for focus and relaxation",
    icon: "Headphones",
    color: "text-purple-500",
    audioUrls: [
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
      "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3",
    ],
  },
  rain: {
    id: "rain",
    nameVi: "Tiếng Mưa Trên Cửa Sổ (Rain & Window Ambience)",
    nameEn: "Soothing Rain & Window Ambience",
    descVi: "Âm thanh mưa rơi êm đềm bên khung cửa thư thái",
    descEn: "Gentle raindrops falling on a cozy windowpane",
    icon: "CloudRain",
    color: "text-blue-500",
    audioUrls: [
      "https://cdn.pixabay.com/download/audio/2021/09/06/audio_7314a51187.mp3",
      "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3",
    ],
  },
  coffee: {
    id: "coffee",
    nameVi: "Quán Cà Phê Chiều Tà (Cozy Cafe Ambience)",
    nameEn: "Cozy Cafe Ambience",
    descVi: "Không gian ấm cúng nhẹ nhàng với giai điệu chill quán cà phê",
    descEn: "Warm coffee shop atmosphere with mellow relaxing tones",
    icon: "Coffee",
    color: "text-amber-500",
    audioUrls: [
      "https://cdn.pixabay.com/download/audio/2022/11/04/audio_34626bf765.mp3",
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    ],
  },
  nature: {
    id: "nature",
    nameVi: "Rừng Sớm Bình Yên (Peaceful Nature & Birds)",
    nameEn: "Peaceful Nature & Birds",
    descVi: "Tiếng thiên nhiên, chim hót buổi sớm mai tĩnh lặng",
    descEn: "Morning birdsong and peaceful natural breeze",
    icon: "Trees",
    color: "text-emerald-500",
    audioUrls: [
      "https://cdn.pixabay.com/download/audio/2021/08/09/audio_88447e769f.mp3",
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3",
    ],
  },
  ocean: {
    id: "ocean",
    nameVi: "Sóng Biển Êm Đềm (Calm Ocean Waves)",
    nameEn: "Calm Ocean Waves",
    descVi: "Âm thanh sóng vỗ rì rào mang lại sự bình yên sâu lắng",
    descEn: "Rhythmic ocean waves for deep calm and clarity",
    icon: "Waves",
    color: "text-cyan-500",
    audioUrls: [
      "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3",
      "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3",
    ],
  },
  cosmic: {
    id: "cosmic",
    nameVi: "Không Gian Vũ Trụ (Cosmic Ambient Pad)",
    nameEn: "Cosmic Ambient Synth Pad",
    descVi: "Nền âm thanh synth tĩnh lặng vô cực giúp suy ngẫm sâu",
    descEn: "Deep atmospheric synth textures for deep contemplation",
    icon: "Sparkles",
    color: "text-violet-500",
    audioUrls: [
      "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3",
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    ],
  },
};

/**
 * Maps wallpaper IDs or names to the most fitting ambient atmosphere
 */
export function getAtmosphereForWallpaper(wallpaperId: string): AtmosphereInfo {
  const id = wallpaperId.toLowerCase();

  if (
    id.includes("rain") ||
    id.includes("window") ||
    id === "peaceful-window" ||
    id === "chill-evening"
  ) {
    return ATMOSPHERES.rain;
  }
  if (
    id.includes("coffee") ||
    id.includes("sunset") ||
    id === "sunset-coffee" ||
    id === "warm-living"
  ) {
    return ATMOSPHERES.coffee;
  }
  if (
    id.includes("forest") ||
    id.includes("tree") ||
    id.includes("minimal") ||
    id === "minimal-arch"
  ) {
    return ATMOSPHERES.nature;
  }
  if (
    id.includes("ocean") ||
    id.includes("sea") ||
    id.includes("wave") ||
    id === "silk-waves"
  ) {
    return ATMOSPHERES.ocean;
  }
  if (
    id.includes("aurora") ||
    id.includes("cosmic") ||
    id.includes("glow") ||
    id === "aurora-rainbow" ||
    id === "violet-glow"
  ) {
    return ATMOSPHERES.cosmic;
  }

  // Default to Lofi study beat
  return ATMOSPHERES.lofi;
}

// Single HTML5 Audio instance for background ambience
let currentAudio: HTMLAudioElement | null = null;
let currentAtmosphereId: AmbientAtmosphereType | null = null;
let webAudioCtx: AudioContext | null = null;
let webAudioGain: GainNode | null = null;
let isWebAudioPlaying = false;

function startWebAudioFallback(type: AmbientAtmosphereType, volume: number) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    if (!webAudioCtx) {
      webAudioCtx = new AudioCtx();
    }
    if (webAudioCtx.state === "suspended") {
      webAudioCtx.resume();
    }

    stopWebAudioFallback();

    const ctx = webAudioCtx;
    webAudioGain = ctx.createGain();
    webAudioGain.gain.setValueAtTime(
      Math.min(volume * 0.15, 0.15),
      ctx.currentTime,
    );
    webAudioGain.connect(ctx.destination);

    if (type === "rain" || type === "ocean") {
      // Pink / brown noise generator for gentle rain/waves
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(
        type === "rain" ? 1000 : 600,
        ctx.currentTime,
      );

      whiteNoise.connect(filter);
      filter.connect(webAudioGain);
      whiteNoise.start();
      isWebAudioPlaying = true;
    } else {
      // Soft ambient synth chord loop for lofi / coffee / cosmic
      const freqs =
        type === "cosmic"
          ? [130.81, 196.0, 261.63, 392.0]
          : [174.61, 261.63, 329.63, 392.0];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        oscGain.gain.setValueAtTime(0.04 / freqs.length, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(webAudioGain!);
        osc.start();
      });
      isWebAudioPlaying = true;
    }
  } catch {
    // Ignore fallback errors
  }
}

function stopWebAudioFallback() {
  try {
    if (webAudioGain && webAudioCtx) {
      webAudioGain.gain.setValueAtTime(0.001, webAudioCtx.currentTime);
      setTimeout(() => {
        if (webAudioGain) {
          webAudioGain.disconnect();
          webAudioGain = null;
        }
      }, 100);
    }
    isWebAudioPlaying = false;
  } catch {
    // Ignore
  }
}

export function startAmbientSound(wallpaperId: string, volume: number = 0.45) {
  const atmosphere = getAtmosphereForWallpaper(wallpaperId);

  // If already playing the same atmosphere, just adjust volume
  if (
    currentAudio &&
    currentAtmosphereId === atmosphere.id &&
    !currentAudio.paused
  ) {
    currentAudio.volume = Math.max(0, Math.min(1, volume));
    return;
  }

  stopAmbientSound();
  currentAtmosphereId = atmosphere.id;

  const audioUrl = atmosphere.audioUrls[0];
  const audio = new Audio(audioUrl);
  audio.loop = true;
  audio.volume = Math.max(0, Math.min(1, volume));
  currentAudio = audio;

  audio.play().catch(() => {
    // Try second URL or WebAudio fallback if playback prevented or URL blocked
    if (atmosphere.audioUrls[1]) {
      const backupAudio = new Audio(atmosphere.audioUrls[1]);
      backupAudio.loop = true;
      backupAudio.volume = Math.max(0, Math.min(1, volume));
      currentAudio = backupAudio;
      backupAudio.play().catch(() => {
        startWebAudioFallback(atmosphere.id, volume);
      });
    } else {
      startWebAudioFallback(atmosphere.id, volume);
    }
  });

  window.dispatchEvent(
    new CustomEvent("app-ambient-changed", {
      detail: { isEnabled: true, volume, atmosphere },
    }),
  );
}

export function stopAmbientSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  stopWebAudioFallback();
  currentAtmosphereId = null;

  window.dispatchEvent(
    new CustomEvent("app-ambient-changed", {
      detail: { isEnabled: false, volume: 0, atmosphere: null },
    }),
  );
}

export function setAmbientVolume(volume: number) {
  const clamped = Math.max(0, Math.min(1, volume));
  if (currentAudio) {
    currentAudio.volume = clamped;
  }
  if (webAudioGain && webAudioCtx) {
    webAudioGain.gain.setValueAtTime(
      Math.min(clamped * 0.15, 0.15),
      webAudioCtx.currentTime,
    );
  }
  localStorage.setItem("app_ambient_volume", String(clamped));

  window.dispatchEvent(
    new CustomEvent("app-ambient-volume-changed", {
      detail: { volume: clamped },
    }),
  );
}

export function syncAmbientWithWallpaper(
  wallpaperId: string,
  isEnabled: boolean,
  volume?: number,
) {
  const vol =
    volume ?? parseFloat(localStorage.getItem("app_ambient_volume") || "0.45");
  if (isEnabled) {
    startAmbientSound(wallpaperId, vol);
  } else {
    stopAmbientSound();
  }
}
