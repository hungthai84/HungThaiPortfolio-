import re

with open('src/pages/Industries.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I want to add hideToolbar={true} to the <PageLayout ...> tag in Industries.tsx
if 'hideToolbar=' not in content:
    content = re.sub(r'(<PageLayout\s+)', r'\1hideToolbar={true}\n      ', content)

with open('src/pages/Industries.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Industries.tsx")
