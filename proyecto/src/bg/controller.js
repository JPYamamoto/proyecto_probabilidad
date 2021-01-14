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
          chrome.tabs.sendMessage(tabs[0].id, {action: "parse_dom_current"},
            (response) => handleParse(tabs[0].id, response)
          );
        break;
        }
    });

    sendResponse();
  }
);

function handleParseMany(tabId, response) {
  if (!response) {
    return;
  }

  response.vendedores.forEach((vendedor) => {
    chrome.tabs.sendMessage(
      tabId,
      {action: "compute_rating_many", vendedor: vendedor},
      (response) => handleRating(response)
    );
  })
}

function handleParse(tabId, response) {
  if (!response) {
    return;
  }

  chrome.tabs.sendMessage(
    tabId,
    {action: "compute_rating_current", vendedor: response.vendedor},
    (response) => handleRating(response)
  );
}

function handleRating(response) {
  console.log(response.vendedor);
}
