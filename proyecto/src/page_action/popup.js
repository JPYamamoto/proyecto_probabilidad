chrome.runtime.getBackgroundPage(function(backgroundPage) {
  console = backgroundPage.console;
});

function popup() {
  //chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  //  chrome.tabs.sendMessage(tabs[0].id, {"message": "start"});
  //});
  chrome.runtime.sendMessage({name: "start"}, function (response) {
      console.log(response);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("clickme").addEventListener("click", popup);
});
