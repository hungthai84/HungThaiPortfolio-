import re

with open('src/pages/Education.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('import { useCardLayout } from "../context/CardLayoutContext";\n', '')
content = re.sub(r'\s*const { state: cardLayoutState[^}]* } = useCardLayout\(\);\n', '\n', content)

# The grid section looks like this:
#             <div className="responsive-card-container w-full">
#               <div 
#                 className={cn(
#                   cardLayoutState.layoutType === "masonry" ? "masonry-card-grid" : "view-card-grid"
#                 )}
#                 data-mode={cardLayoutState.mode}
#                 style={cardLayoutState.layoutType === "masonry" ? getMasonryStyle() : getGridStyle()}
#               >

grid_replacement = """            <div className="responsive-card-container w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">"""

content = re.sub(r'            <div className="responsive-card-container w-full">\s*<div\s*className={cn\([^}]*\)\s*}\s*data-mode=\{[^}]*\}\s*style=\{[^}]*\}\s*>', grid_replacement, content)

with open('src/pages/Education.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Education.tsx")
