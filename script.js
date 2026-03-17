const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
];

const noMessages = [
    "No", "Are you positive? 🤔", "Pookie please... 🥺", 
    "If you say no, I will be really sad...", "I will be very sad... 😢", 
    "Please??? 💔", "Don't do this to me...", "Last chance! 😭", 
    "You can't catch me anyway 😜"
];

const yesTeasePokes = [
    "try saying no first... I bet you want to know what happens 😏",
    "go on, hit no... just once 👀",
    "you're missing out 😈",
    "click no, I dare you 😏"
];

let yesTeasedCount = 0;
let noClickCount = 0;
let runawayEnabled = false;
let musicPlaying = false;

const catGif = document.getElementById('cat-gif');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const music = document.getElementById('bg-music');

// --- 1. Robust Music Logic (The "Handshake") ---
function playMusic() {
    if (music && music.paused) {
        music.volume = 0.3;
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicPlaying = true;
                updateMusicButton(true);
            }).catch(() => {
                musicPlaying = false;
                // Fallback: Play on the first click anywhere on the page
                document.addEventListener('click', startMusicOnInteraction, { once: true });
            });
        }
    }
}

function startMusicOnInteraction() {
    if (music && music.paused) {
        music.play();
        musicPlaying = true;
        updateMusicButton(true);
    }
}

function toggleMusic() {
    if (!music) return;
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        updateMusicButton(false);
    } else {
        music.play();
        musicPlaying = true;
        updateMusicButton(true);
    }
}

function updateMusicButton(isPlaying) {
    const btn = document.getElementById('music-toggle');
    if (btn) btn.textContent = isPlaying ? '🔊' : '🔇';
}

window.addEventListener('load', playMusic);

// --- 2. Interaction Mechanics ---
function handleYesClick() {
    // Tease user if they try to skip the "No" button fun
    if (noBtn && !runawayEnabled && noClickCount === 0) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)];
        yesTeasedCount++;
        showTeaseMessage(msg);
        return;
    }
    window.location.href = 'yes.html';
}

function handleNoClick() {
    noClickCount++;
    
    // Update No button text
    const msgIndex = Math.min(noClickCount, noMessages.length - 1);
    noBtn.textContent = noMessages[msgIndex];

    // Grow Yes Button
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.3}px`;
    yesBtn.style.padding = `${Math.min(18 + noClickCount * 5, 60)}px ${Math.min(45 + noClickCount * 10, 120)}px`;

    // Shrink No Button
    if (noClickCount > 2) {
        const currentNoSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        noBtn.style.fontSize = `${Math.max(currentNoSize * 0.9, 10)}px`;
    }

    // Swap GIFs
    const gifIndex = Math.min(noClickCount, gifStages.length - 1);
    swapGif(gifStages[gifIndex]);

    // Enable Runaway at 5 clicks
    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway();
        runawayEnabled = true;
    }
}

function swapGif(src) {
    if (!catGif) return;
    catGif.style.opacity = '0';
    setTimeout(() => {
        catGif.src = src;
        catGif.style.opacity = '1';
    }, 200);
}

function enableRunaway() {
    noBtn.style.position = 'fixed';
    noBtn.addEventListener('mouseover', runAway);
    noBtn.addEventListener('touchstart', runAway, { passive: true });
}

function runAway() {
    const margin = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - margin;
    const maxY = window.innerHeight - noBtn.offsetHeight - margin;
    
    const randomX = Math.random() * maxX + margin / 2;
    const randomY = Math.random() * maxY + margin / 2;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '100';
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast');
    if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }
}

// --- 3. Romantic Animations ---

// Falling Petals
setInterval(() => {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.width = petal.style.height = Math.random() * 15 + 10 + 'px';
    petal.style.animationDuration = Math.random() * 5 + 5 + 's';
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 10000);
}, 400);

// Heart Trail
document.addEventListener('mousemove', function(e) {
    const heart = document.createElement('span');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = '12px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    document.body.appendChild(heart);

    heart.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0)`, opacity: 0 }
    ], { duration: 1000 }).onfinish = () => heart.remove();
});