import { getAllProducts } from "./requests.js";

const notFoundMsg = document.querySelector("#not-found-msg");
const panelTriggers = document.querySelectorAll(".product-list-inner__row h3");
const productListRow = document.querySelector(".product-list-row");
const loadingSpinner = document.querySelector(".spinner-border");
const productsTypeSelect = document.querySelector(".products-type-select");
const productsResultQuantity = document.querySelector(
  ".products-result-quantity"
);

document.addEventListener("DOMContentLoaded", () => {
  getInitialProducts();
});

panelTriggers.forEach((panelTrigger) => {
  panelTrigger.addEventListener("click", function () {
    this.nextElementSibling.classList.toggle("active");

    if (this.nextElementSibling.classList.contains("active")) {
      this.children[0].style.transform = "rotate(90deg)";
    } else {
      this.children[0].style.transform = "rotate(270deg)";
    }
  });
});

let defaultProductsArr = [];

async function getInitialProducts() {
  try {
    loadingSpinner.classList.replace("d-none", "d-block");

    const allProducts = await getAllProducts();
    defaultProductsArr = allProducts;

    productListRow.innerHTML = "";
    allProducts.forEach((product) => {
      generateIntuitiveProduct(product);
    });

    updateResultQuantity(allProducts.length);
  } catch (err) {
    console.error(err);
  } finally {
    loadingSpinner.classList.replace("d-block", "d-none");
  }
}

// select products by TYPES
productsTypeSelect.addEventListener("change", function (e) {
  const selectedValue = e.target.value;

  if (selectedValue === "all") {
    productListRow.innerHTML = "";
    getInitialProducts();

    updateResultQuantity(defaultProductsArr.length);
  }

  if (selectedValue === "featured") {
    const isFeaturedProducts = defaultProductsArr.filter(
      (product) => product.isFeatured
    );

    productListRow.innerHTML = "";
    isFeaturedProducts.forEach((product) => {
      generateIntuitiveProduct(product);
    });

    updateResultQuantity(isFeaturedProducts.length);
  }

  if (selectedValue === "bestseller") {
    const isBestSellerProducts = defaultProductsArr.filter(
      (product) => product.isBestSeller
    );

    productListRow.innerHTML = "";
    isBestSellerProducts.forEach((product) => {
      generateIntuitiveProduct(product);
    });

    updateResultQuantity(isBestSellerProducts.length);
  }

  if (selectedValue === "discounted") {
    const isDiscountedProducts = defaultProductsArr.filter(
      (product) => product.isDiscounted
    );

    productListRow.innerHTML = "";
    isDiscountedProducts.forEach((product) => {
      generateIntuitiveProduct(product);
    });

    updateResultQuantity(isDiscountedProducts.length);
  }
});

// filter products by CATEGORY
document
  .querySelector(".categories-panel > .panel-list")
  .addEventListener("click", function (e) {
    const selectedCategory = e.target.getAttribute("data-category");

    filterProductsByCategory(selectedCategory);
  });

function filterProductsByCategory(category) {
  const categorizedProducts = defaultProductsArr.filter(
    (product) => product.category === category
  );

  productListRow.innerHTML = "";
  categorizedProducts.forEach((product) => {
    generateIntuitiveProduct(product);
  });

  updateResultQuantity(categorizedProducts.length);
}

// filter products by PRICE
document.querySelector("#price-filter-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const minPrice = parseFloat(document.querySelector("#min-price").value);
  const maxPrice = parseFloat(document.querySelector("#max-price").value);

  filterProductsByPrice(minPrice, maxPrice);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

function filterProductsByPrice(minPrice, maxPrice) {
  const filteredProducts = defaultProductsArr.filter((product) => {
    if (product.isDiscounted) {
      const discountedPrice =
        product.price - (product.price * product.discountPercent) / 100;
      return discountedPrice >= minPrice && discountedPrice <= maxPrice;
    } else {
      return product.price >= minPrice && product.price <= maxPrice;
    }
  });

  productListRow.innerHTML = "";
  filteredProducts.forEach((product) => {
    generateIntuitiveProduct(product);
  });

  updateResultQuantity(filteredProducts.length);
}

// filter products by SIZE
document
  .querySelector(".size-panel > .panel-list")
  .addEventListener("click", function (e) {
    const selectedSize = e.target.getAttribute("data-size");

    filterProductsBySize(selectedSize);
  });

function filterProductsBySize(size) {
  const categorizedProducts = defaultProductsArr.filter(
    (product) => product.size === size
  );

  productListRow.innerHTML = "";
  categorizedProducts.forEach((product) => {
    generateIntuitiveProduct(product);
  });

  updateResultQuantity(categorizedProducts.length);
}

// update products result
function updateResultQuantity(productsLength) {
  productsResultQuantity.innerText = `${productsLength} result`;

  if (productsLength === 0) {
    notFoundMsg.classList.replace("d-none", "d-block");
  } else {
    notFoundMsg.classList.replace("d-block", "d-none");
  }
}

// generate all products cards
function generateIntuitiveProduct(product) {
  const discountedPrice =
    product.price - (product.price * product.discountPercent) / 100;

  productListRow.innerHTML += `
   <div class="col-12 col-md-6 col-xl-6">
    <div class="product-card">
        <div class="d-flex justify-content-between align-items-center">
            <div class="product-feat ${
              product.isDiscounted ? "sale" : product.isNew ? "new" : ""
            }">
                <span>${
                  product.isDiscounted
                    ? `${product.discountPercent}%`
                    : product.isNew
                    ? "New"
                    : ""
                }</span>
            </div>

            <button class="border-0 bg-transparent heart-btn">
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>

        <div class="img-wrapper">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-info">
            <ul class="stars d-flex pb-2 column-gap-2">
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
            </ul>

            <h5>${product.name}</h5>

            <div class="price-discount">
            
              <p>${
                product.isDiscounted
                  ? `$${discountedPrice}`
                  : `$${product.price}`
              } <span>${
    product.isDiscounted ? `From $${product.price}` : ""
  }</span></p>
            </div>
        </div>

        <div>
            <button class="add-to-card-btn">Add to card</button>
        </div>
    </div>
  </div>
  `;
}
