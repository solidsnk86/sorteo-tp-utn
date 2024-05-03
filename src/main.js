document.addEventListener("DOMContentLoaded", async () => {
  // Carga los datos desde Google Sheets
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vRH8tThGGQYqRxK51F5VQjx873q5N4T2K9MQ3T_bCHwg8IB2UIlo_8y3iWh50V6GmKmjC1HMlAeKVCJ/pub?output=csv"
      );
      const csvData = await response.text();
      const formattedData = csvData
        .split("\n")
        .slice(1)
        .map((fila) => {
          const [bloques] = fila.split(",");
          return bloques.trim();
        });
      return formattedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const bloques = await fetchData();

  const integrantes = ["😁", "🤣", "😴", "😯", "😫", "😆", "😛", "🤔"];

  // Algoritmo Fisher-Yates para mezclar la lista
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
  bloques.forEach((bloque, index) => {
    asignaciones[bloque] =
      integrantesMezclados[index % integrantesMezclados.length];
  });

  const $body = document.body;

  $body.style.color = "#fff";
  $body.style.fontFamily = "system-ui";
  $body.style.justifyContent = "center";
  $body.style.margin = "5vh auto";
  $body.style.display = "flex";
  $body.style.flexDirection = "column";
  $body.style.alignItems = "center";
  $body.style.padding = "10px";

  const favicon = document.querySelector("link[rel='shortcut icon']");
  const urlAttribute = favicon.getAttribute("href");

  $body.innerHTML = `
    <div>
      <h2>Asignaciones de bloques TP PSeInt</h2>
      <img style="display: flex; margin: 10px auto" src=${urlAttribute} width="45px" height="45px" />
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
});

const sortButton = () => {
  window.location.reload();
};

const compartir = () => {
  if (navigator.share) {
    try {
      navigator.share({
        title: document.title,
        text: "Asignación de bloques TP PSeInt 🙄",
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error al compartir:", error);
    }
  }
};
