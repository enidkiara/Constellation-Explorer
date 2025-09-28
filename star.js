const facts = [
  "Orion is one of the brightest constellations.",
  "Ursa Major contains the Big Dipper.",
  "Cassiopeia is shaped like a W in the night sky.",
  "Scorpius resembles a scorpion’s curved tail.",
  "Lyra contains Vega, one of the brightest stars.",
  "Cygnus is also called the Northern Cross.",
  "Leo represents the Nemean Lion from Greek mythology.",
  "Taurus holds the famous Pleiades star cluster.",
  "Gemini represents the twins Castor and Pollux.",
  "Aquila means 'eagle' and features the bright star Altair.",
  "Pegasus is known for the Great Square asterism.",
  "Andromeda contains the closest spiral galaxy to the Milky Way.",
  "Draco winds between Ursa Major and Ursa Minor.",
  "Sagittarius is home to the center of our galaxy.",
  "Canis Major contains Sirius, the brightest star in the sky.",
  "Capricornus is associated with a sea-goat in mythology.",
  "Hydra is the largest constellation in the sky.",
  "Virgo contains Spica, a bright blue-white star.",
  "Pisces represents two fish tied together by a cord.",
  "Libra is the only zodiac constellation symbolized by an object, the scales."
];

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };
const factBox = document.getElementById("factBox");

const stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    fact: facts[i % facts.length],
    opacity: Math.random() * 0.8 + 0.2,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    fadingOut: Math.random() < 0.5
  });
}

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let starHovered = null;

  stars.forEach(star => {
    if (star.fadingOut) {
      star.opacity -= star.twinkleSpeed;
      if (star.opacity <= 0.2) star.fadingOut = false;
    } else {
      star.opacity += star.twinkleSpeed;
      if (star.opacity >= 1) star.fadingOut = true;
    }

    let dxOffset = (mouse.x - canvas.width / 2) * 0.01;
    let dyOffset = (mouse.y - canvas.height / 2) * 0.01;
    let renderX = star.x + dxOffset * (star.radius * 2);
    let renderY = star.y + dyOffset * (star.radius * 2);

    ctx.beginPath();
    ctx.arc(renderX, renderY, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.shadowColor = "white";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;

    let dxMouse = mouse.x - renderX;
    let dyMouse = mouse.y - renderY;
    let distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    if (distance < 100) {
      ctx.beginPath();
      ctx.moveTo(renderX, renderY);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
    }

    if (distance < 10) {
      starHovered = star;
      ctx.beginPath();
      ctx.arc(renderX, renderY, star.radius + 3, 0, Math.PI * 2);
      ctx.strokeStyle = "white";
      ctx.stroke();
    }
  });

  if (starHovered) {
    factBox.innerText = starHovered.fact;
    factBox.style.display = "block";
    factBox.style.left = mouse.x + 15 + "px";
    factBox.style.top = mouse.y + 15 + "px";
  } else {
    factBox.style.display = "none";
  }

  requestAnimationFrame(draw);
}

draw();

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("instructionPopup");
  const closeBtn = document.getElementById("closePopup");

  if (popup && closeBtn) {

    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }
});

