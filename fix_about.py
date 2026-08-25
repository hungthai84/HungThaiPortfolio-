import re

with open('src/pages/About.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import { useCardLayout } from "../context/CardLayoutContext";\n', '')
content = re.sub(r'\s*const { state: cardLayoutState[^}]* } = useCardLayout\(\);\n', '\n', content)

grid_replacement = """      <div className="w-full max-w-6xl mx-auto pb-8">
        {/* MASONRY LAYOUT (PINTEREST GRID) */}
        <div className="about-masonry-grid w-full">"""

content = re.sub(r'      <div className="w-full max-w-6xl mx-auto pb-8 responsive-card-container">\s*\{\/\* MASONRY LAYOUT \(PINTEREST GRID\) \*\/\}\s*<div \s*className="masonry-card-grid w-full"\s*data-mode=\{[^}]*\}\s*style=\{[^}]*\}\s*>', grid_replacement, content)
content = content.replace('masonry-card-item', 'about-masonry-item')

with open('src/pages/About.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated About.tsx")
