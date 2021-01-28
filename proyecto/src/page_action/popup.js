chrome.runtime.getBackgroundPage((page) => (console = page.console));

chrome.runtime.send = chrome.runtime.sendMessage;
document.get = document.getElementById;
const [single, multiple] = ["extension_trigger_single", "extension_trigger_multiple"];

document.get("click-single-seller").onclick = () => chrome.runtime.send(single, console.log);
document.get("click-multiple-sellers").onclick = () => chrome.runtime.send(multiple, console.log);
