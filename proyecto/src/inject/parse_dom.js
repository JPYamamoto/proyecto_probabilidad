export default class ParseDOM {
  constructor() {}

  parseAllSellers() {
    const container = document.getElementById("aod-offer-list");
    if (!container) {
      return;
    }

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
    const ratingInfo = htmlElement.querySelector("[id=aod-offer-seller-rating]")
      .innerText;
    let numbers = ratingInfo.match(/^\d+|\d+\b|\d+(?=\w)/g);
    if (numbers) {
      numbers = numbers.map((num) => Number.parseFloat(num));

      return {
        id: htmlElement.id,
        num_calificaciones: numbers[0],
        calificacion: numbers[1] / 100,
      };
    }

    return {
      id: htmlElement.id,
      num_calificaciones: 0,
      calificacion: 0,
    };
  }

  parseCurrentSeller() {
    const container = document.querySelector(
      "#reviewsMedley .a-fixed-left-grid-col.a-col-left"
    );
    container.setAttribute("id", "main-seller");
    if (!container) {
      return;
    }

    const num_calificaciones = this.parseTotalRatings(container);
    const ratings = this.parseRatings(container);

    return {
      id: "main-seller",
      num_calificaciones: num_calificaciones,
      ...ratings,
    };
  }

  parseTotalRatings(container) {
    const ratings = container.querySelector("[data-hook='total-review-count']");
    let numbers = ratings.innerText.match(/^\d+|\d+\b|\d+(?=\w)/g);

    return Number.parseFloat(numbers[0]);
  }

  parseRatings(container) {
    const ratingsTable = container.querySelector("table > tbody");
    const allRatings = ratingsTable.querySelectorAll("tr");

    const result = {};
    Array.from(allRatings).forEach((elem) => {
      const text = elem.querySelector("a").title;
      let numbers = text.match(/^\d+|\d+\b|\d+(?=\w)/g);

      result[numbers[1]] = Number.parseFloat(numbers[0]) / 100;

      return result;
    });

    return result;
  }
}
