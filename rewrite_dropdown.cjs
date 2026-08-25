const fs = require('fs');
let code = fs.readFileSync('src/components/TopNavActionStack.tsx', 'utf-8');

// Remove the Option: Current block
const startCurrent = code.indexOf('{/* Option: Current */}');
const endCurrent = code.indexOf('{/* Option: Desktop */}');

if (startCurrent > -1 && endCurrent > -1) {
    code = code.substring(0, startCurrent) + code.substring(endCurrent);
}

fs.writeFileSync('src/components/TopNavActionStack.tsx', code);
console.log('Removed Current option');
