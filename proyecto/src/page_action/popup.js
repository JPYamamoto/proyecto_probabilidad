chrome.runtime.getBackgroundPage((page) => (console = page.console));

chrome.runtime.send = chrome.runtime.sendMessage;
document.get = document.getElementById;
const [single, multiple] = ["extension_trigger_single", "extension_trigger_multiple"];

document.get("click-single-seller").onclick = () => chrome.runtime.send(single, printSingle);
document.get("click-multiple-sellers").onclick = () => chrome.runtime.send(multiple, printAll);

const floatToPercent = (number) => {
  return (number * 100).toFixed(3);
}

const printSingle = ({ response }) => {
  const porcentaje = floatToPercent(response.regla_sucesion);
  document.get("single-seller").innerHTML = `
  <div class="result">
    <p><b>Experiencia positiva: </b> ${porcentaje}%</p>
    <p><b>Media: </b> ${response.media}</p>
    <p><b>Mediana: </b> ${response.mediana}</p>
    <p><b>Moda: </b> ${response.moda}</p>
    <p><b>Numero de calificaciones: </b> ${response.num_calificaciones}</p>
  </div>`;
};

const printAll = ({ response }) => {
  console.log(response);
  const numFromId = (id) => Number.parseInt(id.replace("offer-", ""));
  document.get("all-sellers").innerHTML = `
  <div class="result">
		${response.map(({ id, resultado }) => (
				`<p><b>Oferta ${numFromId(id)}: ${floatToPercent(resultado)}% positiva</b></p>`
			)).join("")}
  </div>`;
};
