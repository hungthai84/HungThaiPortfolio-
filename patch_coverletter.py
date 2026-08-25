import re

files = [
    'src/pages/CoverLetter.tsx',
    'src/components/coverLetter/CareerTimeline.tsx',
    'src/components/coverLetter/CoreValuesSection.tsx'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace bg-[var(--card)]/90 dark:bg-slate-900/90 backdrop-blur-xl ... with !bg-transparent !border-none !shadow-none
    content = re.sub(
        r'bg-\[var\(--card\)\]/90\s+dark:bg-slate-900/90\s+backdrop-blur-xl',
        r'!bg-transparent !border-none !shadow-none backdrop-blur-none',
        content
    )
    content = re.sub(
        r'border-\[var\(--border\)\]',
        r'!border-none',
        content
    )
    content = re.sub(
        r'shadow-lg',
        r'!shadow-none',
        content
    )
    # in CareerTimeline: border-[var(--border)] and bg-[var(--card)]/90 etc
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Patched.")
