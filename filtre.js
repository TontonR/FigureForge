document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filtre-btn");
  const figures = document.querySelectorAll(".figura");
  const searchInput = document.getElementById("search");

  function applyFilters() {
    const activeFilters = Array.from(
      document.querySelectorAll(".filtre-btn.active")
    ).map((btn) => btn.dataset.filter);

    const searchText = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    figures.forEach((figure) => {
      const anime = figure.dataset.anime;
      const name = figure
        .querySelector(".nom-figura")
        .textContent.toLowerCase();

      const matchesAnime =
        activeFilters.length === 0 || activeFilters.includes(anime);

      const matchesSearch = searchText === "" || name.includes(searchText);

      figure.style.display = matchesAnime && matchesSearch ? "block" : "none";
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  applyFilters();
});
