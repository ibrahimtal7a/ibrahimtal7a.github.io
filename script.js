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

const badgeIds = [
  "495e31ca-da0f-4cf1-bf6b-65a2e09e6f78",
  "0d087825-23bf-46ed-aa90-b20a26c48b8f",
  "1929b0c8-9b2f-41ca-8929-7575acb2e963",
  "65573d26-ed59-4019-ab58-b78d327e6b71",
  "d8f516ee-6002-4d5a-ac8b-7a38c5ec6d88",
  "31650a2d-84ab-498b-9760-70184ba4b58c",
  "328c2db6-1cc7-431a-b39e-061ca90125ef",
  "f5e1a734-c132-4744-94d3-8c13f7f216f8"
];

let currentIndex = 0;
const visibleBadges = 2;

function createBadgeElement(badgeId) {
  const badgeElement = document.createElement('div');
  badgeElement.className = 'badge';
  badgeElement.setAttribute('data-iframe-width', '150');
  badgeElement.setAttribute('data-iframe-height', '270');
  badgeElement.setAttribute('data-share-badge-id', badgeId);
  badgeElement.setAttribute('data-share-badge-host', 'https://www.credly.com');
  return badgeElement;
}

function moveSlider(step) {
  currentIndex = Math.max(0, Math.min(currentIndex + step, badgeIds.length - visibleBadges));
  updateSliderPosition();
}

function updateSliderPosition() {
  const slider = document.querySelector('.slider');
  slider.style.transform = `translateX(${-currentIndex * 160}px)`;
}

function initializeSlider() {
  const sliderContainer = document.querySelector('.slider-container');
  const slider = document.createElement('div');
  slider.className = 'slider';

  badgeIds.forEach(badgeId => slider.appendChild(createBadgeElement(badgeId)));

  sliderContainer.innerHTML = '';
  sliderContainer.appendChild(slider);

  const prevButton = document.createElement('button');
  prevButton.textContent = '❮';
  prevButton.className = 'prev';
  prevButton.onclick = () => moveSlider(-1);

  const nextButton = document.createElement('button');
  nextButton.textContent = '❯';
  nextButton.className = 'next';
  nextButton.onclick = () => moveSlider(1);

  sliderContainer.appendChild(prevButton);
  sliderContainer.appendChild(nextButton);

  updateSliderPosition();

  const script = document.createElement('script');
  script.src = '//cdn.credly.com/assets/utilities/embed.js';
  script.async = true;
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', initializeSlider);
