chrome.runtime.getBackgroundPage((page) => (console = page.console));

chrome.runtime.send = chrome.runtime.sendMessage;
document.get = document.getElementById;
const [single, multiple] = [
  "extension_trigger_single",
  "extension_trigger_multiple",
];

document.get("click-single-seller").onclick = () =>
  chrome.runtime.send(single, printSingle);
document.get("click-multiple-sellers").onclick = () =>
  chrome.runtime.send(multiple, console.log);

const printSingle = ({ response }) => {
  document.get("single-seller").innerHTML = `
  <div class="result">
    <p><b>Media: </b> ${response.media}</p>
    <p><b>Mediana: </b> ${response.mediana}</p>
    <p><b>Moda: </b> ${response.moda}</p>
    <p><b>Numero de calificaciones: </b> ${response.num_calificaciones}</p>
  </div>`;
};
