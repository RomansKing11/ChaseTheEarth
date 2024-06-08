document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-btn"); // Correct ID
  const menuMobile = document.getElementById("menu-mobile");
  const exitButton = document.getElementById("exit-btn");

  if (menuButton) {
    // Check if menuButton exists
    menuButton.addEventListener("click", function () {
      menuMobile.style.display = "block";
    });
  }

  if (exitButton) {
    // Check if menuButton exists
    exitButton.addEventListener("click", function () {
      menuMobile.style.display = "none";
    });
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   const imageMain = document.getElementById("img-1"); // Correct ID
//   const windowWidth = window.innerWidth;

//   if (windowWidth < 800) {
//     image.src = "images/creationadam/grey back model.png";
//   } else {
//     image.src = "images/main image back min.png";
//   }
// });
