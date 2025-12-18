//SCRIPT FET AMB IA
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filtre-btn");
  const figures = document.querySelectorAll(".figura");
  const searchInput = document.getElementById("search");

  // Función para activar filtros desde URL
  function activateFiltersFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const filters = urlParams.get("filters");

    if (filters) {
      const filterArray = filters.split(",").map((f) => f.trim().toLowerCase());

      filterButtons.forEach((button) => {
        if (filterArray.includes(button.dataset.filter.toLowerCase())) {
          button.classList.add("active");
        }
      });
    }
  }

  function applyFilters() {
    // Agrupar filtros activos por sección
    const filtersBySection = {};

    document.querySelectorAll(".filtres-section").forEach((section) => {
      const activeInSection = Array.from(
        section.querySelectorAll(".filtre-btn.active")
      ).map((btn) => btn.dataset.filter.toLowerCase());

      if (activeInSection.length > 0) {
        // Usar el índice de la sección como clave
        const sectionIndex = Array.from(
          document.querySelectorAll(".filtres-section")
        ).indexOf(section);
        filtersBySection[sectionIndex] = activeInSection;
      }
    });

    // Obtener el texto de búsqueda
    const searchText = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    figures.forEach((figure) => {
      // Obtener las etiquetas de la figura y convertirlas en array
      const tagsString = figure.dataset.tags || "";
      const figureTags = tagsString
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      // Obtener el nombre de la figura
      const name = figure
        .querySelector(".nom-figura")
        .textContent.toLowerCase();

      // Verificar si la figura coincide con los filtros
      // Debe cumplir AL MENOS UNA etiqueta de CADA sección activa (AND entre secciones, OR dentro de sección)
      const matchesFilters =
        Object.keys(filtersBySection).length === 0 ||
        Object.values(filtersBySection).every((sectionFilters) =>
          sectionFilters.some((filter) => figureTags.includes(filter))
        );

      // Verificar si coincide con la búsqueda
      const matchesSearch = searchText === "" || name.includes(searchText);

      // Mostrar u ocultar la figura
      figure.style.display = matchesFilters && matchesSearch ? "block" : "none";
    });
  }

  // Activar filtros desde URL al cargar la página
  activateFiltersFromURL();

  // Añadir event listeners a los botones de filtro
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      applyFilters();
    });
  });

  // Añadir event listener al buscador
  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // Aplicar filtros iniciales
  applyFilters();
});
