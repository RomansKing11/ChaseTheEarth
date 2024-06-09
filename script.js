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

  // if (exitButton) {
  //   // Check if menuButton exists
  //   exitButton.addEventListener("click", function () {
  //     menuMobile.style.display = "none";
  //   });
  // }
});

// SEARCH BAR
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-icon");
  const mainLogo = document.getElementById("main-logo-id");
  const searchBar = document.getElementById("search-bar-box");
  const searchMain = document.getElementsByClassName("search-bar")[0];
  let isSearchBarOpen = false;

  searchMain.addEventListener("click", () => {
    console.log("click");
  });

  function toggleSearchBar() {
    if (isSearchBarOpen) {
      searchBar.style.width = "0";
      searchBar.style.height = "0";
      mainLogo.classList.remove("hidden");
      searchMain.classList.remove("overtop");
      searchBar.style.backgroundColor = "var(--background-color)";
    } else {
      searchBar.style.width = "100%";
      searchBar.style.height = "100%";
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
