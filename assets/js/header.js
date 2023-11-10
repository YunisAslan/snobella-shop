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

console.log(sticky);
console.log(window.scrollY);

function stickyNavbar() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

window.addEventListener("scroll", stickyNavbar);
