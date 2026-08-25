const fs = require('fs');
let code = fs.readFileSync('src/components/TopNavActionStack.tsx', 'utf-8');

// 1. Change -ml-[112px] to -ml-[94px]
code = code.replace(/-ml-\[112px\]/g, '-ml-[94px]');

// 2. Change event name and payload
code = code.replace(/app-set-device-preview/g, 'app-set-viewport-mode');
code = code.replace(/device: /g, 'mode: ');
code = code.replace(/currentDevice ===/g, 'viewportMode ===');
code = code.replace(/currentDevice !==/g, 'viewportMode !==');
code = code.replace(/setCurrentDevice/g, 'setViewportMode');
code = code.replace(/const \[currentDevice, setViewportMode\] = useState<string>\("current"\);/, 'const [viewportMode, setViewportMode] = useState<string>(() => localStorage.getItem("app_viewport_mode") || "desktop");');
code = code.replace(/const handleSetDevice = \(e: any\) => \{/g, 'const handleSetDevice = (e: any) => {');
code = code.replace(/if \(e\.detail\?\.mode\) setViewportMode\(e\.detail\.mode\);/g, 'if (e.detail?.mode) setViewportMode(e.detail.mode);');

// 3. Move Device Preview block to be after Wallpaper
// Find Wallpaper block: from `{/* ========================================================================= */}`
// before `{/* 1. NÚT HÌNH NỀN` to before `{/* 2. NÚT GIAO DIỆN`
// Find Theme block: from `{/* 2. NÚT GIAO DIỆN` to before `{/* 3. NÚT NGÔN NGỮ`
// Find Language block: from `{/* 3. NÚT NGÔN NGỮ` to before `{/* 4. NÚT DEVICE PREVIEW`
// Find Device block: from `{/* 4. NÚT DEVICE PREVIEW` to end of motion.div

// It's easier to use a regex to extract the blocks.

const b1 = code.indexOf('{/* 1. NÚT HÌNH NỀN');
const b2 = code.indexOf('{/* 2. NÚT GIAO DIỆN');
const b3 = code.indexOf('{/* 3. NÚT NGÔN NGỮ');
const b4 = code.indexOf('{/* 4. NÚT DEVICE PREVIEW');
const bEnd = code.lastIndexOf('</motion.div>');

if (b1 > -1 && b2 > -1 && b3 > -1 && b4 > -1 && bEnd > -1) {
    const p1 = code.lastIndexOf('{/* ========================================================================= */}', b1);
    const p2 = code.lastIndexOf('{/* ========================================================================= */}', b2);
    const p3 = code.lastIndexOf('{/* ========================================================================= */}', b3);
    const p4 = code.lastIndexOf('{/* ========================================================================= */}', b4);
    
    const part0 = code.substring(0, p2); // Up to the end of wallpaper
    const themePart = code.substring(p2, p3); // Theme block
    const langPart = code.substring(p3, p4); // Lang block
    const devicePart = code.substring(p4, bEnd); // Device block
    const endPart = code.substring(bEnd);
    
    // New order: Wallpaper, Device, Theme, Language
    code = part0 + devicePart + themePart + langPart + endPart;
}

// 4. Update the state initialization in part0
code = code.replace(/const \[currentDevice, setViewportMode\] = useState<string>\("current"\);/g, 'const [viewportMode, setViewportMode] = useState<string>(() => localStorage.getItem("app_viewport_mode") || "desktop");');
// Note: initial replace might have failed because the line is: const [currentDevice, setCurrentDevice] = useState<string>("current");
code = code.replace(/const \[currentDevice, setCurrentDevice\] = useState<string>\("current"\);/g, 'const [viewportMode, setViewportMode] = useState<string>(() => typeof window !== "undefined" ? (localStorage.getItem("app_viewport_mode") || "desktop") : "desktop");');

fs.writeFileSync('src/components/TopNavActionStack.tsx', code);
console.log('Modified TopNavActionStack.tsx');
