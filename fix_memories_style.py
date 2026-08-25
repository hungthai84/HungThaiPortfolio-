import re

with open('src/pages/Memories.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Currently it looks like:
#       </div>
#     </PageLayout>
#     <style dangerouslySetInnerHTML={{ __html: `

# We want:
#       </div>
#       <style dangerouslySetInnerHTML={{ __html: `

# And at the bottom:
#       `}} />
#     </PageLayout>
#   );

content = content.replace('      </div>\n    </PageLayout>\n    <style', '      </div>\n      <style')
content = content.replace('      `}} />\n  );\n}', '      `}} />\n    </PageLayout>\n  );\n}')

with open('src/pages/Memories.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed Memories.tsx style tag location")
