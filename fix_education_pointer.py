import re

with open('src/pages/Education.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove 'cursor-pointer' and 'education-book-card'
content = content.replace(' cursor-pointer ', ' ')
content = content.replace(' education-book-card', '')

# 2. Move 'relative' from max-w-[1180px] to responsive-card-container
content = content.replace('<div className="relative mx-auto w-full max-w-[1180px] flex-1">', '<div className="mx-auto w-full max-w-[1180px] flex-1">')
content = content.replace('<div className="responsive-card-container w-full">', '<div className="relative responsive-card-container w-full">')

# 3. Move the AnimatePresence block inside responsive-card-container
# Find the end of responsive-card-container (which is </div></div>) and the AnimatePresence block
# We can just use string replace.
old_structure = """              </div>
            </div>

            {/* Absolute Overlay taking full dimensions of the Education Container */}
            <AnimatePresence>"""

new_structure = """              </div>

              {/* Absolute Overlay taking full dimensions of the Education Container */}
              <AnimatePresence>"""

content = content.replace(old_structure, new_structure)

old_structure_end = """              })()}
            </AnimatePresence>

          </div>"""

new_structure_end = """              })()}
              </AnimatePresence>
            </div>
          </div>"""

content = content.replace(old_structure_end, new_structure_end)

with open('src/pages/Education.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Education.tsx")
