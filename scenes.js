/* ============================
   GLOBAL SCENE SYSTEM
============================ */

let currentScene = 1;

function showScene(n) {
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  document.getElementById("scene" + n).classList.add("active");
  currentScene = n;
}

/* ============================
   MUSIC — autoplay + unlock
============================ */

function startMusic() {
  const player = document.getElementById("ytplayer");
  player.src =
    "https://www.youtube.com/embed/yKNxeF4KMsY?autoplay=1&mute=1&loop=1&playlist=yKNxeF4KMsY&enablejsapi=1";
}
startMusic();

let audioUnlocked = false;
function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  const player = document.getElementById("ytplayer");
  player.contentWindow.postMessage(
    JSON.stringify({
      event: "command",
      func: "unMute",
      args: []
    }),
    "*"
  );
}
document.addEventListener("click", unlockAudio);
document.addEventListener("keydown", unlockAudio);

/* ============================
   HEARTS + SPARKLES
============================ */

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  const size = 15 + Math.random() * 20;
  heart.style.width = heart.style.height = size + "px";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = "-40px";
  heart.style.transform = `rotate(${Math.random() * 360}deg)`;

  const duration = 5000 + Math.random() * 4000;
  const start = Date.now();

  function animate() {
    const t = Date.now() - start;
    const p = t / duration;
    heart.style.top = p * window.innerHeight + "px";
    heart.style.opacity = 1 - p;
    if (p < 1) requestAnimationFrame(animate);
    else heart.remove();
  }

  animate();
  document.body.appendChild(heart);
}
setInterval(createHeart, 200);

function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  const size = 3 + Math.random() * 5;
  sparkle.style.width = sparkle.style.height = size + "px";
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";

  const duration = 900 + Math.random() * 900;
  const start = Date.now();

  function animate() {
    const t = Date.now() - start;
    const p = t / duration;
    sparkle.style.transform = `translateY(${p * -40}px) translateX(${Math.sin(p * 10) * 8}px) scale(${1 - p})`;
    sparkle.style.opacity = 1 - p;
    if (p < 1) requestAnimationFrame(animate);
    else sparkle.remove();
  }

  animate();
  document.body.appendChild(sparkle);
}
setInterval(createSparkle, 60);

/* ============================
   SCENE 1 — BUTTON LOGIC
============================ */

const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

yesBtn.addEventListener("click", () => {
  confetti();
  showScene(2);
});

noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
});

/* ============================
   SCENE 2 — CLICK LOVE
============================ */

let loveClicks = 0;
const MAX_LOVE = 13;

document.getElementById("scene2").addEventListener("click", (e) => {
  if (currentScene !== 2) return;
  if (loveClicks >= MAX_LOVE) return;

  loveClicks++;

  const love = document.createElement("div");
  love.innerText = "I LOVE YOU 💕";
  love.style.position = "absolute";
  love.style.left = e.clientX + "px";
  love.style.top = e.clientY + "px";
  love.style.color = "#ff2f92";
  love.style.fontSize = "22px";
  love.style.textShadow = "0 0 15px #fff, 0 0 25px #ffb3e6";
  love.style.pointerEvents = "none";
  document.body.appendChild(love);

  setTimeout(() => love.remove(), 2000);

  if (loveClicks >= MAX_LOVE) {
    setTimeout(() => startComplimentScene(), 800);
  }
});

/* ============================
   NEW SCENE 3 — COMPLIMENT WALL
============================ */

const complimentList = [
  "you're adorable 💗",
  "cutest human alive ✨",
  "my favorite person 💞",
  "you make everything better 🌸",
  "i adore you so much 💕",
  "you brighten every room 💖",
  "you’re magic to me ✨",
  "you make life sweeter 🍓",
  "you’re my soft place 💗",
  "you’re unbelievably precious 🌸",
  "you make my heart warm 💞",
  "you’re the cutest ever 💕",
  "you’re my favorite human 💗",
  "you’re sunshine in human form ☀️",
  "you’re so lovable 💖",
  "you’re perfect to me ✨",
  "you’re my comfort person 💞",
  "you’re so special 💗",
  "you’re a dream come true 🌸",
  "you’re my happiness 💕",
  "you’re the sweetest soul 💖",
  "you’re everything to me ✨",
  "you’re my heart’s favorite 💞",
  "you’re unbelievably cute 💗",
  "you’re my whole world 🌸",
  "you’re love itself 💕",
  "you’re my safe place 💖",
  "you’re the best thing ever ✨",
  "you’re my forever favorite 💞"
];

let complimentIndex = 0;

function startComplimentScene() {
  showScene(3);

  const container = document.getElementById("complimentContainer");
  const nextBtn = document.getElementById("nextToSlideshow");

  const interval = setInterval(() => {
    const bubble = document.createElement("div");
    bubble.className = "compliment-bubble";

    // losowe rozmieszczenie po całym ekranie
    bubble.style.position = "absolute";
    bubble.style.left = Math.random() * (window.innerWidth - 220) + "px";
    bubble.style.top = Math.random() * (window.innerHeight - 120) + "px";

    bubble.innerText = complimentList[complimentIndex];
    container.appendChild(bubble);

    complimentIndex++;

    if (complimentIndex >= 30) {
      clearInterval(interval);
      nextBtn.style.display = "block";
    }
  }, 1000);
}

document.getElementById("nextToSlideshow").addEventListener("click", () => {
  showScene(4);
  slideIndex = 0;
  showSlide();
});


/* ============================
   SCENE 4 — GIF SLIDESHOW
============================ */

