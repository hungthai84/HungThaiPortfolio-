const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Remove import
code = code.replace(/import \{ DevicePreviewOverlay \} from "\.\/components\/device-preview\/DevicePreviewOverlay";\n?/, '');

// Remove usage
code = code.replace(/<DevicePreviewOverlay \/>\n?/, '');

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed App.tsx');
