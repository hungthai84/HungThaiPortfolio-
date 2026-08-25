import re

with open('src/pages/Memories.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('      displaySubtitle={isVi ? "Kho lưu trữ dấu ấn" : "Gallery of Milestones"}\n', '')

with open('src/pages/Memories.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Removed displaySubtitle")
