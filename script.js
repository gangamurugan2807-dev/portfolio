const frameCount = 240;

const canvas = document.getElementById("canvas");

const context = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;



// generate image path
const currentFrame = index => (

    `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`

);



const images = [];

const imageSeq = {

    frame: 1

};


// preload images

for (let i = 1; i <= frameCount; i++) {

    const img = new Image();

    img.src = currentFrame(i);

    images.push(img);

}


// draw first frame

images[0].onload = function () {

    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);

};



window.addEventListener('scroll', () => {

    const scrollTop = document.documentElement.scrollTop;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;

    const frameIndex = Math.min(

        frameCount - 1,

        Math.ceil(scrollFraction * frameCount)

    );



    requestAnimationFrame(() => {

        context.drawImage(

            images[frameIndex],

            0,

            0,

            canvas.width,

            canvas.height

        );

    });

});
