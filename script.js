const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width/2, y: canvas.height/2 };

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    fadingOut: Math.random() < 0.5
  });
}

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    if (star.fadingOut) {
      star.opacity -= star.twinkleSpeed;
      if (star.opacity <= 0.2) star.fadingOut = false;
    } else {
      star.opacity += star.twinkleSpeed;
      if (star.opacity >= 1) star.fadingOut = true;
    }

    const dx = (mouse.x - canvas.width/2) * 0.01 * star.radius;
    const dy = (mouse.y - canvas.height/2) * 0.01 * star.radius;
    const x = star.x + dx;
    const y = star.y + dy;

    ctx.beginPath();
    ctx.arc(x, y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(draw);
}

draw();

