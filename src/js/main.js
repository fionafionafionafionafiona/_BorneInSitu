import gsap from "gsap";

var hand = document.querySelector(".hand");
var circlesWrapper = document.querySelector(".circles");
var finalScreen = document.querySelector(".final-screen");

function activeHand() {
  pulse.kill();
  circlesWrapper.classList.add("is-active");

  var beatTimings = [0.5, 1.4, 2.3, 3.2, 4.1];

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
    ".screen",
    {
      opacity: 0,
      duration: 1,
      ease: "power1.out",
      onComplete: () => {
        document.querySelector(".screen").style.pointerEvents = "none";
      },
    },
    ">+=0.5"
  ); // start after a short pause

  // Fade in PNG
  tl.to(
    ".final-screen",
    {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        finalScreen.style.pointerEvents = "auto";
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
