import re
import os

files = [
    'src/pages/CoverLetter.tsx',
    'src/pages/Education.tsx',
    'src/pages/TuVi.tsx'
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Add hideToolbar={true} if not present
        if 'hideToolbar=' not in content:
            content = re.sub(r'(<PageLayout\s+)', r'\1hideToolbar={true}\n      ', content)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
        else:
            print(f"Already updated {filepath}")

