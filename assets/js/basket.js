import { getAllProducts } from "./requests.js";

const basketCount = document.querySelector(".basket-count");
const notFoundMsg = document.querySelector("#not-found-msg");
const loadingSpinner = document.querySelector(".spinner-border");
const basketCardsContainer = document.querySelector(".basket-cards");
const subtotalPrice = document.querySelector(".subtotal-price > span");
const totalPriceResult = document.querySelector(".total-price > span");

document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    notFoundMsg.classList.replace("d-none", "d-block");
  } else {
    getBasketProducts();
  }
});

async function getBasketProducts() {
  loadingSpinner.classList.replace("d-none", "d-block");

  const allProducts = await getAllProducts();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  loadingSpinner.classList.replace("d-block", "d-none");

  let total = 0;

  if (cart.length === 0) {
    alert("Don't have any product in your basket");
  }

  const filteredProducts = [];

  for (const cartItem of cart) {
    filteredProducts.push(
      allProducts.find((ogItem) => ogItem.id == cartItem.id)
    );
  }

  filteredProducts.forEach((product) => {
    const findEl = cart.find((findEl) => findEl.id == product.id);

    const discountedPrice =
      product.price - (product.price * product.discountPercent) / 100;

    // update UI
    const totalPrice = product.isDiscounted
      ? findEl.quantity * discountedPrice
      : findEl.quantity * product.price;

    total += totalPrice;
    subtotalPrice.textContent = total;
    totalPriceResult.textContent = total;

    basketCardsContainer.innerHTML += `
    <div class="basket-card" id="${product.id}">

        <div class="img-wrapper">
            <img src="${product.image}" alt="">
        </div>

        <div class="card-content">
            <div class="content-title d-flex justify-content-between">
                
                <h4><a class="text-dark" href="product-page.html?id=${
                  product.id
                }">${product.name}</a></h4>

                <h4>US ${
                  product.isDiscounted
                    ? `$${discountedPrice}`
                    : `$${product.price}`
                } <span>${
      product.isDiscounted ? `From $${product.price}` : ""
    }</span></h4>
            </div>

            <p>Size: ${product.size} <span class="ms-3">Color: ${
      product.color
    }</span></p>
            <p>Delivery: 12-17 days</p>
            <p>Quantity</p>

            <div class="quantity-actions">
                <button class="decrease-btn"><i class="fa-solid fa-minus"></i></button>
                <span class="items-quantity">${findEl.quantity}</span>
                <button class="increase-btn"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>

        <div class="card-btns d-flex align-items-center column-gap-4">
            <button class="add-to-favotites d-flex align-items-center column-gap-2">
                <i class="fa-regular fa-heart"></i>
                <span>Favorite</span>
            </button>
            <button class="delete-basket d-flex align-items-center column-gap-2">
                <img src="./assets/media/icons/trash.svg" alt="">
                <span>Remove</span>
            </button>
        </div>
    </div>`;
  });

  const increaseBtns = document.querySelectorAll(".increase-btn");
  const decreaseBtns = document.querySelectorAll(".decrease-btn");
  const deleteBtns = document.querySelectorAll(".delete-basket");

  increaseBtns.forEach((increaseBtn) => {
    increaseBtn.addEventListener("click", function () {
      const id = this.closest(".basket-card").id;
      const productQuantity = this.previousElementSibling;

      const findOgData = filteredProducts.find((findEl) => findEl.id == id);
      const findFromLocal = cart.find((findEl) => findEl.id == id);

      const discountedPrice =
        findOgData.price -
        (findOgData.price * findOgData.discountPercent) / 100;

      // update localStorage
      findFromLocal.quantity++;
      localStorage.setItem("cart", JSON.stringify([...cart]));

      //update UI
      productQuantity.textContent = findFromLocal.quantity;
      total += findOgData.isDiscounted ? discountedPrice : findOgData.price;
      subtotalPrice.textContent = total;
      totalPriceResult.textContent = total;
    });
  });

  decreaseBtns.forEach((decreaseBtn) => {
    decreaseBtn.addEventListener("click", function () {
      const id = this.closest(".basket-card").id;
      const productQuantity = this.nextElementSibling;

      const findOgData = filteredProducts.find((findEl) => findEl.id == id);
      const findFromLocal = cart.find((findEl) => findEl.id == id);

      const discountedPrice =
        findOgData.price -
        (findOgData.price * findOgData.discountPercent) / 100;

      if (findFromLocal.quantity === 1) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can't decrease!",
        });
      } else {
        // update localStorage
        findFromLocal.quantity--;
        localStorage.setItem("cart", JSON.stringify([...cart]));

        //update UI
        productQuantity.textContent = findFromLocal.quantity;
        total -= findOgData.isDiscounted ? discountedPrice : findOgData.price;
        subtotalPrice.textContent = total;
        totalPriceResult.textContent = total;
      }
    });
  });

  deleteBtns.forEach((delBtn) => {
    delBtn.addEventListener("click", function () {
      const id = this.closest(".basket-card").id;

      const index = cart.findIndex((findEl) => findEl.id == id);

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // delete from UI and localStorage
          this.closest(".basket-card").remove();

          const deletedData = cart[index];

          if (deletedData) {
            const deletedDataInfo = filteredProducts.find(
              (findEl) => findEl.id == deletedData.id
            );

            const discountedPrice =
              deletedDataInfo.price -
              (deletedDataInfo.price * deletedDataInfo.discountPercent) / 100;

            console.log(deletedDataInfo);

            total -= deletedDataInfo.isDiscounted
              ? deletedData.quantity * discountedPrice
              : deletedData.quantity * deletedDataInfo.price;

            subtotalPrice.textContent = total;
            totalPriceResult.textContent = total;
          }

          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify([...cart]));

          if (cart.length === 0) {
            notFoundMsg.classList.replace("d-none", "d-block");
          }

          basketCount.textContent = cart.length;

          Swal.fire("Deleted!", "Your album has been deleted.", "success");
        }
      });
    });
  });
}
