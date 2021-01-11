chrome.runtime.getBackgroundPage(function(backgroundPage) {
  console = backgroundPage.console;
});

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("click-single").addEventListener("click", function () {
    chrome.runtime.sendMessage({name: "currSeller"}, function (response) {
      console.log(response);
    });
  });

  document.getElementById("click-sellers").addEventListener("click", function () {
    chrome.runtime.sendMessage({name: "sellers"}, function (response) {
      console.log(response);
    });
  });
});
