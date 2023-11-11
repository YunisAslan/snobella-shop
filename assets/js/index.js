import { getAllProducts } from "./requests.js";

const bagsContainer = document.querySelector(".bag-section .swiper-wrapper");
const featuredProductsContainer = document.querySelector(
  ".featured-products .swiper-wrapper"
);
const bestSellerProductsContainer = document.querySelector(
  ".bestseller-products .swiper-wrapper"
);
const discountedProductsContainer = document.querySelector(
  ".discount-products .swiper-wrapper"
);

document.addEventListener("DOMContentLoaded", () => {
  getCategorizedProducts();
  getFilteredProducts();
});

// filters
async function getCategorizedProducts() {
  const products = await getAllProducts();
  let differentCategories = [];

  // classified by different categories
  for (let i = 0; i < products.length; i++) {
    const element = products[i];
    let categoryExists = false;

    for (let j = 0; j < products.length; j++) {
      const existingCategory = differentCategories[j];

      if (element?.category === existingCategory?.category) {
        categoryExists = true;
        break;
      }
    }

    if (!categoryExists) {
      const image = element.image;
      const category = element.category;
      differentCategories.push({ category, image });
    }
  }

  differentCategories.forEach((diffCat) => {
    bagsContainer.innerHTML += `
    <div class="swiper-slide">
      <div class="box">
          <h3>${diffCat.category}</h3>
          <div class="box-img">
            <img src="${diffCat.image}">
          </div>
      </div>
    </div>`;
  });
}

async function getFilteredProducts() {
  const allProducts = await getAllProducts();

  // featured products
  const featuredProducts = allProducts.filter((product) => product.isFeatured);
  featuredProducts.forEach((product) => {
    generateIntuitiveProduct(featuredProductsContainer, product);
  });

  // bestseller products
  const bestSellingProducts = allProducts.filter(
    (product) => product.isBestSeller
  );
  bestSellingProducts.forEach((product) => {
    generateIntuitiveProduct(bestSellerProductsContainer, product);
  });

  // discounted products
  const discountedProducts = allProducts.filter(
    (product) => product.isDiscounted
  );
  discountedProducts.forEach((product) => {
    generateIntuitiveProduct(discountedProductsContainer, product);
  });
}

function generateIntuitiveProduct(place, product) {
  const discountedPrice =
    product.price - (product.price * product.discountPercent) / 100;

  place.innerHTML += `
   <div class="swiper-slide">
    <a href="product-page.html?id=${product.id}">
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
    </a>
  </div>
  `;
}
