# Troubleshooting - Stradello Blog

## Cache Issues on Vercel Main Domain

### Problem
Images not appearing on main domain (https://www.stradello.com.br/) but working on:
- Mobile
- Preview URL (https://stradello-blog-*.vercel.app/)
- Local development

### Solution
Rename the image file with a version suffix (e.g., `-v2.jpg`) to force a new URL and bypass persistent cache.

### Steps
1. Rename the image file:
   ```powershell
   Rename-Item "public/assets/blog/image-name.jpg" "image-name-v2.jpg"
   ```

2. Update the frontmatter in the markdown file:
   ```yaml
   heroImage: "/assets/blog/image-name-v2.jpg"
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "fix: rename hero image to v2 to bypass cache"
   git push
   ```

### Alternative Solution
Add cache control headers in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/blog/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### Notes
- The version suffix method is more reliable for immediate fixes
- Cache headers help prevent future cache issues
- Always test on both preview URL and main domain after changes
