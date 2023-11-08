const panelTriggers = document.querySelectorAll(".product-list-inner__row h3");

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
