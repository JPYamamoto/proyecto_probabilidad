/**
 * # Controller
 *
 * Este archivo funciona como el controlador. Desde aquí enviamos mensajes
 * entre los componentes que funcionan en el background (como modelo) y el
 * front-end (como la vista).
 *
 */
chrome.extension.onMessage.addListener((message, _sender, sendResponse) => {
  const wrapResponse = (response) => sendResponse({ response });
  const options = { currentWindow: true, active: true };

  chrome.tabs.query(options, ([{ id: tabID }]) => {
    const options = {
      extension_trigger_single: () => {
        // Calcula la información de un solo vendedor.
        const andThenCompute = ({ raw_data }) => {
          const message = { action: "compute_rating_current", raw_data };
          chrome.tabs.sendMessage(tabID, message, wrapResponse);
        };

        // Rescata la información de un vendedor, desde el DOM.
        const message = { action: "parse_dom_current" };
        chrome.tabs.sendMessage(tabID, message, andThenCompute);
      },

      extension_trigger_multiple: () => {
        // Calcula la información de múltiples vendedores.
        const andThenCompute = ({ raw_data }) => {
          raw_data.forEach((vendedor) => {
            const message = { action: "compute_rating_many", raw_data };
            chrome.tabs.sendMessage(tabID, message, wrapResponse);
          });
        };

        // Rescata la información de varios vendedores, desde el DOM.
        const message = { action: "parse_dom_sellers" };
        chrome.tabs.sendMessage(tabID, message, andThenCompute);
      },
    };

    options[message]();
  });

  return true;
});
