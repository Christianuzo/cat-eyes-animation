document.addEventListener('mousemove', (event) => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach(eye => {
        const pupil = eye.querySelector('.pupil');
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
        const x = Math.cos(angle) * 20;
        const y = Math.sin(angle) * 20;
        pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
});

function blink() {
    const lids = document.querySelectorAll('.lid');
    lids.forEach(lid => {
        lid.style.animation = 'blink 0.2s';
        setTimeout(() => {
            lid.style.animation = '';
        }, 200);
    });
}

setInterval(blink, Math.random() * 4000 + 2000);
