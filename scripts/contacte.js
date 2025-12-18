//SCRIPT FET AMB IA
const motiu = document.getElementById("motiu");
const consultaBox = document.getElementById("consulta-box");
const compraBox = document.getElementById("compra-box");
const producteSelect = document.getElementById("producte");

function actualitzarVista() {
  consultaBox.style.display = "none";
  compraBox.style.display = "none";

  if (motiu.value === "consulta") {
    consultaBox.style.display = "block";
  } else if (motiu.value === "compra") {
    compraBox.style.display = "block";
  }
}

motiu.addEventListener("change", actualitzarVista);

// --- Cargar producto desde la URL ---
const params = new URLSearchParams(window.location.search);
const producteURL = params.get("producte");

if (producteURL) {
  motiu.value = "compra";
  actualitzarVista();
  producteSelect.value = producteURL;
}
