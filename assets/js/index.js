// swiper js configiration (hero section)
new Swiper(".hero-swiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

// swiper js configiration (bags section)
new Swiper(".bags-swiper", {
  slidesPerView: 4,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    // prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    868: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1124: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

// swiper js configiration (product cards)
new Swiper(".products-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});
