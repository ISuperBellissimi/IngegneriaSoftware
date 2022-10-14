var swiper = new Swiper(".slide-content", {
  slidesPerView: 5,
  spaceBetween: 0,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    200: {
      slidesPerView: 2,
    },
    400: {
      slidesPerView: 3,
    },
    600: {
      slidesPerView: 3,
    },
    800: {
      slidesPerView: 3,
    },
  },
});