const slides = [
  { type: "text", t: `Wait a second my love… 😌💗` },

  { type: "gif", src: "gifs/gif1.html", top: "Flowers for the prettiest boy alive 🌹" },

  { type: "text", t: `I just want you to know...

how deeply I adore you.
You make my world softer,
my heart calmer,
and every day brighter
just by being in it 💞` },

  { type: "text", t: `You shine like the brightest star
in the darkest night ✨` },

  { type: "gif", src: "gifs/gif3.html", mid: "Our heart together ❤️" },

  { type: "text", t: `You are my safe place,
my happiness,
my favorite person,
my dream come true.

Loving you
is the easiest
and most beautiful thing
I've ever done 💖` },

  { type: "gif", src: "gifs/gif2.html", top: "More flowers for my baby 🌸" },

  { type: "final" }
];

let slideIndex = 0;

const gif = document.getElementById("gif");
const text = document.getElementById("text");
const topT = document.getElementById("top");
const final = document.getElementById("final");

function typeWriter(str, cb) {
  text.innerHTML = "";
  text.classList.add("show");
  text.style.textAlign = "center";
  let n = 0;

  let inter = setInterval(() => {
    text.innerHTML += str[n];
    n++;
    if (n >= str.length) {
      clearInterval(inter);
      setTimeout(cb, 3500);
    }
  }, 40);
}

function nextSlide() {
  slideIndex++;
  if (slideIndex < slides.length) showSlide();
}

function showSlide() {
  const s = slides[slideIndex];

  if (s.type === "text") {
    gif.style.display = "none";
    topT.classList.remove("show");
    typeWriter(s.t, nextSlide);
  }

  else if (s.type === "gif") {
    text.classList.remove("show");
    gif.classList.remove("fade");
    void gif.offsetWidth;

    gif.src = "about:blank";
    setTimeout(() => gif.src = s.src, 50);

    gif.style.display = "block";
    gif.classList.add("fade");

    if (s.top) {
      topT.innerText = s.top;
      topT.classList.add("show");
    } else topT.classList.remove("show");

    if (s.mid) {
      text.innerText = s.mid;
      text.classList.add("show");
      text.style.textAlign = "center";
    }

    setTimeout(nextSlide, 8000);
  }

  else {
    gif.style.display = "none";
    text.classList.remove("show");
    topT.classList.remove("show");

    setTimeout(() => {
      final.classList.add("show");
    }, 800);

    loveExplosion();
  }
}

/* ============================
   HEART EXPLOSION
============================ */

function loveExplosion() {
  for (let k = 0; k < 120; k++) {
    let h = document.createElement("div");
    h.className = "heart";
    h.style.left = innerWidth / 2 + "px";
    h.style.top = innerHeight / 2 + "px";

    let angle = Math.random() * Math.PI * 2;
    let dist = 200 + Math.random() * 300;
    let x = Math.cos(angle) * dist;
    let y = Math.sin(angle) * dist;

    h.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${x}px,${y}px)`, opacity: 0 }
      ],
      { duration: 2000, easing: "ease-out" }
    );

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }
}

/* ============================
   START SCREEN
============================ */

document.getElementById("startScreen").onclick = () => {
  document.getElementById("startScreen").style.opacity = 0;
  setTimeout(() => document.getElementById("startScreen").remove(), 900);
  showSlide();
};

/* ============================
   BUTTERFLIES
============================ */

function spawnButterfly() {
  const b = document.createElement("div");
  b.className = "butterfly";

  const startX = Math.random() * window.innerWidth;
  const startY = window.innerHeight + 30;

  b.style.left = startX + "px";
  b.style.top = startY + "px";

  document.body.appendChild(b);

  setTimeout(() => b.remove(), 6000);
}

setInterval(spawnButterfly, 1800);

/* ============================
   CURSOR TRAIL
============================ */

document.addEventListener("mousemove", (e) => {
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 600);
});

/* ============================
   SWEET MESSAGES — Scene 1
============================ */

const sweetMessages = [
  "you're adorable 💗",
  "cutest human alive ✨",
  "my favorite person 💞",
  "you make everything better 🌸",
  "i adore you so much 💕"
];

document.getElementById("scene1").addEventListener("click", (e) => {
  const msg = document.createElement("div");
  msg.className = "sweet-bubble";
  msg.innerText = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
  msg.style.position = "absolute";
  msg.style.left = e.clientX + "px";
  msg.style.top = e.clientY + "px";
  msg.style.pointerEvents = "none";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 1500);
});

/* ============================
   HUG BUTTON
============================ */

setTimeout(() => {
  const hug = document.getElementById("hug");
  if (hug) hug.style.display = "block";
}, 5000);

document.getElementById("hug").addEventListener("click", () => {
  const pop = document.createElement("div");
  pop.className = "hug-popup";
  pop.innerText = "sending hug… 🤗💞";
  document.body.appendChild(pop);

  setTimeout(() => {
    pop.innerText = "hug delivered 💗";
  }, 900);

  setTimeout(() => pop.remove(), 2000);
});

/* ============================
   CONFETTI — Scene 1
============================ */

function confetti() {
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.className = "sparkle";
    c.style.left = window.innerWidth / 2 + "px";
    c.style.top = window.innerHeight / 2 + "px";
    document.body.appendChild(c);

    const angle = Math.random() * Math.PI * 2;
    const dist = 150 + Math.random() * 150;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;

    c.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${x}px,${y}px)`, opacity: 0 }
      ],
      { duration: 1200 }
    );

    setTimeout(() => c.remove(), 1200);
  }
}
