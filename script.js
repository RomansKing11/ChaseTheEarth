$(window).on("load", function () {
  $(".loader-container").fadeout("slow");
});

document.addEventListener("DOMContentLoaded", function () {
  // Simulate loading time
  setTimeout(function () {
    // Add loaded class to body to fade out loading screen and reveal main content
    document.body.classList.add("loaded");
    // Allow scrolling after loading screen fades out
    document.body.style.overflow = "auto";
  }, 4000); // Adjust timing as needed
});
