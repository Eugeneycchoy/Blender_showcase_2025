// Elements
let learnMoreBtn = document.querySelector(".learn-more-btn");
let headerNum = document.querySelector("#header-num-count");
let featureStatNums = document.querySelectorAll(".feature-stat");
let tiltedCard = document.querySelector(".tilted-card");
// keep track of previous scroll position
let prevScrollPos = window.pageYOffset;

// Event Listeners
window.addEventListener("scroll", function () {
  // current scroll position
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // user has scrolled up
    document.querySelector("nav").classList.remove("hide");
  } else {
    // user has scrolled down
    document.querySelector("nav").classList.add("hide");
  }

  // update previous scroll position
  prevScrollPos = currentScrollPos;
});

learnMoreBtn.addEventListener("click", function () {
  smoothScroll(".course-overview-section");
});

// Add the scroll event listener
window.addEventListener("scroll", main);

// Select all carousel items
const carouselItems = document.querySelectorAll(".carousel-item");
// Select all carousel overlays
const carouselOverlays = document.querySelectorAll(".carousel-overlay");
// Select all carousel-text
const carouselTexts = document.querySelectorAll(
  ".course-highlights-text-content"
);
// Add event listeners to each carousel item
carouselItems.forEach((carouselItem) => {
  carouselItem.addEventListener("mouseover", () => {
    carouselOverlays.forEach((carouselOverlay) => {
      carouselOverlay.classList.add("remove-opacity");
    });
    carouselTexts.forEach((carouselText) => {
      carouselText.classList.add("remove-opacity");
    });
  });

  carouselItem.addEventListener("mouseout", () => {
    carouselOverlays.forEach((carouselOverlay) => {
      carouselOverlay.classList.remove("remove-opacity");
    });
    carouselTexts.forEach((carouselText) => {
      carouselText.classList.remove("remove-opacity");
    });
  });
});

// Functions
function smoothScroll(sectionQuery) {
  // Find the section using the provided CSS selector and scroll to it smoothly
  document.querySelector(sectionQuery).scrollIntoView({
    behavior: "smooth", // Defines the animation style for the scroll
  });
}

/**
 * Incrementally updates the text of a target element with a number, starting from 0 and
 * ending at the target number. The number is formatted by adding the specified unit string.
 * @param {HTMLElement} target - The element whose text content will be updated.
 * @param {number} targetNum - The number to count up to.
 * @param {string} unitInString - The string to append to the number, e.g. "$" or "km".
 * @param {number} intervalinMs - The interval in milliseconds between each increment.
 */
function countUp(target, targetNum, intervalinMs) {
  let currentNum = 0;
  const interval = setInterval(() => {
    target.textContent = currentNum;
    if (currentNum >= targetNum) {
      clearInterval(interval);
    }
    currentNum++;
  }, intervalinMs);
}

/**
 * Checks if the current page is index.html and the user has scrolled to the desired position,
 * and if so, calls the countAllNums function to animate the feature statistics, and removes
 * the scroll event listener.
 * @return {void}
 */
function main() {
  // Check if the current page is index.html
  const path = window.location.pathname;
  if (path.endsWith("/") || path.endsWith("/index.html")) {
    // Get the current scroll position
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    // Define the position where you want the function to execute
    const overviewSectionPos = 850;
    const featureSectionPos = 1200; // Change this value to your desired position
    // Check if the current scroll position has reached the target position
    if (scrollPosition >= featureSectionPos) {
      // Begin the "numbers going up" animation
      countAllNums();
      // Remove the scroll event listener
      window.removeEventListener("scroll", executeOnce);
    } else if (scrollPosition >= overviewSectionPos) {
      // Do the shake animation
      tiltedCard.classList.add("shake-animation");
    }
  }
}

/**
 * Iterate over the featureStatNums array or NodeList and call countUp
 * for each element with the correct parameters.
 * @param {Array<HTMLElement>|NodeList} featureStatNums - The elements
 *   to animate by calling countUp.
 * @return {void}
 */
function countAllNums() {
  // Ensure featureStatNums is an array or NodeList
  if (
    Array.isArray(featureStatNums) ||
    NodeList.prototype.isPrototypeOf(featureStatNums)
  ) {
    for (let featureStatNum of featureStatNums) {
      // Ensure featureStatNum has a textContent property
      if (featureStatNum && featureStatNum.textContent) {
        // Call countUp for each element with the correct parameters
        countUp(featureStatNum, featureStatNum.textContent, 35);
      } else {
        console.error("Invalid featureStatNum or missing textContent");
      }
    }
  } else {
    console.error("featureStatNums is not an array or NodeList");
  }
}

// Function Calls
countUp(headerNum, 20, 90);
main();
