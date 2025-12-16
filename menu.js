document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navDiv = document.querySelector(".nav-div");

  if (toggle && navDiv) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      navDiv.classList.toggle("open");
    });
  }
});
