import re

with open('src/pages/Memories.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('icon={<Camera className="w-5 h-5 text-amber-600 dark:text-amber-400" />}', 'icon={Camera}')

with open('src/pages/Memories.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed icon in Memories.tsx")
