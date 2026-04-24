# PWA Icons Folder

## Purpose
This folder contains all the application icons used by the Progressive Web App (PWA).

## Required Icons

Place your branded PNG images in this folder with the following filenames and sizes:

### Standard Icons
- `icon-72x72.png` (72×72 pixels)
- `icon-96x96.png` (96×96 pixels)
- `icon-128x128.png` (128×128 pixels)
- `icon-144x144.png` (144×144 pixels)
- `icon-152x152.png` (152×152 pixels)
- `icon-192x192.png` (192×192 pixels)
- `icon-384x384.png` (384×384 pixels)
- `icon-512x512.png` (512×512 pixels)

### Maskable Icons (Adaptive)
These are used for adaptive icon displays on Android devices:
- `icon-192x192-maskable.png` (192×192 pixels)
- `icon-512x512-maskable.png` (512×512 pixels)

### Shortcuts (Optional)
- `shortcut-login-192x192.png` (192×192 pixels)
- `shortcut-dashboard-192x192.png` (192×192 pixels)

## University Branding Colors

Use the following colors for consistency:
- **Primary Color (Deep Blue)**: `#1e3a6e`
- **Secondary Color (Gold)**: `#c9a84c`
- **Background**: White or Transparent

## How to Generate Icons

### Option 1: Using PWA Builder (Recommended)
1. Visit https://www.pwabuilder.com/
2. Upload a high-resolution image (512×512 or larger)
3. Select the colors matching university branding
4. Download the generated icon pack
5. Extract and place PNG files in this folder

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick if not already installed
# Then run:
convert icon-512x512.png -resize 192x192 icon-192x192.png
convert icon-512x512.png -resize 144x144 icon-144x144.png
# ... and so on for other sizes
```

### Option 3: Using Online Tools
1. Visit https://convertio.co/png-converter/ or similar
2. Upload your base image
3. Convert and resize to each required size
4. Place files in this folder

### Option 4: Using Design Software
1. Open Figma, Adobe XD, or Photoshop
2. Create a 512×512 artboard
3. Design your icon with university branding
4. Export as PNG for each required size

## Testing Icons in DevTools

1. Open your app in Chrome/Edge
2. Press `F12` to open DevTools
3. Go to **Application** tab → **Manifest**
4. Scroll down to **Icons** section
5. You should see all icons listed with checkmarks if valid

## Checklist

- [ ] All 8 standard icon sizes created
- [ ] Icons are PNG format (32-bit with alpha channel for transparency)
- [ ] Icons match university branding (Deep Blue #1e3a6e & Gold #c9a84c)
- [ ] File names match exactly (case-sensitive)
- [ ] Icons placed in `public/icons/` folder
- [ ] Tested in DevTools manifest validator
- [ ] Service Worker cache includes icons

## Common Issues

**Icons not showing in DevTools manifest:**
- Verify file names match manifest.json exactly
- Check PNG format and dimensions
- Ensure files are in `public/icons/` folder
- Clear browser cache and reload

**App not installing:**
- Make sure at least 192×192 and 512×512 icons exist
- Verify icons are valid PNG format
- Check manifest is loading (DevTools → Application → Manifest)

## Notes

- Icons should have transparent backgrounds for better appearance
- Maskable icons should have "safe zone" in center (see PWA guidelines)
- Test on both desktop and mobile for best results
- Icons can be updated anytime - just replace PNG files and clear cache
