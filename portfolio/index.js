
  // JavaScript code to toggle the visibility of the "Hi There!" greeting
  document.addEventListener("DOMContentLoaded", function () {
    // Get the "About" section and the "Hi There!" greeting
    const aboutSection = document.querySelector(".about");
    const greeting = document.querySelector(".about h2");

    // Calculate the position of the "About" section relative to the viewport
    function checkGreetingVisibility() {
      const rect = aboutSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Show the greeting if the "About" section is at least 25% visible in the viewport
      if (rect.top < windowHeight * 0.75) {
        greeting.classList.add("aboutTitleVisible");
      } else {
        greeting.classList.remove("aboutTitleVisible");
      }
    }

    // Check the greeting visibility on page load
    checkGreetingVisibility();

    // Check the greeting visibility on scroll
    window.addEventListener("scroll", checkGreetingVisibility);
  });
