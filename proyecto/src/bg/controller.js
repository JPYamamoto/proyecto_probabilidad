// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(_, _, sendResponse) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      chrome.tabs.sendMessage(
        tabs[0].id,
        {action: "parse_dom"},
        (response) => handleParse(tabs[0].id, response)
      );
    });

    sendResponse();
  }
);

function handleParse(tabId, response) {
  response.vendedores.forEach((vendedor) => {
    chrome.tabs.sendMessage(
      tabId,
      {action: "compute_rating", vendedor: vendedor},
      (response) => handleRating(response)
    );
  })
}

function handleRating(response) {
  console.log(response.vendedor);
}
