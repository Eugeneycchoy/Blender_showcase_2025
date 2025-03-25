// Elements
const learnMoreBtn = document.querySelector(".learn-more-btn");
const headerNum = document.querySelector("#header-num-count");
const featureStatNums = document.querySelectorAll(".feature-stat");
const tiltedCard = document.querySelector(".tilted-card");
const nav = document.querySelector("nav");
let prevScrollPos = window.pageYOffset;

// Event Listeners
window.addEventListener("scroll", handleScroll);
learnMoreBtn?.addEventListener("click", () =>
  smoothScroll(".course-overview-section")
);
window.addEventListener("scroll", executeOnce);

const carouselItems = document.querySelectorAll(".carousel-item");
const carouselOverlays = document.querySelectorAll(".carousel-overlay");
const carouselTexts = document.querySelectorAll(
  ".course-highlights-text-content"
);

// Add hover effects to carousel items
carouselItems.forEach((carouselItem) => {
  carouselItem.addEventListener("mouseover", () => toggleCarouselOpacity(true));
  carouselItem.addEventListener("mouseout", () => toggleCarouselOpacity(false));
});

// Functions

/**
 * Handles the scroll event to show or hide the navigation bar.
 */
function handleScroll() {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    nav?.classList.remove("hide");
  } else {
    nav?.classList.add("hide");
  }
  prevScrollPos = currentScrollPos;
}

/**
 * Smoothly scrolls to a section specified by the CSS selector.
 * @param {string} sectionQuery - The CSS selector of the target section.
 */
function smoothScroll(sectionQuery) {
  const targetSection = document.querySelector(sectionQuery);
  targetSection?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Toggles the opacity of carousel overlays and text content.
 * @param {boolean} isHovered - Whether the carousel item is hovered.
 */
function toggleCarouselOpacity(isHovered) {
  carouselOverlays.forEach((overlay) =>
    overlay.classList.toggle("remove-opacity", isHovered)
  );
  carouselTexts.forEach((text) =>
    text.classList.toggle("remove-opacity", isHovered)
  );
}

/**
 * Incrementally updates the text of a target element with a number, starting from 0
 * and ending at the target number.
 * @param {HTMLElement} target - The element whose text content will be updated.
 * @param {number} targetNum - The number to count up to.
 * @param {number} intervalMs - The interval in milliseconds between each increment.
 */
function countUp(target, targetNum, intervalMs) {
  let currentNum = 0;
  const interval = setInterval(() => {
    target.textContent = currentNum;
    if (currentNum >= targetNum) {
      clearInterval(interval);
    }
    currentNum++;
  }, intervalMs);
}

/**
 * Executes animations or actions based on the scroll position.
 * Removes itself as a scroll event listener after execution.
 */
function executeOnce() {
  const path = window.location.pathname;
  if (path.endsWith("/") || path.endsWith("/index.html")) {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const overviewSectionPos = 850;
    const featureSectionPos = 1200;

    if (scrollPosition >= featureSectionPos) {
      countAllNums();
      window.removeEventListener("scroll", executeOnce);
    } else if (scrollPosition >= overviewSectionPos) {
      tiltedCard?.classList.add("shake-animation");
    }
  }
}

/**
 * Animates the feature statistics by incrementing their numbers.
 */
function countAllNums() {
  featureStatNums.forEach((featureStatNum) => {
    const targetNum = parseInt(featureStatNum.textContent, 10);
    if (!isNaN(targetNum)) {
      countUp(featureStatNum, targetNum, 35);
    } else {
      console.error(
        "Invalid target number for featureStatNum:",
        featureStatNum
      );
    }
  });
}

// Initial Function Calls
countUp(headerNum, 20, 90);
executeOnce();
