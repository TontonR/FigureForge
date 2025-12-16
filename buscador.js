document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const searchButton = document.querySelector(".buscador button");

  if (!searchButton || !searchInput) return;

  // Detectar si estamos en una subpágina (dentro de /figures/)
  const isInSubpage = window.location.pathname.includes("/figures/");

  // Array con todas las figuras disponibles
  const allFigures = [
    {
      name: "Goku Superguerrer",
      anime: "Dragon Ball",
      url: isInSubpage ? "goku.html" : "figures/goku.html",
    },
    {
      name: "Vegeta",
      anime: "Dragon Ball",
      url: isInSubpage ? "vegeta.html" : "figures/vegeta.html",
    },
    {
      name: "Corpetit",
      anime: "Dragon Ball",
      url: isInSubpage ? "corpetit.html" : "figures/corpetit.html",
    },
    {
      name: "Freezer forma final",
      anime: "Dragon Ball",
      url: isInSubpage ? "freezer.html" : "figures/freezer.html",
    },
    {
      name: "Naruto Uzumaki",
      anime: "Naruto",
      url: isInSubpage ? "naruto.html" : "figures/naruto.html",
    },
    {
      name: "Sasuke Uchiha",
      anime: "Naruto",
      url: isInSubpage ? "sasuke.html" : "figures/sasuke.html",
    },
    {
      name: "Kakashi Hatake",
      anime: "Naruto",
      url: isInSubpage ? "kakashi.html" : "figures/kakashi.html",
    },
    {
      name: "Sakura Haruno",
      anime: "Naruto",
      url: isInSubpage ? "sakura.html" : "figures/sakura.html",
    },
    {
      name: "Monky D Luffy",
      anime: "One Piece",
      url: isInSubpage ? "luffy.html" : "figures/luffy.html",
    },
    {
      name: "Roronoa Zoro",
      anime: "One Piece",
      url: isInSubpage ? "zoro.html" : "figures/zoro.html",
    },
    {
      name: "Yuji Itadori",
      anime: "Jujutsu Kaisen",
      url: isInSubpage ? "itadori.html" : "figures/itadori.html",
    },
    {
      name: "Satoru Gojo",
      anime: "Jujutsu Kaisen",
      url: isInSubpage ? "gojo.html" : "figures/gojo.html",
    },
    {
      name: "Tanjiro Kamado",
      anime: "Demon Slayer",
      url: isInSubpage ? "tanjiro.html" : "figures/tanjiro.html",
    },
    {
      name: "Kyojuro Rengoku",
      anime: "Demon Slayer",
      url: isInSubpage ? "rengoku.html" : "figures/rengoku.html",
    },
    {
      name: "Jotaro Kujo",
      anime: "JoJo's Bizarre Adventure",
      url: isInSubpage ? "jotaro.html" : "figures/jotaro.html",
    },
    {
      name: "Dio Brando",
      anime: "JoJo's Bizarre Adventure",
      url: isInSubpage ? "dio.html" : "figures/dio.html",
    },
    {
      name: "Izuku Midoriya",
      anime: "My Hero Academia",
      url: isInSubpage ? "izuku.html" : "figures/izuku.html",
    },
    {
      name: "Asta",
      anime: "Black Clover",
      url: isInSubpage ? "asta.html" : "figures/asta.html",
    },
  ];

  // Función para mostrar notificación estilizada
  function showSearchNotification(matches, searchText) {
    // Eliminar notificación previa si existe
    const oldNotif = document.querySelector(".search-notif");
    if (oldNotif) oldNotif.remove();

    // Crear el elemento de notificación
    const notif = document.createElement("div");
    notif.className = "search-notif";

    // Estilos del globo de texto
    Object.assign(notif.style, {
      position: "absolute",
      top: "calc(100% + 15px)",
      right: "0",
      minWidth: "280px",
      maxWidth: "400px",
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      border: "2px solid #e74c3c",
      borderRadius: "16px",
      padding: "16px 20px",
      boxShadow: "0 8px 24px rgba(231, 76, 60, 0.2), 0 4px 8px rgba(0,0,0,0.1)",
      zIndex: "10000",
      opacity: "0",
      transform: "translateY(-10px)",
      transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      color: "#2c3e50",
      fontSize: "14px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    });

    // Crear la flecha del globo
    const arrow = document.createElement("div");
    Object.assign(arrow.style, {
      position: "absolute",
      top: "-10px",
      right: "20px",
      width: "0",
      height: "0",
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: "10px solid #e74c3c",
    });
    notif.appendChild(arrow);

    // Flecha interna (blanca)
    const arrowInner = document.createElement("div");
    Object.assign(arrowInner.style, {
      position: "absolute",
      top: "2px",
      left: "-8px",
      width: "0",
      height: "0",
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderBottom: "8px solid #ffffff",
    });
    arrow.appendChild(arrowInner);

    // Contenedor del contenido
    const content = document.createElement("div");

    // Sin resultados
    if (matches.length === 0) {
      const icon = document.createElement("span");
      icon.textContent = "🔍 ";
      icon.style.fontSize = "18px";

      const text = document.createElement("span");
      text.textContent = `No s'ha trobat cap resultat per "${searchText}"`;
      text.style.color = "#2c3e50";

      content.appendChild(icon);
      content.appendChild(text);
    }
    // Múltiples resultados
    else {
      const title = document.createElement("div");
      title.innerHTML =
        "<strong style='color: #2c3e50; font-size: 15px;'>✨ Resultats trobats:</strong>";
      title.style.marginBottom = "12px";
      content.appendChild(title);

      matches.forEach((match, index) => {
        const linkWrapper = document.createElement("div");
        linkWrapper.style.marginBottom = "8px";
        linkWrapper.style.opacity = "0";
        linkWrapper.style.transform = "translateX(-10px)";
        linkWrapper.style.animation = `slideIn 0.3s ease forwards ${
          index * 0.1
        }s`;

        const a = document.createElement("a");
        a.href = match.url;
        a.textContent = `${match.name}`;

        Object.assign(a.style, {
          display: "inline-block",
          color: "#3498db",
          textDecoration: "none",
          fontWeight: "500",
          padding: "6px 12px",
          borderRadius: "8px",
          transition: "all 0.2s ease",
          background: "rgba(52, 152, 219, 0.05)",
          border: "1px solid rgba(52, 152, 219, 0.2)",
        });

        const animeTag = document.createElement("span");
        animeTag.textContent = ` ${match.anime}`;
        animeTag.style.color = "#7f8c8d";
        animeTag.style.fontSize = "12px";
        animeTag.style.marginLeft = "6px";

        a.appendChild(animeTag);

        // Efectos hover
        a.addEventListener("mouseenter", () => {
          a.style.background = "rgba(52, 152, 219, 0.15)";
          a.style.borderColor = "#3498db";
          a.style.transform = "translateX(5px)";
          a.style.boxShadow = "0 2px 8px rgba(52, 152, 219, 0.3)";
        });

        a.addEventListener("mouseleave", () => {
          a.style.background = "rgba(52, 152, 219, 0.05)";
          a.style.borderColor = "rgba(52, 152, 219, 0.2)";
          a.style.transform = "translateX(0)";
          a.style.boxShadow = "none";
        });

        linkWrapper.appendChild(a);
        content.appendChild(linkWrapper);
      });
    }

    notif.appendChild(content);

    // Agregar estilos de animación al documento
    if (!document.querySelector("#search-notif-styles")) {
      const style = document.createElement("style");
      style.id = "search-notif-styles";
      style.textContent = `
          @keyframes slideIn {
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeOut {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-10px);
            }
          }
        `;
      document.head.appendChild(style);
    }

    // Posicionar relativamente el contenedor padre
    searchButton.parentElement.style.position = "relative";
    searchButton.parentElement.appendChild(notif);

    // Animación de entrada
    requestAnimationFrame(() => {
      notif.style.opacity = "1";
      notif.style.transform = "translateY(0)";
    });

    // Auto-ocultar después de 6 segundos con animación
    setTimeout(() => {
      notif.style.animation = "fadeOut 0.3s ease forwards";
      setTimeout(() => notif.remove(), 300);
    }, 6000);
  }

  // Evento al hacer clic en el botón de buscar
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();

    const searchText = searchInput.value.toLowerCase().trim();
    if (!searchText) return;

    // Buscar coincidencias en el array de figuras
    const matches = allFigures.filter((figure) =>
      figure.name.toLowerCase().includes(searchText)
    );

    // Si solo hay un resultado, redirigir directamente
    if (matches.length === 1) {
      window.location.href = matches[0].url;
      return;
    }

    // Mostrar notificación con resultados
    showSearchNotification(matches, searchText);
  });

  // Búsqueda con Enter
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchButton.click();
    }
  });
});
