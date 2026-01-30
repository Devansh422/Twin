/*
Portable Twin 3D embed script
Usage: include this file as a module in WordPress (enqueue/upload) or paste into Elementor HTML widget
- Option A (recommended): Upload this file to your theme or media and enqueue with <script type="module" src="/path/to/twin-3d.js"></script>
- Option B: Paste the minimal HTML snippet from README into an Elementor HTML block and point src to hosted file

The script auto-loads Three.js, loaders, and GSAP from CDN and builds the scene inside a container element with id "twin-3d-root".
You can pass options via a global `window.TWIN3D_OPTIONS` object before the script runs, e.g.:
window.TWIN3D_OPTIONS = { containerId: 'my-root', assetsPath: '/wp-content/uploads/twin-assets' }
*/

(async function() {
    // -- Config (can be overridden by window.TWIN3D_OPTIONS) --
    const defaults = {
        containerId: 'twin-3d-root',
        assetsPath: './assets', // base folder where assets live (used when per-file URLs not provided)
        // Optional per-file overrides. If provided, these should be full URLs or paths.
        models: {
            primary: null,   // e.g. '/wp-content/uploads/Black_Can.glb' or full URL
            secondary: null, // e.g. '/wp-content/uploads/Red_Can.glb'
            tape: null       // e.g. '/wp-content/uploads/Brown_Tape.glb'
        },
        // optional HDR override (full URL or path). If null, will load assetsPath/neutral.hdr
        hdrUrl: null,
        threeVersion: '0.154.0',
        gsapCdn: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2',
    };
    const opts = Object.assign({}, defaults, window.TWIN3D_OPTIONS || {});

    // -- Helper to load plain script tags (for GSAP which we use non-module) --
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            if (document.querySelector('script[src="' + url + '"]')) return resolve();
            const s = document.createElement('script');
            s.src = url;
            s.async = false;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error('Failed to load ' + url));
            document.head.appendChild(s);
        });
    }

    // -- Ensure browser can resolve the 'three' specifier used by examples/jsm files --
    const threeBase = `https://unpkg.com/three@${opts.threeVersion}`;
    const importMap = {
        imports: {
            'three': `${threeBase}/build/three.module.js`,
            'three/addons/': `${threeBase}/examples/jsm/`
        }
    };
    // inject dynamic importmap (if one with same mapping not already present)
    const existingMap = Array.from(document.querySelectorAll('script[type="importmap"]')).some(s => s.textContent && s.textContent.includes('"three"'));
    if (!existingMap) {
        const mapScript = document.createElement('script');
        mapScript.type = 'importmap';
        mapScript.textContent = JSON.stringify(importMap);
        document.currentScript && document.currentScript.parentNode ? document.currentScript.parentNode.insertBefore(mapScript, document.currentScript) : document.head.appendChild(mapScript);
    }

    // Now import using the mapped specifiers so internal imports like `import { Matrix4 } from 'three'` resolve.
    const THREE = await import('three');
    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js');
    const { RGBELoader } = await import('three/addons/loaders/RGBELoader.js');

    // -- Load GSAP (non-module) and ScrollTrigger plugin --
    await loadScript(`${opts.gsapCdn}/gsap.min.js`);
    await loadScript(`${opts.gsapCdn}/ScrollTrigger.min.js`);
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (gsap && ScrollTrigger && typeof gsap.registerPlugin === 'function') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // -- Resolve scope and insertion elements --
    // If the page already contains <div id="animation-container-main"> inside a
    // .main-display-area, use that structure. Otherwise create a new scoped root.
    let scopeEl = null;     // element that will receive the id used for CSS scoping
    let insertionEl = null; // element where inner HTML (left/right) will be inserted

    const existingAnim = document.getElementById('animation-container-main');
    if (existingAnim) {
        insertionEl = existingAnim;
        const parent = existingAnim.closest('.main-display-area') || existingAnim.parentElement;
        if (parent) {
            scopeEl = parent;
            if (!scopeEl.id) {
                scopeEl.id = opts.containerId;
            } else {
                opts.containerId = scopeEl.id;
            }
        } else {
            scopeEl = existingAnim;
            opts.containerId = scopeEl.id || opts.containerId;
        }
    } else {
        scopeEl = document.getElementById(opts.containerId);
        if (!scopeEl) {
            scopeEl = document.createElement('div');
            scopeEl.id = opts.containerId;
            document.body.prepend(scopeEl);
        }
        insertionEl = scopeEl;
    }

    // -- Inject CSS (scoped to root via id) --
    const injectedStyles = `
#${opts.containerId} *{box-sizing:border-box}
#${opts.containerId} { --color:#ED1D21; position:relative; overflow:hidden; }
#${opts.containerId} .main-display-area{position:relative}
#${opts.containerId} .left-content-side{width:50%;}
#${opts.containerId} .right-canvas-side{position:fixed;top:0;left:50%;width:50%;height:100vh;z-index:1;display:flex;align-items:center;justify-content:center;background:#f5f5f5;pointer-events:none;opacity:0;transition:opacity .3s}
#${opts.containerId} #threejs-viewport{display:block;width:100%;height:100%;outline:none;pointer-events:none}
#${opts.containerId} .scrollable-sections{position:relative;z-index:3;width:100%;background:var(--color);scroll-snap-type:y mandatory}
#${opts.containerId} .content-panel{min-height:100vh;height:100vh;display:flex;width:50%;flex-direction:column;align-items:flex-start;justify-content:center;font-size:4rem;pointer-events:auto;width:100%;padding:0 8vw;box-sizing:border-box;text-align:left;overflow-wrap:break-word;color:white;scroll-snap-align:start;scroll-snap-stop:always}
#${opts.containerId} .content-panel h1{margin:0;font-weight:800;letter-spacing:-2px;color:white;font-size:4rem;line-height:1.1}
#${opts.containerId} .content-panel p{font-size:1.5rem;opacity:0.9;font-weight:300;margin-top:8px;color:white;line-height:1.45}
@media (max-width:1024px){
#${opts.containerId} .right-canvas-side{position:fixed;width:100%;height:50vh;left:0;top:0;z-index:10}
#${opts.containerId} .scrollable-sections{padding-top:50vh}
#${opts.containerId} .content-panel{width:100%;font-size:1.1rem;padding:0 8vw;text-align:center}
}
`;
    const styleEl = document.createElement('style');
    styleEl.innerText = injectedStyles;
    document.head.appendChild(styleEl);

    // -- Build inner HTML structure inside root --
    // If we were given an existing `#animation-container-main`, insert the
    // left/right content into that inner element so we don't duplicate the
    // surrounding `.main-display-area`. Otherwise create the full wrapper.
    if (document.getElementById('animation-container-main')) {
        insertionEl.innerHTML = `
            <div class="left-content-side">
                <div class="scrollable-sections">
                    <div class="content-panel"><div class="reveal-inner"><h1>Discover Excellence</h1><p>Scroll to explore our journey</p></div></div>
                    <div class="content-panel"><div class="reveal-inner"><h1>SPRAYZET</h1><p>Industrial MRO <span style="font-weight:700">Aerosols</span></p></div></div>
                    <div class="content-panel"><div class="reveal-inner"><h1>Engineered to Perform.</h1><p>Built to Endure.</p><p style="max-width:90%">SPRAYZET by Twin Tech provides high-performance, eco-friendly industrial maintenance aerosols for equipment care, lubrication, and protection.</p></div></div>
                    <div class="content-panel"><div class="reveal-inner"><h1>From Industry to Elegance</h1><p>Where Performance Meets Perfection</p></div></div>
                    <div class="content-panel"><div class="reveal-inner"><h1>EVERSHINE</h1><p>Car Care <span style="font-weight:700">Products</span></p></div></div>
                    <div class="content-panel"><div class="reveal-inner"><h1>Shine That You</h1><p>Can Feel.</p><p style="max-width:90%">Evershine is a premium car care brand offering advanced products that clean, protect, and enhance every surface of your vehicle.</p></div></div>
                    <div class="content-panel"><div class="reveal-inner"><h1>Built to Bond</h1><p>Engineered to Hold</p></div></div>
                    <div class="content-panel"><div class="reveal-inner"><h1>TWIN TAPE</h1><p>Industrial <span style="font-weight:700">Adhesive Solutions</span></p></div></div>
                    <div class="content-panel"><div class="reveal-inner"><h1>Bonds That Last.</h1><p>Trust That Holds.</p></div></div>
                    <div class="content-panel" style="opacity:0"><div class="reveal-inner"><h1>Three Brands.</h1><p>One Vision of Excellence.</p></div></div>
                </div>
                </div>
            </div>
            <div class="right-canvas-side"><canvas id="threejs-viewport"></canvas></div>
        `;
    } else {
        scopeEl.innerHTML = `
            <div class="main-display-area" style="position:relative">
                <div id="animation-container-main" style="position:relative; z-index:2;">
                    <div class="left-content-side">
                        <div class="scrollable-sections">
                            <!-- panels will be injected -->
                        </div>
                    </div>
                    <div class="right-canvas-side"><canvas id="threejs-viewport"></canvas></div>
                </div>
            </div>
        `;
        insertionEl = scopeEl.querySelector('#animation-container-main');
    }

    // -- 3D Setup (adapted from original file) --
    const renderCanvas = insertionEl.querySelector('#threejs-viewport');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0,0,5);

    const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas, antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    function resize() {
        const width = renderCanvas.clientWidth || window.innerWidth;
        const height = renderCanvas.clientHeight || window.innerHeight;
        const safeH = Math.max(1, height);
        camera.aspect = Math.max(0.0001, width / safeH);
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, safeH, false);
    }
    window.addEventListener('resize', () => { resize(); if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });
    resize();

    // Environment
    const rgbeLoader = new RGBELoader();
    // Load HDR: prefer explicit `opts.hdrUrl` if provided, otherwise load from assetsPath/neutral.hdr
    if (opts.hdrUrl) {
        rgbeLoader.load(opts.hdrUrl, function(tex){ tex.mapping = THREE.EquirectangularReflectionMapping; scene.environment = tex; scene.background = null; }, undefined, () => {});
    } else {
        rgbeLoader.setPath(opts.assetsPath + '/');
        rgbeLoader.load('neutral.hdr', function(tex){ tex.mapping = THREE.EquirectangularReflectionMapping; scene.environment = tex; scene.background = null; }, undefined, () => {});
    }

    const gltfLoader = new GLTFLoader();
    const group = new THREE.Group();
    scene.add(group);

    function generateFallback(color){
        const geo = new THREE.CylinderGeometry(0.8,0.8,2.5,32);
        const mat = new THREE.MeshStandardMaterial({ color, metalness:0.2, roughness:0.3 });
        return new THREE.Mesh(geo, mat);
    }
    function generateTape(color){
        const g = new THREE.CylinderGeometry(0.6,0.6,0.4,32);
        const m = new THREE.MeshStandardMaterial({ color, metalness:0.15, roughness:0.4 });
        const mesh = new THREE.Mesh(g,m); mesh.rotation.x = Math.PI/2; return mesh;
    }

    const isFile = location.protocol === 'file:';
    let firstModel, secondModel, tapeModel;

    async function loadModel(path, fallbackColor){
        try{
            const gltf = await new Promise((res,rej)=> gltfLoader.load(path, res, undefined, rej));
            const model = gltf.scene;
            model.traverse(n=>{ if(n.isMesh){ n.castShadow=true; n.receiveShadow=true; if(n.material){ n.material.envMapIntensity=1; n.material.roughness=0.3; n.material.metalness=0.3; }}});
            const bbox = new THREE.Box3().setFromObject(model);
            const dims = bbox.getSize(new THREE.Vector3());
            const largest = Math.max(dims.x,dims.y,dims.z) || 1;
            const scale = 2.5 / largest;
            model.scale.set(scale,scale,scale);
            const center = bbox.getCenter(new THREE.Vector3());
            model.position.sub(center.multiplyScalar(scale));
            return model;
        } catch(e){ return generateFallback(fallbackColor); }
    }

    if (isFile) {
        firstModel = generateFallback(0xff3333);
        secondModel = generateFallback(0x3388ff);
        tapeModel = generateTape(0x996633);
        group.add(firstModel); group.add(secondModel); scene.add(tapeModel);
        secondModel.visible = false; secondModel.rotation.copy(firstModel.rotation);
        group.position.y = -10; group.rotation.y = Math.PI;
        tapeModel.position.set(-6,-1.5,0);
        initScrollAnim();
    } else {
        const base = opts.assetsPath.replace(/\/$/, '') + '/';
        const primaryUrl = opts.models && opts.models.primary ? opts.models.primary : base + 'Black_Can.glb';
        const secondaryUrl = opts.models && opts.models.secondary ? opts.models.secondary : base + 'Red_Can.glb';
        const tapeUrl = opts.models && opts.models.tape ? opts.models.tape : base + 'Brown_Tape.glb';

        Promise.all([
            loadModel(primaryUrl, 0xff3333),
            loadModel(secondaryUrl, 0x3388ff),
            loadModel(tapeUrl, 0x996633)
        ]).then(([a,b,c])=>{
            firstModel = a; secondModel = b; tapeModel = c;
            group.add(firstModel); group.add(secondModel); scene.add(tapeModel);
            secondModel.visible = false; secondModel.rotation.copy(firstModel.rotation);
            group.position.y = -10; group.rotation.y = Math.PI;
            tapeModel.position.set(-6,-1.5,0);
            initScrollAnim();
        });
    }

    function initScrollAnim(){
        const panels = insertionEl.querySelectorAll('.content-panel');
        const canvasSide = insertionEl.querySelector('.right-canvas-side');
        const mainDisplay = (scopeEl.classList && scopeEl.classList.contains('main-display-area')) ? scopeEl : scopeEl.querySelector('.main-display-area') || scopeEl;
        const sectionsEl = insertionEl.querySelector('.scrollable-sections');

        // Create a responsive set of ScrollTrigger handlers using matchMedia
        if (window.ScrollTrigger && typeof ScrollTrigger.matchMedia === 'function') {
            ScrollTrigger.matchMedia({
                // Mobile behavior
                "(max-width: 1024px)": function() {
                    const created = [];
                    panels.forEach((panel) => {
                        const reveal = panel.querySelector('.reveal-inner');
                        gsap.set(reveal, { y: 30, opacity: 0 });
                        const tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: 'top top', end: 'bottom top', scrub: true, pin: true, pinSpacing: false } });
                        tl.to(reveal, { y:0, opacity:1, ease:'power2.out', duration:0.35 });
                        tl.to(reveal, { y:0, opacity:1, duration:0.3 });
                        tl.to(reveal, { y:-30, opacity:0, ease:'power2.in', duration:0.35 });
                        created.push(tl);
                    });

                    const canvasTrigger = ScrollTrigger.create({ trigger: mainDisplay, start: 'top top', end: 'bottom bottom', onEnter: ()=> gsap.to(canvasSide,{opacity:1,duration:0.3}), onLeave: ()=> gsap.to(canvasSide,{opacity:0,duration:0.3}), onEnterBack: ()=> gsap.to(canvasSide,{opacity:1,duration:0.3}), onLeaveBack: ()=> gsap.to(canvasSide,{opacity:0,duration:0.3}) });
                    created.push(canvasTrigger);

                    const master = gsap.timeline({ scrollTrigger: { trigger: sectionsEl, start:'top top', end:'bottom bottom', scrub:1 } });
                    created.push(master);
                    // build animation on master (same as desktop)
                    master.to(group.position, { y:0, duration:0.8, ease:'power3.out' });
                    master.to(group.rotation, { y:0, z:0.1, duration:0.9, ease:'power3.out' }, '<');
                    master.to(group.rotation, { y: Math.PI * 2.2, x:-0.2, z:0, duration:0.9, ease:'sine.inOut' });
                    master.to(camera.position, { z:3.0, y:0.2, duration:1, ease:'power2.inOut' }, 'cinematic');
                    master.to(group.rotation, { z:-0.3, y: Math.PI * 4, duration:1, ease:'power2.inOut' }, 'cinematic');
                    master.to(group.rotation, { y: Math.PI * 4, duration:1, ease:'power2.in' }, 'swapStart');
                    master.to(group.rotation, { y: Math.PI * 8, duration:2, ease:'power2.inOut', onUpdate:function(){ const p=this.progress(); if (p>0.5 && firstModel && firstModel.visible){ firstModel.visible=false; secondModel.visible=true; } else if (p<0.5 && firstModel && !firstModel.visible){ firstModel.visible=true; secondModel.visible=false; } } }, 'swapSpin');
                    master.to(camera.position, { z:6.5, duration:1, yoyo:true, repeat:1, ease:'power2.inOut' }, 'swapSpin');
                    master.to(group.rotation, { y: Math.PI * 10, x:0, z:0, duration:2.4, ease:'power3.out' }, 'settle');
                    master.to(camera.position, { z:4, y:0, duration:2.4, ease:'power3.out' }, 'settle');
                    master.to(group.position, { x:2, y:0, duration:1, ease:'sine.inOut' }, 'final');
                    master.to(group.rotation, { y: Math.PI * 15, duration:1, ease:'sine.inOut' }, 'final');
                    master.to(group.position, { x:20, duration:1.5, ease:'power2.in' }, 'canExit');
                    master.to(group.rotation, { y: Math.PI * 18, duration:1.5, ease:'linear' }, 'canExit');

                    if (tapeModel) {
                        tapeModel.position.set(-8,0,0); tapeModel.rotation.set(0,0,0);
                        master.to(tapeModel.position, { x:0, y:-0.5, z:-4, duration:1.5, ease:'power2.out' }, 'canExit');
                        master.to(tapeModel.rotation, { y: Math.PI * 3.8, x:0.5, duration:1.5, ease:'none' }, 'canExit');
                        master.to(tapeModel.position, { z:0, duration:1.2, ease:'power2.inOut' }, 'tapeZoom');
                        master.to(tapeModel.rotation, { y: Math.PI * 5.2, duration:1.2, ease:'sine.inOut' }, 'tapeZoom');
                        master.to(tapeModel.position, { z:-4, duration:1.2, ease:'power2.inOut' }, 'tapeZoomOut');
                        master.to(tapeModel.rotation, { y: Math.PI * 7, duration:1.2, ease:'sine.inOut' }, 'tapeZoomOut');
                        master.to(tapeModel.position, { x:10, y:2, z:0, duration:1.5, ease:'power2.in' }, 'tapeRollOut');
                        master.to(tapeModel.rotation, { y: Math.PI * 8, duration:1.5, ease:'none' }, 'tapeRollOut');
                    }

                    return function() {
                        created.forEach(item=>{ try{ if (item.kill) item.kill(); else if (item.refresh) item.refresh(); } catch(e){} });
                    };
                },

                // Desktop behavior
                "(min-width: 1025px)": function() {
                    const created = [];
                    panels.forEach((panel, index) => {
                        const reveal = panel.querySelector('.reveal-inner');
                        const isLast = index === panels.length - 1;
                        gsap.set(reveal, { y: 40, opacity: 0 });
                        const start = 'top top'; const end = isLast ? 'bottom bottom' : 'bottom top';
                        const trig = ScrollTrigger.create({ trigger: panel, start: start, end: end, pin: true, pinSpacing: false,
                            onEnter: ()=> gsap.fromTo(reveal,{y:40,opacity:0},{y:0,opacity:1,duration:0.6,ease:'power2.out',overwrite:true}),
                            onLeave: ()=> gsap.to(reveal,{y:-40,opacity:0,duration:0.25,ease:'power2.in',overwrite:true}),
                            onEnterBack: ()=> gsap.fromTo(reveal,{y:-40,opacity:0},{y:0,opacity:1,duration:0.2,ease:'power2.out',overwrite:true}),
                            onLeaveBack: ()=> gsap.to(reveal,{y:40,opacity:0,duration:0.25,ease:'power2.in',overwrite:true})
                        });
                        created.push(trig);
                    });

                    const canvasTrigger = ScrollTrigger.create({ trigger: mainDisplay, start: 'top top', end: 'bottom bottom', onEnter: ()=> gsap.to(canvasSide,{opacity:1,duration:0.3}), onLeave: ()=> gsap.to(canvasSide,{opacity:0,duration:0.3}), onEnterBack: ()=> gsap.to(canvasSide,{opacity:1,duration:0.3}), onLeaveBack: ()=> gsap.to(canvasSide,{opacity:0,duration:0.3}) });
                    created.push(canvasTrigger);

                    const master = gsap.timeline({ scrollTrigger: { trigger: sectionsEl, start:'top top', end:'bottom bottom', scrub:1 } });
                    created.push(master);
                    // build animation on master (same as mobile)
                    master.to(group.position, { y:0, duration:0.8, ease:'power3.out' });
                    master.to(group.rotation, { y:0, z:0.1, duration:0.9, ease:'power3.out' }, '<');
                    master.to(group.rotation, { y: Math.PI * 2.2, x:-0.2, z:0, duration:0.9, ease:'sine.inOut' });
                    master.to(camera.position, { z:3.0, y:0.2, duration:1, ease:'power2.inOut' }, 'cinematic');
                    master.to(group.rotation, { z:-0.3, y: Math.PI * 4, duration:1, ease:'power2.inOut' }, 'cinematic');
                    master.to(group.rotation, { y: Math.PI * 4, duration:1, ease:'power2.in' }, 'swapStart');
                    master.to(group.rotation, { y: Math.PI * 8, duration:2, ease:'power2.inOut', onUpdate:function(){ const p=this.progress(); if (p>0.5 && firstModel && firstModel.visible){ firstModel.visible=false; secondModel.visible=true; } else if (p<0.5 && firstModel && !firstModel.visible){ firstModel.visible=true; secondModel.visible=false; } } }, 'swapSpin');
                    master.to(camera.position, { z:6.5, duration:1, yoyo:true, repeat:1, ease:'power2.inOut' }, 'swapSpin');
                    master.to(group.rotation, { y: Math.PI * 10, x:0, z:0, duration:2.4, ease:'power3.out' }, 'settle');
                    master.to(camera.position, { z:4, y:0, duration:2.4, ease:'power3.out' }, 'settle');
                    master.to(group.position, { x:2, y:0, duration:1, ease:'sine.inOut' }, 'final');
                    master.to(group.rotation, { y: Math.PI * 15, duration:1, ease:'sine.inOut' }, 'final');
                    master.to(group.position, { x:20, duration:1.5, ease:'power2.in' }, 'canExit');
                    master.to(group.rotation, { y: Math.PI * 18, duration:1.5, ease:'linear' }, 'canExit');

                    if (tapeModel) {
                        tapeModel.position.set(-8,0,0); tapeModel.rotation.set(0,0,0);
                        master.to(tapeModel.position, { x:0, y:-0.5, z:-4, duration:1.5, ease:'power2.out' }, 'canExit');
                        master.to(tapeModel.rotation, { y: Math.PI * 3.8, x:0.5, duration:1.5, ease:'none' }, 'canExit');
                        master.to(tapeModel.position, { z:0, duration:1.2, ease:'power2.inOut' }, 'tapeZoom');
                        master.to(tapeModel.rotation, { y: Math.PI * 5.2, duration:1.2, ease:'sine.inOut' }, 'tapeZoom');
                        master.to(tapeModel.position, { z:-4, duration:1.2, ease:'power2.inOut' }, 'tapeZoomOut');
                        master.to(tapeModel.rotation, { y: Math.PI * 7, duration:1.2, ease:'sine.inOut' }, 'tapeZoomOut');
                        master.to(tapeModel.position, { x:10, y:2, z:0, duration:1.5, ease:'power2.in' }, 'tapeRollOut');
                        master.to(tapeModel.rotation, { y: Math.PI * 8, duration:1.5, ease:'none' }, 'tapeRollOut');
                    }

                    return function() {
                        created.forEach(item=>{ try{ if (item.kill) item.kill(); else if (item.refresh) item.refresh(); } catch(e){} });
                    };
                }
            });
        } else {
            // Fallback: previous behavior when ScrollTrigger.matchMedia not available
            panels.forEach((panel, index)=>{
                const reveal = panel.querySelector('.reveal-inner');
                const isMobile = window.matchMedia('(max-width:1024px)').matches;
                gsap.set(reveal, { y: isMobile ? 30 : 40, opacity: 0 });
                if (isMobile) {
                    const tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: 'top top', end: 'bottom top', scrub: true, pin: true, pinSpacing: false } });
                    tl.to(reveal, { y:0, opacity:1, ease:'power2.out', duration:0.35 });
                    tl.to(reveal, { y:0, opacity:1, duration:0.3 });
                    tl.to(reveal, { y:-30, opacity:0, ease:'power2.in', duration:0.35 });
                } else {
                    const start = 'top top'; const end = index === panels.length - 1 ? 'bottom bottom' : 'bottom top';
                    ScrollTrigger.create({ trigger: panel, start: start, end: end, pin: true, pinSpacing: false,
                        onEnter: ()=> gsap.fromTo(reveal,{y:40,opacity:0},{y:0,opacity:1,duration:0.6,ease:'power2.out',overwrite:true}),
                        onLeave: ()=> gsap.to(reveal,{y:-40,opacity:0,duration:0.25,ease:'power2.in',overwrite:true}),
                        onEnterBack: ()=> gsap.fromTo(reveal,{y:-40,opacity:0},{y:0,opacity:1,duration:0.2,ease:'power2.out',overwrite:true}),
                        onLeaveBack: ()=> gsap.to(reveal,{y:40,opacity:0,duration:0.25,ease:'power2.in',overwrite:true})
                    });
                }
            });

            ScrollTrigger.create({ trigger: mainDisplay, start: 'top top', end: 'bottom bottom', onEnter: ()=> gsap.to(canvasSide,{opacity:1,duration:0.3}), onLeave: ()=> gsap.to(canvasSide,{opacity:0,duration:0.3}), onEnterBack: ()=> gsap.to(canvasSide,{opacity:1,duration:0.3}), onLeaveBack: ()=> gsap.to(canvasSide,{opacity:0,duration:0.3}) });

            const tl = gsap.timeline({ scrollTrigger: { trigger: sectionsEl, start:'top top', end:'bottom bottom', scrub:1 } });
        tl.to(group.position, { y:0, duration:0.8, ease:'power3.out' });
        tl.to(group.rotation, { y:0, z:0.1, duration:0.9, ease:'power3.out' }, '<');
        tl.to(group.rotation, { y: Math.PI * 2.2, x:-0.2, z:0, duration:0.9, ease:'sine.inOut' });
        tl.to(camera.position, { z:3.0, y:0.2, duration:1, ease:'power2.inOut' }, 'cinematic');
        tl.to(group.rotation, { z:-0.3, y: Math.PI * 4, duration:1, ease:'power2.inOut' }, 'cinematic');
        tl.to(group.rotation, { y: Math.PI * 4, duration:1, ease:'power2.in' }, 'swapStart');
        tl.to(group.rotation, { y: Math.PI * 8, duration:2, ease:'power2.inOut', onUpdate:function(){ const p=this.progress(); if (p>0.5 && firstModel && firstModel.visible){ firstModel.visible=false; secondModel.visible=true; } else if (p<0.5 && firstModel && !firstModel.visible){ firstModel.visible=true; secondModel.visible=false; } } }, 'swapSpin');
        tl.to(camera.position, { z:6.5, duration:1, yoyo:true, repeat:1, ease:'power2.inOut' }, 'swapSpin');
        tl.to(group.rotation, { y: Math.PI * 10, x:0, z:0, duration:2.4, ease:'power3.out' }, 'settle');
        tl.to(camera.position, { z:4, y:0, duration:2.4, ease:'power3.out' }, 'settle');
        tl.to(group.position, { x:2, y:0, duration:1, ease:'sine.inOut' }, 'final');
        tl.to(group.rotation, { y: Math.PI * 15, duration:1, ease:'sine.inOut' }, 'final');
        tl.to(group.position, { x:20, duration:1.5, ease:'power2.in' }, 'canExit');
        tl.to(group.rotation, { y: Math.PI * 18, duration:1.5, ease:'linear' }, 'canExit');

        if (tapeModel) {
            tapeModel.position.set(-8,0,0); tapeModel.rotation.set(0,0,0);
            tl.to(tapeModel.position, { x:0, y:-0.5, z:-4, duration:1.5, ease:'power2.out' }, 'canExit');
            tl.to(tapeModel.rotation, { y: Math.PI * 3.8, x:0.5, duration:1.5, ease:'none' }, 'canExit');
            tl.to(tapeModel.position, { z:0, duration:1.2, ease:'power2.inOut' }, 'tapeZoom');
            tl.to(tapeModel.rotation, { y: Math.PI * 5.2, duration:1.2, ease:'sine.inOut' }, 'tapeZoom');
            tl.to(tapeModel.position, { z:-4, duration:1.2, ease:'power2.inOut' }, 'tapeZoomOut');
            tl.to(tapeModel.rotation, { y: Math.PI * 7, duration:1.2, ease:'sine.inOut' }, 'tapeZoomOut');
            tl.to(tapeModel.position, { x:10, y:2, z:0, duration:1.5, ease:'power2.in' }, 'tapeRollOut');
            tl.to(tapeModel.rotation, { y: Math.PI * 8, duration:1.5, ease:'none' }, 'tapeRollOut');
        }
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }

    // Observe size changes in the insertion element and call resize + refresh triggers
    if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => { resize(); if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });
        ro.observe(insertionEl);
        // keep reference in case cleanup needed later (not stored here)
    } else {
        window.addEventListener('resize', () => { resize(); if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });
    }

    // -- Render loop --
    function loop(){ requestAnimationFrame(loop); renderer.render(scene, camera); }
    loop();

})();
