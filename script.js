function scrollToPage(pageIndex) {
    const container = document.querySelector('.card-container');
    const pageHeight = container.offsetHeight;
    container.scrollTop = pageIndex * pageHeight;
}
// Local audio background music control
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-audio');
    if (!btn || !audio) return;

    audio.loop = true;
    audio.volume = 0.6;

    function setPlaying(isPlaying) {
        if (isPlaying) {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            btn.title = 'Pause music';
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            btn.title = 'Play music';
        }
    }

    btn.addEventListener('click', function() {
        if (audio.paused) {
            const p = audio.play();
            if (p && typeof p.then === 'function') {
                p.then(() => setPlaying(true)).catch(() => setPlaying(false));
            } else {
                setPlaying(true);
            }
        } else {
            audio.pause();
            setPlaying(false);
        }
    });

    // Pause audio when page hidden, resume button state when visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (!audio.paused) {
                audio.pause();
                btn.dataset.wasPlaying = 'true';
                setPlaying(false);
            }
        } else {
            if (btn.dataset.wasPlaying === 'true') {
                btn.dataset.wasPlaying = '';
            }
        }
    });
});
