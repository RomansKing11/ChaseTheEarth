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

  for (let i = 0; i < productClicked.length; i++) {
    productClicked[i].addEventListener("click", (e) => {
      let target = e.target;
      let productId = null;

      // Search for the data-id attribute on the clicked element and its parent elements
      while (target && !productId) {
        productId = target.getAttribute("data-id");
        target = target.parentElement;
      }

      // console.log(productId);
      window.location.href = `/product-page.html?id=${productId}`;
    });
  }
});

// FOR DYNAMIC PRODUCTS
document.addEventListener("DOMContentLoaded", function () {
  const productName = document.getElementById("product-name");
  const productPrice = document.getElementById("product-price");
  const productDescription = document.getElementById("product-description");
  const productImageVariant = document.getElementsByClassName("image-variant");
  const productMainImage = document.getElementById("main-product-image");
  const productFlexColorOptions = document.getElementById(
    "flex-for-color-options"
  );

  fetch("json-files/products.json")
    .then((response) => response.json())
    .then((data) => {
      const productId = new URLSearchParams(window.location.search).get("id");
      const product = data.find((product) => product.id === productId);

      if (product) {
        const productNameH1 = document.createElement("h1");
        productNameH1.textContent = product.name;
        productName.appendChild(productNameH1);

        const productPriceH4 = document.createElement("h4");
        productPriceH4.textContent = product.price;
        productPrice.appendChild(productPriceH4);

        const productDescriptionP = document.createElement("p");
        productDescriptionP.textContent = product.description;
        productDescription.appendChild(productDescriptionP);

        // Count the number of color options
        const numberOfColorOptions = product.colors.length;
        console.log("Number of color options:", numberOfColorOptions);

        // Get the first image of the color
        const firstColorImage = product.colors[0].image;
        console.log("First color image:", firstColorImage);

        // Loop through the color options and create the image tags
        for (let i = 0; i < numberOfColorOptions; i++) {
          const colorOptionDiv = document.createElement("div");
          colorOptionDiv.classList.add("color-options");
          colorOptionDiv.id = `color-option${i + 1}`;

          const imageTag = document.createElement("img");
          imageTag.src = product.colors[i].image;

          colorOptionDiv.appendChild(imageTag);
          productFlexColorOptions.appendChild(colorOptionDiv);
        }

        // Append the color options div to the color options section
        const colorOptionsSection = document.querySelector(
          ".color-options-section"
        );
        colorOptionsSection.appendChild(colorOptionsDiv);

        // Set the first color image as the main product image
        productMainImage.src = firstColorImage;
      } else {
        // Handle the case when the product is not found
        console.log("Product not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
});
