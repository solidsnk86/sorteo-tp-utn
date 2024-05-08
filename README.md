# Sorteos de TP UTN

Pequeño programa básico para sortear bloques de un programa entre los integrantes del grupo de estudio e ir editando el contenido desde Google Sheets haciendo un fetch de un archivo `.csv` para luego dar formato al texto recibido y mostrarlo en el `HTML`.

### Herramientas empleadas:

- HTML
- Javascript
- CSS

# Algoritmo empleado para mezclar los nombres (Fisher-Yates)

El algoritmo de `Fisher-Yates` (o alguna variante del mismo) es el que se usa típicamente para barajar en los juegos de azar.

También es el algoritmo que permite recorrer toda una selección (por ejemplo una lista musical), de forma aleatoria una sola vez (una reproducción por cada elemento en la lista). Ver más detalles en la sección más abajo.

El algoritmo `Fisher-Yates` es un algoritmo de permutaciones que técnicamente encaja en la categoría de los algoritmos de ordenamiento, aunque en este caso, el fin perseguido es el opuesto, desordenar los ítems que contiene. Y por tanto debería constar en las bibliotecas de ordenamiento como Random Sort al menos.

**Más información en Wikipedia:**

```javascript
const barajar = (carta) => {
  for (let i = carta.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [carta[i], carta[j]] = [carta[j], carta[i]]; // Intercambia cartas
  }
  return carta;
};
```

Fuente: <a href="https://es.wikipedia.org/wiki/Algoritmo_de_Fisher-Yates">Algoritmo de Fisher Yates</a>
