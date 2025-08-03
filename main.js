function getScriptParams() {
    const scripts = document.querySelectorAll('script[src]');
    const currentScript = Array.from(scripts).find(s => s.src.includes('js-screensaver'));
    if (!currentScript) return {};

    const url = new URL(currentScript.src);
    return Object.fromEntries(url.searchParams.entries());
}

let screensaverTimeout;
const params = getScriptParams();

const timeoutSeconds = parseInt(params.timeout, 10) || 25;
const customText = params.text || 'js-screensaver';

let screensaver = document.getElementById('js-screensaver');
let text = document.getElementById('js-screensaver-text');

if (!screensaver) {
    screensaver = document.createElement('div');
    screensaver.id = 'js-screensaver';
    document.body.appendChild(screensaver);
}

if (!text) {
    text = document.createElement('div');
    text.id = 'js-screensaver-text';
    screensaver.appendChild(text);
}

function setDefaultStyle(el, styles) {
    for (const [prop, value] of Object.entries(styles)) {
        if (!el.style[prop]) {
            el.style[prop] = value;
        }
    }
}

function applyDefaultStyles() {
    setDefaultStyle(screensaver, {
        display: 'none',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'black',
        zIndex: '9999'
    });

    setDefaultStyle(text, {
        position: 'absolute',
        fontSize: '48px',
        color: getRandomishColor(),
    });
}

function getRandomishColor() {
    return 'hsla(' + Math.floor((Math.random() * 360)) + ', 100%, 50%, 1.0)';
}

function resetTimer() {
    screensaver.style.display = 'none';
    clearTimeout(screensaverTimeout);
    screensaverTimeout = setTimeout(showScreensaver, timeoutSeconds * 1000);
}

function showScreensaver() {
    screensaver.style.display = 'block';
    animate();
    if (typeof changeLinkColors === 'function') {
        changeLinkColors();
    }
}

function animate() {
    let x = Math.random() * (window.innerWidth - text.clientWidth);
    let y = Math.random() * (window.innerHeight - text.clientHeight);
    let dx = 2;
    let dy = 2;

    function moveText() {
        const width = text.clientWidth;
        const height = text.clientHeight;

        if (x + dx + width > window.innerWidth || x + dx < 0) {
            dx = -dx;
            text.style.color = getRandomishColor();
            text.style.textShadow = `0 0 10px ${text.style.color}`;
        }
        if (y + dy + height > window.innerHeight || y + dy < 0) {
            dy = -dy;
            text.style.color = getRandomishColor();
            text.style.textShadow = `0 0 10px ${text.style.color}`;
        }

        x += dx;
        y += dy;

        text.style.transform = `translate(${x}px, ${y}px)`;

        if (screensaver.style.display === 'block') {
            requestAnimationFrame(moveText);
        }
    }

    moveText();
}

['mousemove', 'keydown', 'click', 'scroll'].forEach(event => {
    document.addEventListener(event, resetTimer);
});

text.textContent = customText;
applyDefaultStyles();
resetTimer();
