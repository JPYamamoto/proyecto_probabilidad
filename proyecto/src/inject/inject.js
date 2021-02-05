/**
 * # Inject Parsers.
 *
 * La función se encarga de recibir los mensajes para el análisis del DOM y
 * llamar a las funciones correspondientes.
 *
 * Al obtener el resultado, manda a llamar a las funciones para calcular los
 * indicadores.
 */
const setUpParsers = async () => {
  // Import parser and rating.
  const srcParseDom = chrome.extension.getURL("src/inject/parse_dom.js");
  const srcRating = chrome.extension.getURL("src/inject/rating.js");

  const { parseCurrentSeller, parseAllSellers } = await import(srcParseDom);
  const { rate, indicators } = await import(srcRating);

  // Recibe y procesa mensajes.
  chrome.runtime.onMessage.addListener((request, _source, sendResponse) => {
    const { action, raw_data } = request;
    const options = {
      parse_dom_current: () => sendResponse({ raw_data: parseCurrentSeller() }),
      parse_dom_sellers: () => sendResponse({ raw_data: parseAllSellers() }),

      compute_rating_current: () => sendResponse(indicators(raw_data)),
      compute_rating_many: () => sendResponse(rate(raw_data)),
    };

    options[action]?.();
  });

  return true;
};

setUpParsers();
