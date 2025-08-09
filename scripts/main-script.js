// main js logic

//navbar appearance when scrolling
/* Dynamically changes navbar appearance based on scroll position by 
adding/removing the 'scrolled' class when the user scrolls past 50 pixels. */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* Dynamically make material you imag appear based on scroll position by 
adding/removing the 'scrolled' class when the user scrolls past 50 pixels. */
// Remember: querySelectorAll() returns a NodeList, which we iterate over with forEach().
// If we used querySelector() instead, it would only select the first matching element.
// Using forEach ensures we apply the effect to all matching elements.
window.addEventListener("scroll", () => {
  const materialYouImgs = document.querySelectorAll(".material-you-img");

  if (window.scrollY > 300) {
    materialYouImgs.forEach((img) => img.classList.add("scrolled"));
  } else {
    materialYouImgs.forEach((img) => img.classList.remove("scrolled"));
  }
});

// cursor hover effect - enlarge
// cursor hover effect on horizontal clock implemented separately
const cursor = document.querySelector(".cursor");
const hoverElements = document.querySelectorAll(".hover-me");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
  });
});

// code to detect the current page and add the class dynamically for navbar border
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); // Get the current page's filename
  const navLinks = document.querySelectorAll(".navbar ul li a");

  navLinks.forEach((link) => {
    // Normalize href path to be relative to the document root
    const linkHref = new URL(link.getAttribute("href"), window.location.origin).pathname.split("/").pop();

    if (linkHref === currentPage) {
      link.parentElement.classList.add("current-page");
    }
  });
});

// svg loading animation
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const content = document.querySelector(".container");
  const minLoadingTime = 400; // Minimum time in milliseconds

  const revealContent = () => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.9s ease";

    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";
      content.classList.add("reveal");
    }, 500); // Match this time with the transition duration
  };

  setTimeout(revealContent, minLoadingTime);
});
