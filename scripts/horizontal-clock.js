// Define base path depending on the current page
let basePath = "";
if (window.location.pathname.includes("otherContents")) {
  basePath = "../";
}

// function to control moviment of slider indicator on horizontal clock
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const sliderIndicator = document.querySelector(".slider-indicator");
  const timeSlider = document.querySelector(".time-slider");
  const modeIconImg = document.querySelector(".mode-icon img"); // Select the img inside .mode-icon

  function getCurrentTime() {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60;
  }

  function setSliderPosition(time) {
    const indicatorWidth = 20; // Width of the slider indicator in pixels. Update if changed in CSS.
    const percentage = (time / 24) * 100;
    sliderIndicator.style.left = `calc(${percentage}% - ${indicatorWidth / 2}px)`; // indicatorWidth / 2 to get the middle of the element be where we want it to be
  }

  function updateModeBasedOnTime(time) {
    if (time >= 18 || time < 6) {
      // Enable dark mode between 6 PM and 6 AM
      body.classList.add("dark-mode");
      // Use basePath to set image paths
      modeIconImg.src = `${basePath}images/starry-night.svg`; // Change to dark mode icon
      modeIconImg.alt = "Moon icon"; // Update alt text
    } else {
      // Enable light mode between 6 AM and 6 PM
      body.classList.remove("dark-mode");
      modeIconImg.src = `${basePath}images/clear-day.svg`; // Change to light mode icon
      modeIconImg.alt = "Sun icon"; // Update alt text
    }
  }

  function handleSliderInteraction(event) {
    const rect = timeSlider.getBoundingClientRect();
    const xPos = event.clientX - rect.left;
    const time = Math.min(Math.max((xPos / rect.width) * 24, 0), 24);
    setSliderPosition(time);
    updateModeBasedOnTime(time);
  }

  timeSlider.addEventListener("click", handleSliderInteraction);

  function updateTimeAndMode() {
    const currentTime = getCurrentTime();
    setSliderPosition(currentTime);
    updateModeBasedOnTime(currentTime);
  }

  // Initial update
  updateTimeAndMode();

  // Update every 15 minute
  setInterval(updateTimeAndMode, 900000);
});

// function to control hover animation on hour markings
document.addEventListener("DOMContentLoaded", function () {
  const hourMarkings = document.querySelectorAll(".hour-markings span");
  const timeSlider = document.querySelector(".time-slider");

  function handleMouseMove(event) {
    const rect = this.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    hourMarkings.forEach((mark) => {
      const markRect = mark.getBoundingClientRect();
      const distance = Math.abs(mouseX - (markRect.left + markRect.width / 2));
      const scale = Math.max(2.5 - distance / 100, 1);
      mark.style.transform = `scaleY(${scale})`;
    });
  }

  function resetScale() {
    hourMarkings.forEach((mark) => {
      mark.style.transform = "scaleY(1)";
    });
  }

  function toggleHoverEffect() {
    if (window.innerWidth >= 768) {
      // Enable hover effect
      timeSlider.addEventListener("mousemove", handleMouseMove);
      timeSlider.addEventListener("mouseleave", resetScale);
    } else {
      // Disable hover effect
      timeSlider.removeEventListener("mousemove", handleMouseMove);
      timeSlider.removeEventListener("mouseleave", resetScale);
      resetScale(); // Also reset any scale if already applied
    }
  }

  // Initial check on load
  toggleHoverEffect();

  // Re-check on window resize
  window.addEventListener("resize", toggleHoverEffect);
});
