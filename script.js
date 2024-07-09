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

// FOR MAIN PAGE PRODUCTS

// for new pieces section
document.addEventListener("DOMContentLoaded", function () {
  const productSection = document.getElementById("product-section");

  // Fetch products from JSON file
  fetch("json-files/new-pieces.json")
    .then((response) => response.json())
    .then((data) => {
      const products = data;

      // const numberOfProducts = products.colors;
      // console.log(numberOfProducts);

      // Create a div for each product
      products.forEach((product) => {
        const productBox = document.createElement("div");
        productBox.setAttribute("data-id", product.id);
        productBox.classList.add("product-box");
        productBox.addEventListener("mouseenter", () => {
          img1.classList.add("hidden");
          img2.classList.remove("hidden");
        });
        productBox.addEventListener("mouseleave", () => {
          img1.classList.remove("hidden");
          img2.classList.add("hidden");
        });

        // Create product-content div
        const productContent = document.createElement("div");
        productContent.classList.add("product-content");

        productBox.appendChild(productContent);

        // Create box-inside div
        const boxInside = document.createElement("div");
        boxInside.classList.add("box-inside");

        // Create img tags for product images
        const img1 = document.createElement("img");
        img1.setAttribute("src", product.colors[0].images[0].image1);
        img1.classList.add("img1");
        boxInside.appendChild(img1);

        const img2 = document.createElement("img");
        img2.setAttribute("src", product.colors[0].images[0].image2);
        img2.classList.add("img2");
        img2.classList.add("hidden");
        boxInside.appendChild(img2);

        productContent.appendChild(boxInside);

        // Create product-details div
        const productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        // Create product-name h3
        const productName = document.createElement("h3");
        productName.classList.add("product-name");
        productName.textContent = product.name;
        productDetails.appendChild(productName);

        // Create product-price p
        const productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price;
        productDetails.appendChild(productPrice);

        productBox.appendChild(productDetails);

        // Create color-choices div
        const colorChoices = document.createElement("div");
        colorChoices.classList.add("color-choices");

        // Create color-circle divs for each color
        product.colors.forEach((color, index) => {
          const colorCircle = document.createElement("div");
          colorCircle.classList.add("color-circle", `color${index + 1}`);
          colorCircle.style.backgroundColor = color.colorCode;
          colorChoices.appendChild(colorCircle);
        });
        productContent.appendChild(productDetails);
        productDetails.appendChild(colorChoices);

        // Append productBox to the main section
        productSection.appendChild(productBox);
      });
      // TAKE TO PRODUCT PAGE
      const productBox = document.querySelectorAll(".product-box");

      productBox.forEach((box) => {
        box.addEventListener("click", (e) => {
          let target = e.target;
          let productIdBox = null;
          // Search for the data-id attribute on the clicked element and its parent elements
          while (target && !productIdBox) {
            productIdBox = target.getAttribute("data-id");
            target = target.parentElement;
          }

          // Call the dynamicProductPage function with the productId
          console.log("Clicked product ID:", productIdBox);

          window.location.href = `/product-page.html?id=${productIdBox}`;
        });
      });
    });
});

// FOR DYNAMIC PRODUCTS IN PRODUCT PAGE
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

        // Get the first image of the color
        const firstColorImage = product.colors[0].images[0].image1;

        // Loop through the color options and create the image tags
        for (let i = 0; i < numberOfColorOptions; i++) {
          const colorOptionDiv = document.createElement("div");
          colorOptionDiv.classList.add("color-options");
          colorOptionDiv.id = `color-option${i + 1}`;
          colorOptionDiv.title = product.colors[i].name;

          const imageTag = document.createElement("img");
          imageTag.src = product.colors[i].images[0].image1;

          colorOptionDiv.appendChild(imageTag);
          productFlexColorOptions.appendChild(colorOptionDiv);
        }

        // Set the image variant images
        const productImagesSection = document.getElementById(
          "flex-for-img-variants"
        );

        if (product && product.colors && product.colors.length > 0) {
          // Assuming we want to work with the first color variant
          const colorVariant = product.colors[0];

          // Extract image URLs
          const imageObjects = colorVariant.images[0]; // Access the first object in the images array
          const imageUrls = Object.values(imageObjects);

          // Count how many images there are
          const imagesOfProductForVariant = imageUrls.length;

          for (let h = 0; h < imagesOfProductForVariant; h++) {
            const img = document.createElement("img");
            img.className = "image-variant unselectable";
            img.id = `image-variant${h + 1}`;
            img.src = imageUrls[h];
            productImagesSection.appendChild(img);
          }

          // // Create img elements and append them
          // imageUrls.forEach((imageUrl, index) => {
          //   const img = document.createElement("img");
          //   img.className = "image-variant";
          //   img.className = "unselectable";
          //   img.className = "unselectable";
          //   img.src = imageUrl;
          //   productImagesSection.appendChild(img);
          // });
        } else {
          console.error("No color variants found for this product");
        }

        // Set the first color image as the main product image
        productMainImage.src = product.colors[0].images[0].image1;
      } else {
        // Handle the case when the product is not found
        console.log("Product not found");
      }
    })

    .catch((error) => {
      console.error("Error fetching products:", error);
    });
});

// to set the color of the shirts and change main image to image variant

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const colorOptionDivs = document.getElementsByClassName("color-options");
    const productMainImage = document.getElementById("main-product-image");
    const variantImages = document.getElementsByClassName("image-variant");

    let selectedColorDiv = colorOptionDivs[0]; // Initialize with the first color option

    // Add the "selected" class to the first color option
    selectedColorDiv.classList.add("selected");

    // Add event listener to each color option
    for (let i = 0; i < colorOptionDivs.length; i++) {
      colorOptionDivs[i].addEventListener("click", function () {
        // Remove the "selected" class from the previously selected color option
        if (selectedColorDiv) {
          selectedColorDiv.classList.remove("selected");
        }

        // Add the "selected" class to the clicked color option
        selectedColorDiv = colorOptionDivs[i];
        selectedColorDiv.classList.add("selected");

        fetch("json-files/products.json")
          .then((response) => response.json())
          .then((data) => {
            const productId = new URLSearchParams(window.location.search).get(
              "id"
            );
            const product = data.find((product) => product.id === productId);

            const selectedColor = product.colors[i];
            const images = selectedColor.images[0];

            let imageIndex = 1;

            for (let j = 0; j < variantImages.length; j++) {
              const imageKey = `image${imageIndex}`;
              if (images[imageKey]) {
                variantImages[j].src = images[imageKey];
              }
              imageIndex++;
            }

            // Event listener for each variant image
            Array.from(variantImages).forEach((variantImage, index) => {
              variantImage.addEventListener("click", () => {
                // Remove selected class from all variant images
                Array.from(variantImages).forEach((img) => {
                  img.classList.remove("selected");
                });

                // Add selected class to the clicked variant image
                variantImage.classList.add("selected");

                // Change the main product image to the clicked variant image src
                productMainImage.src = variantImage.src;
              });
            });
          });
      });
    }
  }, 100); // Basically just add a delay of 50ms cause it was trying to access the classes before they were fully loaded.
});
