let screensaverTimeout;

const screensaver = document.getElementById('js-screensaver');
const text = document.getElementById('js-screensaver-text');

screensaver.style.display = 'none';
screensaver.style.position = 'fixed';
screensaver.style.top = '0';
screensaver.style.left = '0';
screensaver.style.width = '100%';
screensaver.style.height = '100%';
screensaver.style.background = 'black';
screensaver.style.zIndex = '9999';

function getRandomishColor() {
    return 'hsla(' + Math.floor((Math.random() * 360)) + ', 100%, 50%, 1.0)';
}

function resetTimer() {
    screensaver.style.display = 'none';
    clearTimeout(screensaverTimeout);
    screensaverTimeout = setTimeout(showScreensaver, 25 * 1000);
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

    text.style.position = 'absolute';
    text.style.color = getRandomishColor();
    text.style.textShadow = `0 0 10px ${text.style.color}`;

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

resetTimer();
