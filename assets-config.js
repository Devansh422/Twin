// Asset path configuration — auto-detect base path so it works from sub-pages too
(function () {
  var scripts = document.getElementsByTagName('script');
  var basePath = '';
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute('src') || '';
    if (src.indexOf('assets-config') !== -1) {
      basePath = src.substring(0, src.lastIndexOf('/') + 1) || '';
      break;
    }
  }
  // If loaded as "../assets-config.js", basePath will be "../"
  // If loaded as "assets-config.js", basePath will be ""
  window.ASSETS = {
    logo: basePath + 'assets/logo.png',
    heroVideo: basePath + 'assets/hero-video.mp4',
    neutralHdr: basePath + 'assets/neutral.hdr',
    blackCan: basePath + 'assets/Black_Can.glb',
    redCan: basePath + 'assets/Red_Can.glb',
    brownTape: basePath + 'assets/Brown_Tape.glb'
  };
})();

// You can extend this object with more keys for other local images/docs.
