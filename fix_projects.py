import re

with open('src/pages/Projects.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import { useCardLayout } from "../context/CardLayoutContext";\n', '')
content = re.sub(r'\s*const { state: cardLayoutState[^}]* } = useCardLayout\(\);\n', '\n', content)

grid_replacement = """              <div className="responsive-card-container w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full grid-flow-row-dense auto-rows-fr">"""

content = re.sub(r'              <div className="responsive-card-container w-full">\s*<div\s*className={cn\([^}]*\)\s*}\s*data-mode=\{[^}]*\}\s*style=\{[^}]*\}\s*>', grid_replacement, content)

with open('src/pages/Projects.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Projects.tsx")
