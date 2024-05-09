document.addEventListener("DOMContentLoaded", async () => {
  // Preloader
  const spinner = document.querySelector(".spinner");
  const container_spinner = document.querySelector(".container-spinner");

  if (spinner) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        spinner.classList.add("spinner");
        container_spinner.classList.add("container-spinner");
      }, 1000);
      setTimeout(() => {
        spinner.remove();
        container_spinner.remove();
      }, 3000);
    });
  }

  const GOOGLE_SHEETS_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRH8tThGGQYqRxK51F5VQjx873q5N4T2K9MQ3T_bCHwg8IB2UIlo_8y3iWh50V6GmKmjC1HMlAeKVCJ/pub?output=csv";
  // Carga los datos desde Google Sheets y se le da formato al archivo .csv
  const fetchData = async () => {
    try {
      const response = await fetch(GOOGLE_SHEETS_URL);
      const csvData = await response.text();
      const formattedData = csvData
        .split("\n")
        .slice(1)
        .map((fila) => {
          const [bloques] = fila.split(",").slice(1);
          return bloques;
        });
      return formattedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  const bloques = await fetchData();

  const tituloTpFetch = async () => {
    const response = await fetch(GOOGLE_SHEETS_URL);
    const csvData = await response.text();
    const formattedData = csvData.split("\n").slice(1);
    const dataNeeded = formattedData[0].split(",")[0];
    return dataNeeded.split(",");
  };

  const titulo = await tituloTpFetch();

  if (titulo) {
    const headerTitle = document.head.querySelector("title");
    headerTitle.replaceChildren("", titulo);
  }

  const integrantes = [
    "Daniela",
    "Marina",
    "Franco",
    "Juan Pablo",
    "Agustín",
    "Elias",
    "Gabriel",
    "Maximiliano",
  ];

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
  $body.style.display = "flex";
  $body.style.flexDirection = "column";
  $body.style.alignItems = "center";
  $body.style.padding = "10px";

  // Se obtiene la url del favicon para cambiar de imagen desde Google Sheets
  const urlFaviconFetch = async () => {
    const response = await fetch(GOOGLE_SHEETS_URL);
    const csvData = response.text();
    const dataReplace = (await csvData).split("\n");
    const dataUse = dataReplace[1].split(",")[2];
    return dataUse;
  };

  const faviconUrl = await urlFaviconFetch();

  if (faviconUrl) {
    const faviconTag = document.querySelector("link[rel='shortcut icon']");
    faviconTag.setAttribute("href", faviconUrl);
  }

  $body.innerHTML = `
    <div id="data-container">
      <h2>${titulo}</h2>
      <img style="display: flex; margin: 10px auto" src=${faviconUrl} width="45px" height="45px" />
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
        <button id="sort">Sortear</button>
        <button id="share">Compartir</button>
      </aside>
    </div>
  `;

  document.getElementById("sort").addEventListener("click", () => {
    window.location.reload();
  });

  if (navigator.share) {
    const sha = document.getElementById("share");
    const dataShare = document.getElementById("data-container");
    const content = dataShare.textContent;
    
    sha.addEventListener("click", () => {
      try {
        navigator.share({
          title: document.title,
          text: `Sorteo de bloques del día ${new Date().getDate}`, content,
          url: window.location.href,
        });
      } catch (error) {
        throw new Error("El navegador no permite compartir.", error);
      }
    });
  }
});
