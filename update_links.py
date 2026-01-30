
import os

target_files = [
    "index.html",
    "sprayzet.html",
    "evershine.html",
    "twinzy.html",
    "twin-tapes.html",
    "tapes.html", 
    "about-us.html" # Just in case it has nav/footer
]

root_dir = "c:\\Users\\sravi\\Downloads\\Twin"

# Mappings (old -> new)
# Note: I'm replacing the hrefs.
replacements = {
    '"industrial-maintenance.html"': '"sprayzet.html"',
    "'industrial-maintenance.html'": "'sprayzet.html'",
    
    '"car-care.html"': '"evershine.html"',
    "'car-care.html'": "'evershine.html'",

    '"tapes.html"': '"twin-tapes.html"', # Assuming tapes.html is old reference
    "'tapes.html'": "'twin-tapes.html'", 
    
    # Specific Twinzy updates if they were # or placeholder
    # But usually replacing filename is enough.
    # The user asked to ensure links are correct.
}

# The user explicitly said:
# sprayzet.html linked to sprayzet
# evershine.html linked to evershine
# twinzy.html linked to twinzy
# twin-tapes.html to twin Tapes

# I will also do a regex based replace or string search to ensure the menu items have correct hrefs.
# A more robust way is to read the file, find the nav/footer sections, and update links based on text if possible,
# or just global replace of the known old filenames which I just renamed.

for filename in target_files:
    file_path = os.path.join(root_dir, filename)
    if not os.path.exists(file_path):
        continue
        
    print(f"Processing {filename}...")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    original_content = content
    
    # Apply substitutions
    for old, new in replacements.items():
        content = content.replace(old, new)

    # Specific fixes for empty links/placeholders if they exist
    # User might have had href="#"
    
    # Fix Evershine links
    # Look for Evershine text and ensure href is evershine.html
    # This is tricky with simple replace, but let's try to fix exact matches from standard navbar
    
    # Standard Nav Pattern: <li><a href="...">...Evershine...</a></li>
    # I'll rely on global filename replacements first. 
    # If the user used "industrial-maintenance.html" in the past, it's now "sprayzet.html".
    
    # Check specific user request regarding "linked to" - this implies previously broken or placeholder links might exist.
    # In index.html read above: 
    # <li><a href="#">...SprayZet...</a></li>  <-- Needs fix
    # <li><a href="#">...Twin Tapes...</a></li> <-- Needs fix
    # <li><a href="#">...Silox...</a></li>
    # <li><a href="#">...Twinzy...</a></li> <-- Needs fix
    # <li><a href="#">...Everhine...</a></li> (Typo in index.html footer: Everhine)

    # Let's fix these specifically.
    
    # Nav/Footer Link Fixes
    # SprayZet
    content = content.replace('href="#"><span>', 'href="PLACEHOLDER"><span>') # Temp protect
    
    # Restore and fix
    # Since the structure is consistent: <a href="#">...Text...</a>
    # I will replace specific blocks.
    
    # Evershine
    # Note check index.html from read_file output:
    # Footer: <li><a href="#">...Everhine</a></li> (Typo!)
    # Nav: <li><a href="industrial-maintenance.html">...Evershine</a></li> (Wait, industrial-maintenance was Evershine??)
    # Let's check logic:
    # In previous turns: 
    # industrial-maintenance.html was created first (SprayZet logic?? No wait)
    # Let's re-read conversation.
    # Turn 1: "industrial-maintenance.html" -> User asked to apply "SprayZet" products there later? 
    # Actually, in Turn 1 analysis: "Industrial Maintenance (SprayZet)". 
    # So `industrial-maintenance.html` IS SprayZet.
    
    # In `index.html` (read above):
    # <ul class="dropdown-menu">
    # 	<li><a href="industrial-maintenance.html">...Evershine</a></li>  <-- WRONG?
    #   <li><a href="car-care.html">...SprayZet</a></li> <-- WRONG?
    
    # Wait, let's look at `index.html` lines 100-150 in the snippet I just read.
    # It shows footer links:
    # <li><a href="#">...Everhine</a></li>
    # <li><a href="#">...SprayZet</a></li>
    
    # I need to carefuly map visually.
    # "SprayZet" -> sprayzet.html
    # "Evershine" -> evershine.html
    # "Twinzy" -> twinzy.html
    # "Twin Tapes" -> twin-tapes.html
    
    # Strategy: Find the text, look behind for `href="..."` and replace.
    
    import re
    
    def repl_link(match, target_file):
        # match.group(0) is the whole A tag. 
        # We replace the href part.
        return re.sub(r'href="[^"]*"', f'href="{target_file}"', match.group(0))

    # 1. SprayZet
    # Matches: ...SprayZet... inside <a>
    # Pattern: <a [^>]*>.*?SprayZet.*?</a>
    # Note: re.DOTALL to match across lines
    content = re.sub(r'<a [^>]*href="[^"]*"[^>]*>(.*?)SprayZet(.*?)</a>', lambda m: re.sub(r'href="[^"]*"', 'href="sprayzet.html"', m.group(0)), content, flags=re.DOTALL|re.IGNORECASE)

    # 2. Evershine (and typos like Everhine)
    content = re.sub(r'<a [^>]*href="[^"]*"[^>]*>(.*?)Ever.*?hine(.*?)</a>', lambda m: re.sub(r'href="[^"]*"', 'href="evershine.html"', m.group(0)), content, flags=re.DOTALL|re.IGNORECASE)
    
    # 3. Twin Tapes
    content = re.sub(r'<a [^>]*href="[^"]*"[^>]*>(.*?)Twin Tapes(.*?)</a>', lambda m: re.sub(r'href="[^"]*"', 'href="twin-tapes.html"', m.group(0)), content, flags=re.DOTALL|re.IGNORECASE)

    # 4. Twinzy
    content = re.sub(r'<a [^>]*href="[^"]*"[^>]*>(.*?)Twinzy(.*?)</a>', lambda m: re.sub(r'href="[^"]*"', 'href="twinzy.html"', m.group(0)), content, flags=re.DOTALL|re.IGNORECASE)

    if content != original_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filename}")
    else:
        print(f"No changes in {filename}")

print("Batch update complete.")
