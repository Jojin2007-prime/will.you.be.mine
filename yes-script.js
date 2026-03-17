let musicPlaying = true;

window.addEventListener('load', () => {
    // 1. Launch the confetti celebration immediately
    launchConfetti();

    // 2. Handle Music: Explicitly trigger play on load
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.3;
        
        // This usually works because the user interacted with the previous page
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicPlaying = true;
                updateMusicButton(true);
            }).catch(error => {
                console.log("Autoplay blocked; waiting for first interaction on this page.");
                musicPlaying = false;
                updateMusicButton(false);
                
                // Fallback: Start music on the very first click on this specific page
                document.addEventListener('click', () => {
                    music.play();
                    musicPlaying = true;
                    updateMusicButton(true);
                }, { once: true });
            });
        }
    }
});

// Celebration logic using the canvas-confetti library
function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00'];
    const duration = 6000;
    const end = Date.now() + duration;

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors: colors
    });

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: colors
        });

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: colors
        });
    }, 300);
}

// Music toggle function
function toggleMusic() {
    const music = document.getElementById('bg-music');
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

// Reuse the heart trail animation for the success page
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