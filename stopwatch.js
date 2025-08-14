let startTime = null;
let elapsedMs = 0;
let running = false;

function formatTime(ms) {
    const sec = Math.floor(ms / 1000);
    const h = String(Math.floor(sec / 3600)).padStart(2, '0');
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateDot(Ms) {
    const dot = document.getElementById('moving-dot');
    const radius = 140;
    const centerX = 150;
    const centerY = 150;
    // 5秒（5000ms）で一周
    const angle = ((Ms % 5000) / 5000) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
}

function updateDisplay(Ms) {
    display.textContent = formatTime(Ms);
    updateDot(Ms);
}

function animate() {
    if (running) {
        const now = Date.now();
        const Ms = elapsedMs + (now - startTime);
        updateDisplay(Ms);
        requestAnimationFrame(animate);
    } else {
        updateDisplay(elapsedMs);
    }
}

document.getElementById('start-stop').onclick = () => {
    if (!running) {
        running = true;
        startTime = Date.now();
        requestAnimationFrame(animate);
        document.body.classList.add('running-bg');
        document.getElementById('moving-dot').setAttribute('fill', '#375E97');
        document.getElementById('start-stop').innerHTML = '<i class="bi bi-pause-fill"></i>';
        document.getElementById('start-stop').classList.remove('start');
        document.getElementById('start-stop').classList.add('stop');
    } else {
        running = false;
        elapsedMs += Date.now() - startTime;
        document.body.classList.remove('running-bg');
        document.getElementById('moving-dot').setAttribute('fill', '#FFBB00');
        document.getElementById('start-stop').innerHTML = '<i class="bi bi-play-fill"></i>';
        document.getElementById('start-stop').classList.remove('stop');
        document.getElementById('start-stop').classList.add('start');
    }
};

document.getElementById('reset').onclick = () => {
    running = false;
    elapsedMs = 0;
    updateDisplay(0);
    document.getElementById('start-stop').innerHTML = '<i class="bi bi-play-fill"></i>';
    document.getElementById('start-stop').classList.remove('stop');
    document.getElementById('start-stop').classList.add('start');
};

updateDisplay(0);