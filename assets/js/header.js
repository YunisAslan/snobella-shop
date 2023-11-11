const basketCount = document.querySelector(".basket-count");

// update header counters
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || 0;
  basketCount.innerText = cart.length;
});

// mobile menu
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

closeBtn.addEventListener("click", () => mobileMenu.classList.remove("active"));

// sticky navbar
const navbar = document.querySelector(".navbar");
const sticky = navbar.offsetTop;

function stickyNavbar() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

window.addEventListener("scroll", stickyNavbar);
