import re

with open('src/pages/Projects.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('viewMode={cardLayoutState.layoutType === "masonry" ? "masonry" : "grid"}', 'viewMode="grid"')

with open('src/pages/Projects.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Projects.tsx 2")
