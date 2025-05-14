var hand = document.querySelector(".hand");
var circlesWrapper = document.querySelector(".circles");

function activeHand() {
  circlesWrapper.classList.add("is-active");
}

hand.addEventListener("click", activeHand);
