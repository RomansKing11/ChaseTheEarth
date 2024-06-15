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

// SEARCH BAR
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-word");
  const searchWord = document.getElementById("search-icon");
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

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const mainContent = document.getElementById("main-content");
  const homeLink = document.getElementById("home-link");

  if (!sessionStorage.getItem("loaderShown")) {
    sessionStorage.setItem("loaderShown", "true");
    showLoader();
  } else {
    hideLoader();
  }

  homeLink.addEventListener("click", (event) => {
    if (sessionStorage.getItem("loaderShown") === "true") {
      event.preventDefault();
      hideLoader();
    }
  });

  function showLoader() {
    loader.classList.remove("hidden");
    mainContent.classList.add("hidden");
    setTimeout(hideLoader, 1200); // Simulate loading time
  }

  function hideLoader() {
    loader.classList.add("hidden");
    mainContent.classList.remove("hidden");
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
  }
});

// FOR DYNAMIC PRODUCTS

// FOR PRODUCT-BOX

document.addEventListener("DOMContentLoaded", () => {
  const productBoxes = document.querySelectorAll(".product-box");

  productBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const productId = box.getAttribute("data-id");
      if (productId) {
        window.location.href = `product-page.html?id=${productId}`;
      } else {
        console.error("Product ID not found");
      }
    });
  });
});

// FOR PRODUCT PAGE

// TO CHANGE IMAGE WITH COLOR ETC

document.addEventListener("DOMContentLoaded", () => {
  // Fetch the product data
  fetch("/json-files/products.json")
    .then((response) => response.json())
    .then((products) => {
      // Get the product ID from the URL
      const params = new URLSearchParams(window.location.search);
      const productId = params.get("id");

      if (productId) {
        // Find the product with the matching ID
        const product = products.find((p) => p.id === productId); //p => p.id === productId is an arrow function used as the testing function inside .find(). p represents each product object in the products array as the .find() method iterates through the array.
        if (product) {
          // Update the HTML elements with the product data
          document.getElementById("product-image").src = product.image;
          document.getElementById("product-image2").src = product.image2;
          document.getElementById("product-image3").src = product.image3;
          document.getElementById("product-image4").src = product.image4;
          document.getElementById("product-name").textContent = product.name;
          document.getElementById("product-description").textContent =
            product.description;
          document.getElementById("product-price").textContent = product.price;

          const colorOptionsContainer =
            document.querySelector("#color-options");
          colorOptionsContainer.innerHTML = ""; // Clear any existing color options

          product.colors.forEach((color) => {
            const colorDiv = document.createElement("div");
            colorDiv.className = "color-option";

            const colorImage = document.createElement("img");
            colorImage.src = color.image;
            colorImage.alt = color.name;
            colorImage.title = color.name; // For accessibility

            colorDiv.appendChild(colorImage);
            colorOptionsContainer.appendChild(colorDiv);

            // Add click event listener to change main product image
            colorDiv.addEventListener("click", () => {
              document.getElementById("product-image").src = color.image;
              document.getElementById("product-image2").src = color.image2;
              document.getElementById("product-image3").src = color.image3;
              document.getElementById("product-image4").src = color.image4;
            });
          });
        } else {
          console.error("Product not found");
        }
      } else {
        console.error("No product ID in URL");
      }
    })
    .catch((error) => console.error("Error fetching product data:", error));
});

// FOR SIZE CHART

document.addEventListener("DOMContentLoaded", () => {
  let selectedSize = null;

  document.querySelectorAll(".size-option").forEach((option) => {
    option.addEventListener("click", () => {
      // Remove the selected class from all size options
      document
        .querySelectorAll(".size-option")
        .forEach((opt) => opt.classList.remove("selected"));

      // Add the selected class to the clicked size option
      option.classList.add("selected");

      // Save the selected size
      selectedSize = option.getAttribute("data-size");

      // Log the selected size (for debugging)
      console.log("Selected size:", selectedSize);

      // You can save the selected size to localStorage or a global variable for later use
      localStorage.setItem("selectedSize", selectedSize);
    });
  });
});

// POPUP FOR SIZE CHART

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const sizeChartDiagram = document.getElementById("size-chart-diagram");
  const closeBtn = document.querySelector(".close-btn");

  // Show the popup when the button is clicked
  sizeChartDiagram.addEventListener("click", () => {
    popup.style.display = "block";
  });

  // Close the popup when the close button is clicked
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close the popup when clicking outside the popup content
  window.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
});

// YOU MAY LIKE SECTION

