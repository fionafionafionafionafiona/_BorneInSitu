import gsap from "gsap";

// hand animation

var hand = document.querySelector(".hand");
var circlesWrapper = document.querySelector(".circles");
var finalScreen = document.querySelector(".final-screen");
var titleContainer = document.querySelector(".title-box-container");

function activeHand() {
  pulse.kill();
  circlesWrapper.classList.add("is-active");
  titleContainer.classList.add("is-active");

  var beatTimings = [0.1, 0.4, 0.8, 1.2, 1.6];

  var tl = gsap.timeline({ defaults: { transformOrigin: "center center" } });

  beatTimings.forEach((delay) => {
    tl.to(
      ".hand",
      {
        scale: 1.15,
        duration: 0.2,
        ease: "power1.out",
      },
      delay
    );

    tl.to(
      ".hand",
      {
        scale: 1.0,
        duration: 0.2,
        ease: "power1.in",
      },
      delay + 0.2
    );
  });

  tl.to(
    ".hand",
    {
      scale: 0,
      duration: 0.6,
      ease: "power2.inOut",
    },
    beatTimings[beatTimings.length - 1] + 1
  );
  tl.to(
    ".gradient",
    {
      opacity: 0,
      duration: 0.1,
      ease: "power1.out",
      onComplete: () => {
        document.querySelector(".screen").style.pointerEvents = "none";
      },
    },
    ">"
  );
  tl.to(
    ".hand-container, .logos",

    {
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      onComplete: () => {
        document.querySelector(".screen").style.pointerEvents = "none";
      },
    },
    ">"
  );
}

hand.addEventListener("click", activeHand);

var pulse = gsap.to(".hand", {
  scale: 1.03,
  duration: 0.6,
  ease: "power1.inOut",
  yoyo: true,
  repeat: -1,
  transformOrigin: "center center",
});

// fullscreen mode

var isFullScreen = false;

document.body.addEventListener("keypress", function (event) {
  if (event.key == " ") {
    if (isFullScreen == false) {
      document.body.requestFullscreen();

      isFullScreen = true;
    } else {
      document.exitFullscreen();
      isFullScreen = false;
    }
  }
});

// title animation

const title = document.querySelectorAll(".title");

title.forEach((title) => {
  const titleString = title.textContent;
  const titleCharacters = titleString.split("");

  title.textContent = "";

  titleCharacters.forEach((character) => {
    title.innerHTML += "<span>" + character + "</span>";
    if (character === " ") {
      title.innerHTML += " ";
    }
  });

  const characters = title.querySelectorAll("span");

  gsap.to(characters, {
    y: -20,
    duration: 1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 0.05,
      repeat: -1,
      yoyo: true,
    },
  });
});

const titles = document.querySelectorAll(".title");
const numTitles = titles.length;
const moveAmount = 80;
const transitionDuration = 0.3;
const stayDuration = 2;

const tl = gsap.timeline({ repeat: -1, yoyo: true });

for (var i = 0; i < numTitles; i++) {
  tl.to(titles, {
    y: i * moveAmount * -1,
    duration: transitionDuration,
    ease: "power2.inOut",
  });
  if (i == 1) {
    tl.add(() => {}, "+=3");
  } else {
    tl.add(() => {}, "+=1.5");
  }
}

// gradient animation

function animateSVGs() {
  const elements = [
    { selector: ".gradient-first", freq: 0.0011, amp: 15 },
    { selector: ".gradient-second", freq: 0.0014, amp: 20 },
    { selector: ".gradient-third", freq: 0.0018, amp: 25 },
    { selector: ".gradient-fourth", freq: 0.0012, amp: 18 },
  ].map(({ selector, freq, amp }) => ({
    el: document.querySelector(selector),
    freq,
    amp,
    rotationOffset: 0,
    rotationTarget: 0,
    rotationStartTime: 0,
    rotationDuration: 0,
    lastSpinTime: 0,
  }));

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function animate(time) {
    elements.forEach((obj, i) => {
      if (!obj.el) return;

      const { freq, amp } = obj;

      const scale = 1 + Math.sin(time * freq * 0.8 + i * 2) * 0.25;
      const x = Math.cos(time * freq * 0.6 + i) * amp;
      const y = Math.sin(time * freq * 0.5 + i) * amp;

      const isRotating = time < obj.rotationStartTime + obj.rotationDuration;

      if (
        !isRotating &&
        time - obj.lastSpinTime > 5000 + Math.random() * 8000
      ) {
        obj.rotationOffset = obj.rotationTarget;
        obj.rotationTarget += (Math.random() > 0.5 ? 1 : -1) * 360;
        obj.rotationStartTime = time;
        obj.rotationDuration = 8000 + Math.random() * 8000;
        obj.lastSpinTime = time;
      }

      let rotation = obj.rotationOffset;
      if (obj.rotationDuration > 0) {
        const progress = Math.min(
          1,
          (time - obj.rotationStartTime) / obj.rotationDuration
        );
        rotation =
          obj.rotationOffset +
          (obj.rotationTarget - obj.rotationOffset) * easeInOutCubic(progress);
      }

      obj.el.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

animateSVGs();
