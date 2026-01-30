Embedding Twin 3D in WordPress / Elementor

Overview
- `assets/twin-3d.js` is a portable ES module-like script (self-contained IIFE) that dynamically imports Three.js, loaders, and GSAP, then injects the scene into your page.

Quick steps
1. Upload the `assets` folder (with `twin-3d.js`, `neutral.hdr`, `Black_Can.glb`, `Red_Can.glb`, `Brown_Tape.glb`, and `font` files) to your WordPress site (e.g., via Media Library or in your theme folder).
2. In Elementor, add an HTML widget where you want the experience to appear and paste either:

Option A — load hosted script

<script type="module">
window.TWIN3D_OPTIONS = { containerId: 'twin-3d-root', assetsPath: '/wp-content/uploads/twin-assets' };
import '/wp-content/uploads/twin-assets/twin-3d.js';
</script>

Option B — reference script as non-module (if uploaded to theme and enqueued)

<script type="module" src="/wp-content/uploads/twin-assets/twin-3d.js"></script>

Notes
- If hosting under HTTPS, ensure asset URLs are HTTPS.
- For performance, host GLB and HDR assets on the same domain to avoid CORS issues.
- If you prefer to enqueue the script via functions.php, register it with `wp_enqueue_script` specifying `type="module"`.

Troubleshooting
- If the 3D models do not load when previewing locally via file://, use fallback geometry or host assets on a server.
- If GSAP/ScrollTrigger doesn't work, verify the CDN loads and no CSP blocks inline scripts.

If you want, I can:
- Add a small WordPress `functions.php` snippet to enqueue the script.
- Minify the JS and produce a single-file bundle for easier upload.
