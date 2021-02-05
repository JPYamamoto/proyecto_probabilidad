/**
 * # Popup
 * Script que maneja el despliegue de la información en la ventana de la extensión.
 */

// Usa la consola de la página.
chrome.runtime.getBackgroundPage((page) => (console = page.console));

// Envía mensajes al controlador.
chrome.runtime.send = chrome.runtime.sendMessage;
document.get = document.getElementById;
const [single, multiple] = ["extension_trigger_single", "extension_trigger_multiple"];

document.get("click-single-seller").onclick = () => chrome.runtime.send(single, printSingle);
document.get("click-multiple-sellers").onclick = () => chrome.runtime.send(multiple, printAll);

/**
 * floatToPercent Escribe el porcentaje correspondiente a un número de tipo
 *                punto flotante.
 * @param {Number} number Número de punto flotante.
 * @return {Number}       Número como porcentaje.
 */
const floatToPercent = (number) => (number * 100).toFixed(3)

// Muestra la información de un solo vendedor.
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

// Muestra la información de varios vendedores.
const printAll = ({ response }) => {
  const numFromId = (id) => Number.parseInt(id.replace("offer-", ""));
  document.get("all-sellers").innerHTML = `
  <div class="result">
    ${response.map(({ id, resultado }) => (
        `<p><b>Oferta ${numFromId(id)}: ${floatToPercent(resultado)}% positiva</b></p>`
      )).join("")}
  </div>`;
};
