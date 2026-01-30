import os
import json
import urllib.parse

gallery_root = r"c:\Users\sravi\Downloads\Twin\GALLERY"
output_file = r"c:\Users\sravi\Downloads\Twin\gallery-data.js"

gallery_data = []

# Map folders to exact category names requested
category_map = {
    "CSR ACTIVITIES": "CSR ACTIVITIES",
    "EVENTS AND CELEBRATION": "EVENTS AND CELEBRATION", 
    "EXHIBITIONS & TRADESHOWS": "EXHIBITIONS & TRADESHOWS",
    "TWIN STAFF": "TWIN STAFF"
}

# Supported image extensions
valid_extensions = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

for folder_name in os.listdir(gallery_root):
    folder_path = os.path.join(gallery_root, folder_name)
    if os.path.isdir(folder_path):
        category = category_map.get(folder_name)
        if category:
            for filename in os.listdir(folder_path):
                ext = os.path.splitext(filename)[1].lower()
                if ext in valid_extensions:
                    # Construct relative path for browser. 
                    # Assuming gallery.html is at root and images are in GALLERY/Folder/
                    relative_path = f"GALLERY/{folder_name}/{filename}"
                    # Encode URL components to handle spaces and special chars
                    safe_path = urllib.parse.quote(relative_path)
                    
                    gallery_data.append({
                        "category": category,
                        "src": relative_path  # Browser handles spaces in src usually, but good to be aware
                    })

# Write to JS file
js_content = f"const galleryData = {json.dumps(gallery_data, indent=2)};"

with open(output_file, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated gallery data with {len(gallery_data)} images at {output_file}")
