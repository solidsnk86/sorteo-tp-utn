const calculadoraMateriales = {
  bloque1: "Bloque 1: Menú Principal",
  bloque2: "Bloque 2: Calcular Superficie y Volumen",
  bloque3: "Bloque 3: Calcular Muro",
  bloque4: "Bloque 4: Calcular Viga",
  bloque5: "Bloque 5: Calcular Columna",
  bloque6: "Bloque 6: Calcular Contrapisos",
  bloque7: "Bloque 7: Calcular Techo",
  bloque8: "Bloque 8: Calcular Pisos, Pintura e Iluminación",
};

const integrantes = [
  "JuanPa",
  "Mari",
  "Dani",
  "Fran",
  "Gaby",
  "Maxi",
  "Agus",
  "Elias",
];

// Función para mezclar una lista de manera aleatoria (algoritmo Fisher-Yates)
// Fuente: https://es.wikipedia.org/wiki/Algoritmo_de_Fisher-Yates

const mezclar = (lista) => {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]]; // Intercambia elementos
  }
  return lista;
};

const integrantesMezclados = mezclar([...integrantes]);

const asignaciones = {};
Object.keys(calculadoraMateriales).forEach((bloque, index) => {
  asignaciones[calculadoraMateriales[bloque]] = integrantesMezclados[index];
});

console.log("Asignaciones de bloques:");
console.log(asignaciones);

const $body = document.body;

$body.style.background = "#21252B";
$body.style.color = "#fff";
$body.style.fontFamily = "system-ui";
$body.style.justifyContent = "center";
$body.style.margin = "10vh auto";
$body.style.display = "flex";
$body.style.padding = "10px";

$body.innerHTML = `
  <div>
    <h2>Asignaciones de bloques TP PSeInt</h2>
    <table border="1" cellspacing="0" cellpadding="10">
      <thead>
        <tr>
          <th>Bloque</th>
          <th>Responsable</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(asignaciones)
          .map(
            ([bloque, integrante]) => `
            <tr>
              <td class="bloque">${bloque}</td>
              <td class="integrante">${integrante}</td>
            </tr>`
          )
          .join("")}
      </tbody>
    </table>
    <aside>
    <button onclick="sortButton()">Sortear</button>
    <button onclick="compartir()">Compartir</button>
    </aside>
  </div>
`;

const sortButton = () => {
  window.location.reload();
};

const compartir = () => {
  if (navigator.share) {
    try {
      navigator.share({
        title: document.title,
        text: "Programa para sortear TP 🙄",
        url: window.location.href,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};
