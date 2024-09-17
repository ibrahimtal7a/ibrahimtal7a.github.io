function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}
function checkVisible() {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const visible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (visible) {
      section.classList.add("visible");
    }
  });
}
document.addEventListener("DOMContentLoaded", (event) => {
  checkVisible();
  window.addEventListener("scroll", checkVisible);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

let currentIndex = 0;
const visibleBadges = 2;

function moveSlider(step) {
  const slider = document.querySelector(".slider");
  const badges = document.querySelectorAll(".badge");
  const totalBadges = badges.length;

  currentIndex += step;
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > totalBadges - visibleBadges) {
    currentIndex = totalBadges - visibleBadges;
  }

  slider.style.transform = `translateX(${-currentIndex * 160}px)`;
}
