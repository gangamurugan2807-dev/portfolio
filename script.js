const frameCount = 240;

const currentFrame = index =>
(
  `frames/ezgif-frames-${String(index).padStart(3, '0')}.jpg`
);


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const images = [];
const imageSeq = {
  frame: 0
};


for (let i = 1; i <= frameCount; i++)
{
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}


images[0].onload = function ()
{
  context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};



window.addEventListener('scroll', () =>
{

  const scrollTop = window.scrollY;

  const maxScroll = document.body.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() =>
  {
    context.drawImage(
      images[frameIndex],
      0,
      0,
      canvas.width,
      canvas.height
    );
  });

});
