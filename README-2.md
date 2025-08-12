# TNG Adventure — Full PWA v2.5.1 (Settings)

**Drop-in update:** Upload these files to your repo root and overwrite existing ones. Commit and push. GitHub Pages will serve the new version.

What’s new
- ⚙️ **Settings panel** (HUD → “Settings”):  
  - Image Quality: **Auto / Standard only / High-res preferred**  
  - Portrait Style: **Painted** (image assets) **or** **Classic pixel** (canvas)  
  - Mute toggle (mirrors the HUD switch)
- Settings persist per device via `localStorage` and apply immediately.

Files
- `index.html` (full ES5 game with Settings)
- `assets/backgrounds/*` (bridge/away/combat 800 & 1600)
- `assets/portraits/*` (128 & 256 for six crew)
- `sw.js` (cache v2.5.1), `manifest.webmanifest`, `icons/`

Deploy
```bash
git add .
git commit -m "Deploy TNG PWA v2.5.1 (Settings panel)"
git push origin main
```
If Pages isn’t enabled yet: Settings → Pages → Deploy from branch → **main** → **/(root)**.
