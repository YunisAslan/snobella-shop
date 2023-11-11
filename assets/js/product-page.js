import { getAllProducts, getProductById } from "./requests.js";

const singleProductRow = document.querySelector(".single-product-row");
const loadingSpinner = document.querySelector(".spinner-border");
const youMayAlsoLikeWrapper = document.querySelector(
  ".you-may-also-like .swiper-wrapper"
);

const id = new URLSearchParams(location.search).get("id");

document.addEventListener("DOMContentLoaded", getOneProduct);

async function getOneProduct() {
  try {
    loadingSpinner.classList.replace("d-none", "d-block");

    const product = await getProductById(id);
    const size = product.size;
    // const discountedPrice =
    //   product.price - (product.price * product.discountPercent) / 100;

    getYouMayAlsoProducts(product.category);

    function applySizeStyles(selectedSize) {
      const sizeElements = document.querySelectorAll(".size span");

      sizeElements.forEach((element) => {
        element.classList.remove("selected");
      });

      const selectedSizeElement = document.querySelector(
        `.size[data-size="${selectedSize}"]`
      );

      if (selectedSizeElement) {
        selectedSizeElement.classList.add("selected");
      }
    }

    singleProductRow.innerHTML = `
  <div class="col-12 col-lg-5">
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
            <img src="${product.image}" alt="">
        </div>
    </div>
    </div>

    <div class="col-12 col-lg-7">
        <div class="d-flex flex-column mt-4 mt-lg-0 ms-lg-4">
            <h3>${product.name}</h3>
            <ul class="stars d-flex pb-2 column-gap-2">
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li><img src="./assets/media/icons/star.svg" alt=""></li>
                <li>5.0</li>
                <li>|</li>
                <li>2 reviews</li>
            </ul>
            <div class="d-flex column-gap-4">
                <div class="pieces">
                    <div class="d-flex align-items-center justify-content-between">
                        <span>2-9 pieces</span>
                        <h5 class="m-0">US $20.00</h5>
                    </div>
                </div>
                <div class="pieces">
                    <div class="d-flex align-items-center justify-content-between">
                        <span>10-49 pieces</span>
                        <h5 class="m-0">US $15.00</h5>
                    </div>
                </div>
            </div>
            <div class="d-flex column-gap-4">
                <div style="border: 1px solid #F75145;" class="pieces">
                    <div class="d-flex align-items-center justify-content-between">
                        <span>50 pieces</span>
                        <h5 style="color: #F75145;" class="m-0">US $12.00</h5>
                    </div>
                </div>
                <div class="pieces">
                    <div class="d-flex align-items-center justify-content-between">
                        <span>2-9 pieces</span>
                        <h5 class="m-0">US $20.00</h5>
                    </div>
                </div>
            </div>
            <div class="d-flex size-color">
                <div>
                    <h5 class="mb-4">Size</h5>

                    <div class="left d-flex flex-wrap gap-2">
                        <div class="size" data-size="XS"><span>XS</span></div>
                        <div class="size" data-size="S"><span>S</span></div>
                        <div class="size" data-size="M"><span>M</span></div>
                    </div>
                </div>

                <div class="right-wrapper">
                    <h5 class="mb-4">Color</h5>

                    <div class="right d-flex">
                        <div style="background: #cd5c0b;" class="color"></div>
                        <div style="background: #0085FF;" class="color"></div>
                        <div style="background: #35783B;" class="color"></div>
                        <div style="background: #ED0875;" class="color"></div>
                    </div>
                </div>
            </div>
            <div class="d-flex column-gap-4 adds">
                <div>
                    <button class="add-to-card-btn">Add to card</button>
                </div>
                <div>
                    <button class="cash-payment-btn">Cash payment</button>
                </div>
            </div>
            <div>
                <a style="color: black; text-decoration: underline !important;" href="#">WhatsApp
                Order</a>
            </div>


        </div>
    </div>

  `;

    applySizeStyles(size);
  } catch (err) {
    console.error(err);
  } finally {
    loadingSpinner.classList.replace("d-block", "d-none");
  }
}

async function getYouMayAlsoProducts(category) {
  const allProducts = await getAllProducts();

  const categorizedProducts = allProducts.filter(
    (product) => product.category === category
  );

  categorizedProducts.forEach((product) => {
    const discountedPrice =
      product.price - (product.price * product.discountPercent) / 100;

    youMayAlsoLikeWrapper.innerHTML += `
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
  });
}
