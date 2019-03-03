const sketches = document.getElementsByClassName('sketch');

const appendScript = (doc, src) => (new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => { resolve(); };
  doc.head.appendChild(script);
}));

const buildIframeContents = (sketch, frame, doc) => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '../css/sketch.css';
  doc.head.appendChild(css);

  const scriptPath = `sketches/${sketch.getAttribute('sketch')}.js`;
  appendScript(doc, scriptPath)
    .then(() => { appendScript(doc, '../js/p5setup.js'); })
    .then(() => { appendScript(doc, 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.min.js'); });
};

Array.from(sketches).forEach((sketch) => {
  const iframe = document.createElement('iframe');
  sketch.appendChild(iframe);
  const interval = window.setInterval(() => {
    const frame = iframe.contentWindow;
    const doc = frame.document;

    if (doc.readyState === 'complete') {
      clearInterval(interval);
      buildIframeContents(sketch, frame, doc);
    }
  }, 100);
});
