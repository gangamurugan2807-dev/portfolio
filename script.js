const frameCount = 240;
const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const currentFrame = (index) => {
    const paddedIndex = String(index).padStart(3, '0');
    return `frames/ezgif-frame-${paddedIndex}.jpg`;
};

const images = [];
let animationFrame = 0;

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw first frame
images[0].onload = () => {
    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[animationFrame], 0, 0, canvas.width, canvas.height);
}

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;
    animationFrame = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(render);
});

// Resize support
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
});
