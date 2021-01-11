export default class ParseDOM {
  constructor() {  }

  parseAllSellers() {
    const container = document.getElementById("aod-offer-list");
    const htmlElems = this.retrieveOffers(container);
    this.generateIds(htmlElems);
    return this.parseOffers(htmlElems);
  }

  retrieveOffers(container) {
    const offers = container.querySelectorAll("[id=aod-offer]");
    return [...offers];
  }

  generateIds(htmlElems) {
    htmlElems.forEach((elem, i) => {
      elem.setAttribute("id", `offer-${i}`);
      elem.classList.add("offer-extension");
    });
  }

  parseOffers(htmlElems) {
    return htmlElems.map((elem) => this.parseSingleOffer(elem));
  }

  parseSingleOffer(htmlElement) {
    const ratingInfo = htmlElement.querySelector("[id=aod-offer-seller-rating]").innerText;
    let numbers = ratingInfo.match(/^\d+|\d+\b|\d+(?=\w)/g);
    if (numbers) {
      numbers = numbers.map((num) => Number.parseFloat(num));

      return {
        id: htmlElement.id,
        num_calificaciones: numbers[0],
        calificacion: (numbers[1] / 100)
      };
    }

    return {
      id: htmlElement.id,
      num_calificaciones: 0,
      calificacion: 0
    };
  }
}
