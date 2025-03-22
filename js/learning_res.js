// Elements
let learnMoreBtn = document.querySelector(".learn-more-btn");
let headerNum = document.querySelector("#header-num-count");
let featureStatNums = document.querySelectorAll(".feature-stat");

let tiltedCard = document.querySelector(".tilted-card");

// keep track of previous scroll position
let prevScrollPos = window.pageYOffset;

learnMoreBtn.addEventListener("click", function () {
  smoothScroll(".course-overview-section");
});

countUp(headerNum, 20, 90);
executeOnce();

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

function executeOnce() {
  // Check if the current page is index.html
  const path = window.location.pathname;
  if (path.endsWith("/") || path.endsWith("/index.html")) {
    // Get the current scroll position
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Define the position where you want the function to execute
    let overviewSectionPos = 850;
    let featureSectionPos = 1200; // Change this value to your desired position

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

// Add the scroll event listener
window.addEventListener("scroll", executeOnce);

function countAllNums() {
  // Ensure featureStatNums is defined and is an iterable
  if (
    Array.isArray(featureStatNums) ||
    NodeList.prototype.isPrototypeOf(featureStatNums)
  ) {
    for (let featureStatNum of featureStatNums) {
      // Ensure featureStatNum has a textContent property
      if (featureStatNum && featureStatNum.textContent) {
        countUp(featureStatNum, featureStatNum.textContent, 35);
      } else {
        console.error("Invalid featureStatNum or missing textContent");
      }
    }
  } else {
    console.error("featureStatNums is not an array or NodeList");
  }
}

window.addEventListener("scroll", executeOnce);

// Show navbar when scrolling up, hide when scrolling down
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
