export interface BrowserInfo {
  isEdge: boolean;
  isChrome: boolean;
  isSafari: boolean;
  isFirefox: boolean;
}

export function getBrowserInfo(): BrowserInfo {
  if (typeof navigator === "undefined") {
    return {
      isEdge: false,
      isChrome: false,
      isSafari: false,
      isFirefox: false,
    };
  }
  const ua = navigator.userAgent.toLowerCase();
  const isEdge = ua.includes("edg");
  const isChrome = ua.includes("chrome") && !isEdge;
  const isSafari = ua.includes("safari") && !isChrome && !isEdge;
  const isFirefox = ua.includes("firefox");

  return { isEdge, isChrome, isSafari, isFirefox };
}

/**
 * Gets the default Vietnamese speech synthesis voice based on browser context.
 * - Microsoft Edge: Defaults to Giọng Nam Minh (Microsoft NamMinh Online Natural / Nam Minh)
 * - Google Chrome: Defaults to Google Tiếng Việt 3 (Natural) / Google Tiếng Việt
 */
export function getVietnameseVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  if (!voices) return [];
  const viVoices = voices.filter(
    (v) =>
      v.lang.toLowerCase().includes("vi") ||
      v.name.toLowerCase().includes("tiếng việt") ||
      v.name.toLowerCase().includes("vietnamese") ||
      v.name.toLowerCase().includes("multilingual"),
  );

  return viVoices.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    let aScore = 0;
    let bScore = 0;

    if (aName.includes("natural")) aScore += 100;
    if (aName.includes("multilingual")) aScore += 80;
    if (aName.includes("google") && (aName.includes("3") || aName.includes("tiếng việt"))) aScore += 90;
    if (aName.includes("hoài my") || aName.includes("namminh")) aScore += 50;

    if (bName.includes("natural")) bScore += 100;
    if (bName.includes("multilingual")) bScore += 80;
    if (bName.includes("google") && (bName.includes("3") || bName.includes("tiếng việt"))) bScore += 90;
    if (bName.includes("hoài my") || bName.includes("namminh")) bScore += 50;

    return bScore - aScore;
  });
}

export function getEnglishVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  if (!voices) return [];
  const enVoices = voices.filter(
    (v) => 
      v.lang.toLowerCase().includes("en") || 
      v.name.toLowerCase().includes("english") ||
      v.name.toLowerCase().includes("multilingual")
  );

  return enVoices.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    let aScore = 0;
    let bScore = 0;

    if (aName.includes("natural")) aScore += 100;
    if (aName.includes("multilingual")) aScore += 80;
    if (aName.includes("google")) aScore += 50;

    if (bName.includes("natural")) bScore += 100;
    if (bName.includes("multilingual")) bScore += 80;
    if (bName.includes("google")) bScore += 50;

    return bScore - aScore;
  });
}

export function getDefaultVietnameseVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  const viVoices = voices.filter(
    (v) =>
      v.lang.toLowerCase().includes("vi") ||
      v.name.toLowerCase().includes("tiếng việt") ||
      v.name.toLowerCase().includes("vietnamese"),
  );

  if (viVoices.length === 0) return undefined;

  const { isEdge, isChrome } = getBrowserInfo();

  if (isEdge) {
    // Edge priority: Giọng Nam Minh
    const edgeNamMinh = viVoices.find((v) => {
      const name = v.name.toLowerCase();
      return (
        name.includes("namminh") ||
        name.includes("nam min") ||
        (name.includes("nam") && name.includes("minh"))
      );
    });
    if (edgeNamMinh) return edgeNamMinh;

    const edgeNam = viVoices.find((v) => v.name.toLowerCase().includes("nam"));
    if (edgeNam) return edgeNam;

    const edgeMicrosoft = viVoices.find((v) =>
      v.name.toLowerCase().includes("microsoft"),
    );
    if (edgeMicrosoft) return edgeMicrosoft;

    return viVoices[0];
  }

  if (isChrome) {
    // Chrome priority: Google Tiếng Việt 3 (Natural) or Google Tiếng Việt
    const chromeGoogle3 = viVoices.find((v) => {
      const name = v.name.toLowerCase();
      return (
        name.includes("tiếng việt 3") ||
        name.includes("vietnamese 3") ||
        (name.includes("google") && name.includes("3")) ||
        name.includes("3")
      );
    });
    if (chromeGoogle3) return chromeGoogle3;

    const chromeGoogleVi = viVoices.find((v) => {
      const name = v.name.toLowerCase();
      return name.includes("google") && name.includes("tiếng việt");
    });
    if (chromeGoogleVi) return chromeGoogleVi;

    const chromeGoogle = viVoices.find((v) =>
      v.name.toLowerCase().includes("google"),
    );
    if (chromeGoogle) return chromeGoogle;

    const chromeTv3 = viVoices.find((v) => v.name.toLowerCase().includes("3"));
    if (chromeTv3) return chromeTv3;

    return viVoices[0];
  }

  // Fallback for other browsers (Safari, Firefox, etc.)
  const fallbackNamMinh = viVoices.find((v) => {
    const name = v.name.toLowerCase();
    return (
      name.includes("namminh") ||
      name.includes("nam min") ||
      (name.includes("nam") && name.includes("minh"))
    );
  });
  if (fallbackNamMinh) return fallbackNamMinh;

  const fallbackGoogle = viVoices.find((v) =>
    v.name.toLowerCase().includes("google"),
  );
  if (fallbackGoogle) return fallbackGoogle;

  return viVoices[0];
}

/**
 * Gets the default English speech synthesis voice based on browser context.
 */
export function getDefaultEnglishVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined {
  if (!voices || voices.length === 0) return undefined;

  const enVoices = voices.filter((v) => v.lang.toLowerCase().includes("en"));
  if (enVoices.length === 0) return undefined;

  const { isEdge, isChrome } = getBrowserInfo();

  if (isEdge) {
    const edgeEn =
      enVoices.find(
        (v) =>
          v.name.toLowerCase().includes("natural") ||
          v.name.toLowerCase().includes("guy") ||
          v.name.toLowerCase().includes("aria"),
      ) || enVoices[0];
    return edgeEn;
  }

  if (isChrome) {
    const chromeEn =
      enVoices.find(
        (v) =>
          v.name.toLowerCase().includes("google us english") ||
          v.name.toLowerCase().includes("google"),
      ) || enVoices[0];
    return chromeEn;
  }

  return enVoices[0];
}

/**
 * Formats voice display label for selection UI dropdowns
 */
export function formatVoiceLabel(
  voice: SpeechSynthesisVoice,
  isVi = true,
): string {
  const { isEdge, isChrome } = getBrowserInfo();
  let name = voice.name
    .replace("Microsoft", "")
    .replace("Google", "")
    .replace("Online (Natural)", "(Natural)")
    .replace("- Vietnamese (Vietnam)", "")
    .trim();

  const lowerName = voice.name.toLowerCase();
  const isEdgeMinh =
    lowerName.includes("namminh") ||
    (lowerName.includes("nam") && lowerName.includes("minh"));
  const isChromeTv3 =
    lowerName.includes("tiếng việt 3") ||
    (lowerName.includes("google") && lowerName.includes("tiếng việt"));

  if (isEdgeMinh && isEdge) {
    return isVi ? `${name} (Mặc định Edge)` : `${name} (Edge Default)`;
  }
  if (isChromeTv3 && isChrome) {
    return isVi ? `${name} (Mặc định Chrome)` : `${name} (Chrome Default)`;
  }

  return name;
}
