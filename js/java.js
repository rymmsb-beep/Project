

const wave = document.querySelector('.wave');

let position = 0;

function animateWave() {
    position -= 1;

    if (position <= -500) {
        position = 0;
    }

    wave.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animateWave);
}

animateWave();

