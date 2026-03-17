let musicPlaying = true;

window.addEventListener('load', () => {
    // 1. Launch the confetti celebration
    launchConfetti();

    // 2. Fix for Music Playback
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.3;
        
        // Attempt to play immediately
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully
                musicPlaying = true;
            }).catch(error => {
                console.log("Autoplay prevented. Music will start on first user interaction.");
                // Fallback: If the browser still blocks it, play on the first click anywhere on the page
                document.addEventListener('click', () => {
                    music.play();
                    musicPlaying = true;
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

    // Initial big burst in the center
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors: colors
    });

    // Continuous side cannons for a high-energy effect
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

// Music toggle function for the final page
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const toggleBtn = document.getElementById('music-toggle');
    
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        if (toggleBtn) toggleBtn.textContent = '🔇';
    } else {
        music.play();
        musicPlaying = true;
        if (toggleBtn) toggleBtn.textContent = '🔊';
    }
}