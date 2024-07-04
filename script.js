// MENU BUTTON MOBILE
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-btn"); // Correct ID
  const menuMobile = document.getElementById("menu-mobile");
  const exitButton = document.getElementById("exit-btn");

  // if (menuButton) {
  //   // Check if menuButton exists
  //   menuButton.addEventListener("click", function () {
  //     menuMobile.style.display = "block";
  //   });
  // }

  menuButton.addEventListener("click", () => {
    menuMobile.classList.add("open");
    menuMobile.classList.remove("close");
  });

  exitButton.addEventListener("click", () => {
    menuMobile.classList.remove("open");
    menuMobile.classList.add("close");

    setTimeout(() => {
      menuMobile.classList.remove("close");
    }, 1000);
  });
});

// MAIN TITLE TO HOME PAGE

document.addEventListener("DOMContentLoaded", function () {
  const homeButton = document.getElementById("main-logo-id");

  homeButton.addEventListener("click", () => {
    console.log("click home");
  });
});

// SEARCH BAR
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-word");
  const searchWord = document.getElementById("search-icon");
  const mainLogo = document.getElementById("main-logo-id");
  const searchBar = document.getElementById("search-bar-box");
  const searchMain = document.getElementsByClassName("search-bar")[0];
  let isSearchBarOpen = false;

  function toggleSearchBar() {
    if (isSearchBarOpen) {
      searchBar.style.width = "0";
      searchBar.style.height = "0";
      mainLogo.style.visibility = "visible";
      mainLogo.classList.remove("hidden");
      searchMain.classList.remove("overtop");
      searchBar.style.backgroundColor = "var(--background-color)";
    } else {
      searchBar.style.width = "100%";
      searchBar.style.height = "100%";
      mainLogo.style.visibility = "hidden";
      mainLogo.classList.add("hidden");
      searchMain.classList.add("overtop");
      searchBar.style.backgroundColor = "var(--third-color)";
    }
    // Toggle the state of the search bar
    isSearchBarOpen = !isSearchBarOpen;
  }

  // Event listener for the search button click
  searchBtn.addEventListener("click", function (event) {
    toggleSearchBar();
    // Prevent the click event from propagating to the document
    event.stopPropagation();
  });

  searchWord.addEventListener("click", function (event) {
    toggleSearchBar();
    // Prevent the click event from propagating to the document
    event.stopPropagation();
  });

  // Event listener for clicks outside the search bar
  document.addEventListener("click", function (event) {
    // Check if the search bar is open before handling clicks outside
    if (
      isSearchBarOpen &&
      !searchBar.contains(event.target) &&
      event.target !== searchBtn
    ) {
      toggleSearchBar();
    }
  });
});

// LOADER

const loader = document.getElementById("loader");

window.addEventListener("DOMContentLoaded", function () {
  loader.classList.add("hidden");
});

// TAKE TO PRODUCT PAGE
document.addEventListener("DOMContentLoaded", function () {
  const productClicked = document.getElementsByClassName("product-box");

  // TAKE TO PRODUCT PAGE
  document.addEventListener("DOMContentLoaded", function () {
    const productClicked = document.getElementsByClassName("product-box");

    for (let i = 0; i < productClicked.length; i++) {
      productClicked[i].addEventListener("click", (e) => {
        let productId = productClicked.getAttribute("data-id");

        console.log(productId);
        // window.location.href = "/product-page.html";
      });
    }
  });
});
// FOR DYNAMIC PRODUCTS
