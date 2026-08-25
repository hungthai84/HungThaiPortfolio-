const fs = require('fs');
let code = fs.readFileSync('src/components/TopNavActionStack.tsx', 'utf8');

code = code.replace(
  /export function TopNavActionStack\(\{\s*currentThemeMode,\s*onCycleTheme,\s*\}\:\s*\{\s*currentThemeMode\: string;\s*onCycleTheme\: \(\) \=\> void;\s*\}\) \{/,
  `export function TopNavActionStack({
  currentThemeMode,
  onToggleThemeMode,
  onNavigate,
  className,
}: {
  currentThemeMode: string;
  onToggleThemeMode: () => void;
  onNavigate?: (page: string) => void;
  className?: string;
}) {`
);

code = code.replace(/onCycleTheme\(\)/g, "onToggleThemeMode()");

fs.writeFileSync('src/components/TopNavActionStack.tsx', code);
