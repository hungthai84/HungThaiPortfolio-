import re

with open('src/pages/Memories.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the imports to include PageLayout
content = content.replace('import { cn } from "../lib/utils";', 'import { cn } from "../lib/utils";\nimport { PageLayout } from "../components/PageLayout";')

# Define the new return block starting
new_return = """  const isVi = language === "vi";

  return (
    <PageLayout
      id="memories-main-card"
      pageId="memories"
      pageName={t.nav.memories}
      title={t.nav.memories}
      subtitle={t.navDesc.memories}
      displaySubtitle={isVi ? "Kho lưu trữ dấu ấn" : "Gallery of Milestones"}
      icon={<Camera className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
      rootClassName="w-full max-w-full relative flex flex-1 flex-col transition-all duration-300"
      headerClassName="!py-2 sm:!py-3 md:!py-4 !mb-0 transition-all duration-300"
      headerContainerClassName="!px-0"
      className="custom-scrollbar !h-auto !min-h-0 w-full flex-1 overflow-x-hidden overflow-y-auto"
      hideToolbar={true}
    >
      <div className="w-full max-w-7xl mx-auto pb-8">
        {/* Pinterest-Style Masonry Grid */}"""

# We need to replace everything from "  return (" down to "{/* Pinterest-Style Masonry Grid */}"
# We'll use regex for that.
pattern = r'  return \(\s*<div[^>]*>\s*<div[^>]*>\s*\{\/\* Header Section \*\/\}.*?\{\/\* Pinterest-Style Masonry Grid \*\/\}'
content = re.sub(pattern, new_return, content, flags=re.DOTALL)

# And replace the closing tags.
# Before it was: 
#       </div>
#       <style dangerouslySetInnerHTML={{ __html: `
content = content.replace('      </div>\n      <style dangerouslySetInnerHTML={{', '      </div>\n    </PageLayout>\n    <style dangerouslySetInnerHTML={{')

# Finally, we need to remove the last closing </div> that belonged to the outer container.
# Currently it is:
#       `}} />
#     </div>
#   );
# }
content = content.replace('      `}} />\n    </div>\n  );\n}', '      `}} />\n  );\n}')

with open('src/pages/Memories.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated Memories.tsx")

