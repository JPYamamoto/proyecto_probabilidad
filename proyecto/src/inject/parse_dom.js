const retrieveOffers = (container) => {
  const offers = container.querySelectorAll("[id=aod-offer]");
  return [...offers];
};

const generateIds = (htmlElems) => {
  htmlElems.forEach((elem, i) => {
    elem.setAttribute("id", `offer-${i}`);
    elem.classList.add("offer-extension");
    const h1 = document.createElement("h1");
    const content = document.createTextNode(`Oferta ${i}`);
    h1.append(content);
    elem.prepend(h1);
  });
};

const parseOffers = (htmlElems) => {
  return htmlElems.map((elem) => parseSingleOffer(elem));
};

const parseSingleOffer = (htmlElement) => {
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
};

const parseTotalRatings = (container) => {
  const ratings = container.querySelector("[data-hook='total-review-count']");
  const text = ratings.innerText.replace(/,/g, '');
  let numbers = text.match(/^\d+|\d+\b|\d+(?=\w)/g);

  return Number.parseFloat(numbers[0]);
};

const parseRatings = (container) => {
  const ratingsTable = container.querySelector("table > tbody");
  const allRatings = ratingsTable.querySelectorAll("tr");

  const result = {};
  Array.from(allRatings).forEach((elem, i) => {
    const text = elem.querySelector("a")?.title || "0";
    let numbers = text.match(/^\d+|\d+\b|\d+(?=\w)/g);
    const index = numbers[1] || (5 - i).toString();

    result[index] = Number.parseFloat(numbers[0]) / 100;

    return result;
  });

  return result;
};

const parseCurrentSeller = () => {
  const container = document.querySelector(
    "#reviewsMedley .a-fixed-left-grid-col.a-col-left"
  );
  container.setAttribute("id", "main-seller");
  if (!container) {
    return;
  }

  const num_calificaciones = parseTotalRatings(container);
  const ratings = parseRatings(container);

  return {
    id: "main-seller",
    num_calificaciones: num_calificaciones,
    ...ratings,
  };
};

const parseAllSellers = () => {
  const container = document.getElementById("aod-offer-list");
  if (!container) {
    return;
  }

  const htmlElems = retrieveOffers(container);
  generateIds(htmlElems);
  return parseOffers(htmlElems);
};

export { parseCurrentSeller, parseAllSellers };