document.addEventListener("DOMContentLoaded", () => {
  const maxProducts = 10; // Maximum number of products to display

  fetch("/json-files/products.json")
    .then((response) => response.json())
    .then((productOptions) => {
      const totalProducts = productOptions.length;
      const selectedProducts = [];

      // Function to generate random unique indices
      function getRandomUniqueIndices(maxIndex, count) {
        const indices = [];
        while (indices.length < count) {
          const randomIndex = Math.floor(Math.random() * maxIndex);
          if (!indices.includes(randomIndex)) {
            indices.push(randomIndex);
          }
        }
        return indices;
      }

      // Get random unique indices
      const randomIndices = getRandomUniqueIndices(
        totalProducts,
        Math.min(maxProducts, totalProducts)
      );

      // Add selected products based on random indices
      randomIndices.forEach((index) => {
        const product = productOptions[index];
        selectedProducts.push(product);
      });

      // Create elements for selected products
      selectedProducts.forEach((option) => {
        const createdDiv = document.createElement("div");
        createdDiv.className = "youmaylike-product";
        createdDiv.setAttribute("data-id", option.id); // Set data-id attribute

        const createdImg = document.createElement("img");
        createdImg.src = option.image;

        const createdH3 = document.createElement("h3");
        createdH3.textContent = option.name;

        createdDiv.appendChild(createdImg);
        createdDiv.appendChild(createdH3);

        document.getElementById("flex2").appendChild(createdDiv);

        createdDiv.addEventListener("click", () => {
          // Retrieve data-id attribute value
          const productId = createdDiv.getAttribute("data-id");

          // Navigate to product page using the productId
          window.location.href = `/product-page.html?id=${productId}`;
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching or parsing products:", error);
    });
});

// ,

//   {
//     "id": "test",
//     "name": "test1",
//     "description": "I mean this painting is amazing, I hope I made it justice on this design. I had to make it a hoodie too, it is just too nice.",
//     "price": "49,99€",
//     "image": "images/creationadam hoodie/white back simple.png",
//     "image2": "images/creationadam hoodie/white front simple.png",
//     "image3": "images/creationadam hoodie/white back model.png",
//     "image4": "images/creationadam hoodie/white front detail.png",
//     "colors": [
//       {
//         "name": "White",
//         "image": "images/creationadam hoodie/white back simple.png",
//         "image2": "images/creationadam hoodie/white front simple.png",
//         "image3": "images/creationadam hoodie/white back model.png",
//         "image4": "images/creationadam hoodie/white front detail.png"
//       },
//       {
//         "name": "Grey",
//         "image": "images/creationadam hoodie/grey back simple.png",
//         "image2": "images/creationadam hoodie/grey front simple.png",
//         "image3": "images/creationadam hoodie/grey back model.png",
//         "image4": "images/creationadam hoodie/grey front model.png"
//       }
//     ]
//   },

//   {
//     "id": "test",
//     "name": "test2",
//     "description": "I mean this painting is amazing, I hope I made it justice on this design. I had to make it a hoodie too, it is just too nice.",
//     "price": "49,99€",
//     "image": "images/creationadam hoodie/white back simple.png",
//     "image2": "images/creationadam hoodie/white front simple.png",
//     "image3": "images/creationadam hoodie/white back model.png",
//     "image4": "images/creationadam hoodie/white front detail.png",
//     "colors": [
//       {
//         "name": "White",
//         "image": "images/creationadam hoodie/white back simple.png",
//         "image2": "images/creationadam hoodie/white front simple.png",
//         "image3": "images/creationadam hoodie/white back model.png",
//         "image4": "images/creationadam hoodie/white front detail.png"
//       },
//       {
//         "name": "Grey",
//         "image": "images/creationadam hoodie/grey back simple.png",
//         "image2": "images/creationadam hoodie/grey front simple.png",
//         "image3": "images/creationadam hoodie/grey back model.png",
//         "image4": "images/creationadam hoodie/grey front model.png"
//       }
//     ]
//   },

//   {
//     "id": "test",
//     "name": "test3",
//     "description": "I mean this painting is amazing, I hope I made it justice on this design. I had to make it a hoodie too, it is just too nice.",
//     "price": "49,99€",
//     "image": "images/creationadam hoodie/white back simple.png",
//     "image2": "images/creationadam hoodie/white front simple.png",
//     "image3": "images/creationadam hoodie/white back model.png",
//     "image4": "images/creationadam hoodie/white front detail.png",
//     "colors": [
//       {
//         "name": "White",
//         "image": "images/creationadam hoodie/white back simple.png",
//         "image2": "images/creationadam hoodie/white front simple.png",
//         "image3": "images/creationadam hoodie/white back model.png",
//         "image4": "images/creationadam hoodie/white front detail.png"
//       },
//       {
//         "name": "Grey",
//         "image": "images/creationadam hoodie/grey back simple.png",
//         "image2": "images/creationadam hoodie/grey front simple.png",
//         "image3": "images/creationadam hoodie/grey back model.png",
//         "image4": "images/creationadam hoodie/grey front model.png"
//       }
//     ]
//   },

//   {
//     "id": "test",
//     "name": "test4",
//     "description": "I mean this painting is amazing, I hope I made it justice on this design. I had to make it a hoodie too, it is just too nice.",
//     "price": "49,99€",
//     "image": "images/creationadam hoodie/white back simple.png",
//     "image2": "images/creationadam hoodie/white front simple.png",
//     "image3": "images/creationadam hoodie/white back model.png",
//     "image4": "images/creationadam hoodie/white front detail.png",
//     "colors": [
//       {
//         "name": "White",
//         "image": "images/creationadam hoodie/white back simple.png",
//         "image2": "images/creationadam hoodie/white front simple.png",
//         "image3": "images/creationadam hoodie/white back model.png",
//         "image4": "images/creationadam hoodie/white front detail.png"
//       },
//       {
//         "name": "Grey",
//         "image": "images/creationadam hoodie/grey back simple.png",
//         "image2": "images/creationadam hoodie/grey front simple.png",
//         "image3": "images/creationadam hoodie/grey back model.png",
//         "image4": "images/creationadam hoodie/grey front model.png"
//       }
//     ]
//   } FOR -JSON
