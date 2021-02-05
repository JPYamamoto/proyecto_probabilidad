/**
 * # Parse DOM
 *
 * Funciones relacionadas al análisis y extracción de la información.
 */

/**
 * retrieveOffers Rescata las ofertas de vendedores.
 * @param {Element} container Elemento del DOM que contiene ofertas de los vendedores.
 * @return {[Element]}        Elementos con las distintas ofertas.
 */
const retrieveOffers = (container) => {
  const offers = container.querySelectorAll("[id=aod-offer]");
  return [...offers];
};

/**
 * generateIds Genera IDs para poder identificar a cada vendedor.
 * @param {[Element]} htmlElems Elementos del DOM con los distintos vendedores.
 */
const generateIds = (htmlElems) => {
  htmlElems.forEach((elem, i) => {
    elem.setAttribute("id", `offer-${i}`);
    elem.classList.add("offer-extension");
    const h1 = document.createElement("h1");
    const content = document.createTextNode(`Oferta ${i}`);
    h1.append(content);
    elem.prepend(h1);
  });
};

/**
 * parseOffers Extrae la información de múltiples vendedores.
 * @param {[Element]} htmlElems Elementos del DOM con los distintos vendedores.
 * @return {[Object]}           Objetos que contienen la información de los vendedores.
 */
const parseOffers = (htmlElems) => {
  return htmlElems.map((elem) => parseSingleOffer(elem));
};

/**
 * parseSingleOffer Obtiene la información de un solo vendedor.
 * @param {Element} htmlElement Elemento del DOM con la información del vendedor.
 * @return {Object}             Objeto con la información del vendedor.
 */
const parseSingleOffer = (htmlElement) => {
  const ratingInfo = htmlElement.querySelector("[id=aod-offer-seller-rating]")
    .innerText;
  let numbers = ratingInfo.match(/^\d+|\d+\b|\d+(?=\w)/g);
  if (numbers) {
    numbers = numbers.map((num) => Number.parseFloat(num));

    return {
      id: htmlElement.id,
      num_calificaciones: numbers[0],
      calificacion: numbers[1] / 100,
    };
  }

  return {
    id: htmlElement.id,
    num_calificaciones: 0,
    calificacion: 0,
  };
};

/**
 * parseTotalRatings Extrae el número de reviews de un vendedor.
 * @param {Element} container El contenedor con la información de las
 *                            calificaciones.
 * @returns {Number}          El número de reviews.
 */
const parseTotalRatings = (container) => {
  const ratings = container.querySelector("[data-hook='total-review-count']");
  const text = ratings.innerText.replace(/,/g, '');
  let numbers = text.match(/^\d+|\d+\b|\d+(?=\w)/g);

  return Number.parseFloat(numbers[0]);
};

/**
 * parseRatings Extrae la información de las calificaciones de un vendedor.
 * @param {Element} container El contenedor con la información de las
 *                            calificaciones.
 * @returns {Object}          Un objeto que simula una función de probabilidad.
 */
const parseRatings = (container) => {
  const ratingsTable = container.querySelector("table > tbody");
  const allRatings = ratingsTable.querySelectorAll("tr");

  const result = {};
  Array.from(allRatings).forEach((elem, i) => {
    const text = elem.querySelector("a")?.title || "0";
    let numbers = text.match(/^\d+|\d+\b|\d+(?=\w)/g);
    const index = numbers[1] || (5 - i).toString();

    result[index] = Number.parseFloat(numbers[0]) / 100;

    return result;
  });

  return result;
};

/**
 * parseCurrentSeller Extrae la información del vendedor en la página actual.
 * @returns {Object} Un objeto con la información del vendedor.
 */
const parseCurrentSeller = () => {
  const container = document.querySelector(
    "#reviewsMedley .a-fixed-left-grid-col.a-col-left"
  );
  container.setAttribute("id", "main-seller");
  if (!container) {
    return;
  }

  const num_calificaciones = parseTotalRatings(container);
  const ratings = parseRatings(container);

  return {
    id: "main-seller",
    num_calificaciones: num_calificaciones,
    ...ratings,
  };
};

/**
 * parseAllSellers    Extrae la información de múltiples vendedores del mismo
 *                    producto.
 * @return {[Object]} Objetos que contienen la información de los vendedores.
 */
const parseAllSellers = () => {
  const container = document.getElementById("aod-offer-list");
  if (!container) {
    return;
  }

  const htmlElems = retrieveOffers(container);
  generateIds(htmlElems);
  return parseOffers(htmlElems);
};

export { parseCurrentSeller, parseAllSellers };
