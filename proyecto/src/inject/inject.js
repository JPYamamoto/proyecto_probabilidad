(async () => {
  const srcParseDom = chrome.extension.getURL('src/inject/parse_dom.js');
  const srcRating = chrome.extension.getURL('src/inject/rating.js');

  const importParseDom = await import(srcParseDom);
  const importRating = await import(srcRating);

  const ParseDOM = new importParseDom.default();
  const Rating = new importRating.default();

  chrome.runtime.onMessage.addListener(
    function(request, _, sendResponse) {
      switch (request.action) {
        case "parse_dom_sellers":
          const sellers = ParseDOM.parseAllSellers();
          if (sellers) {
            sendResponse({vendedores: sellers});
          }
          sendResponse();
          break;
        case "parse_dom_current":
          const seller = ParseDOM.parseCurrentSeller();
          if (seller) {
            sendResponse({vendedor: seller});
          }
          sendResponse();
          break;
        case "compute_rating_many":
          sendResponse({vendedor: Rating.rate(request.vendedor)});
          break;
        case "compute_rating_current":
          sendResponse({vendedor: Rating.succession_rule(request.vendedor)});
          break;
      }
    }
  );
})();

