// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(source, _, sendResponse) {

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      switch (source.name) {
        case "sellers":
          chrome.tabs.sendMessage(tabs[0].id, {action: "parse_dom_sellers"},
            (response) => handleParseMany(tabs[0].id, response)
          );
          break;
        case "currSeller":
          chrome.tabs.sendMessage(tabs[0].id, {action: "parse_dom_single"},
            (response) => handleParse(tabs[0].id, response)
          );
        break;
        }
    });

    sendResponse();
  }
);

function handleParseMany(tabId, response) {
  response.vendedores.forEach((vendedor) => {
    chrome.tabs.sendMessage(
      tabId,
      {action: "compute_rating", vendedor: vendedor},
      (response) => handleRating(response)
    );
  })
}

function handleParse(tabId, response) {
  console.log("hola");
}

function handleRating(response) {
  console.log(response.vendedor);
}
