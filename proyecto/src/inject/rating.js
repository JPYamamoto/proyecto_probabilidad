/**
 * Método que recibe el número de calificaciones que tiene el vendedor
 * asociado a un id, y el porcentaje de calificaciones positivas.
 *
 * A partir del porcentaje de calificaciones positivas podemos saber
 * cuántas del total de calificaciones son positivas (redondeando a
 * enteros). El resto son negativas.
 *
 * A partir de eso utilizamos la Regla de Sucesión de Laplace:
 * resultado = (calificaciones positivas + 1) / (total de calificaciones + 2)
 *
 * Regresamos un objetos con toda la información.
 */
const rate = ({ id, num_calificaciones, calificacion }) => {
  const positivas = Math.round(num_calificaciones * calificacion);
  const resultado = (positivas + 1) / (num_calificaciones + 2);

  return { id, num_calificaciones, calificacion, resultado };
};

/**
 * Entrada:
 * {
 *    "id": integer,
 *    "num_calificaciones": integer (número total de calificaciones),
 *    "1": float (entre 0 y 1, el porcentaje del total que tiene 1 estrella),
 *    "2": float (entre 0 y 1, el porcentaje del total que tiene 2 estrellas),
 *    "3": float (entre 0 y 1, el porcentaje del total que tiene 3 estrellas),
 *    "4": float (entre 0 y 1, el porcentaje del total que tiene 4 estrellas),
 *    "5": float (entre 0 y 1, el porcentaje del total que tiene 5 estrellas),
 * }
 *
 * Nota que la suma de los porcentajes de las estrellas no necesariamente da
 * exactamente 1, Amazon las redondea. Pero no importa, suponemos que el
 * error es mínimo.
 *
 * Salida:
 * {
 *    "id": integer,
 *    "num_calificaciones": integer,
 *    "media": float (tal vez es más fácil sacarlo como la esperanza porque tenemos la
 *                    probabilidad de que salga cada estrella, y cuánto vale cada estrella),
 *    "mediana": float,
 *    "moda": integer
 * }
 */
const indicators = ({ id, num_calificaciones, ...estrellas }) => {
  /**
   * La variable estrellas es solo la parte con la información de cuántas
   * estrellas tiene el vendedor. Ejemplo:
   *
   * estrellas = {
   *   "1": 0.03,
   *   "2": 0.03,
   *   "3": 0.05,
   *   "4": 0.09,
   *   "5": 0.8,
   * }
   *
   * Nota que como las llaves son strings accederías al
   * porcentaje de 1 estrellas con estrellas["1"].
   */
  const positivas = Math.round((estrellas['5'] + estrellas['4']) * num_calificaciones);
  const regla_sucesion = (positivas + 1) / (num_calificaciones + 2);

  let media = 0;
  for (const [star, val] of Object.entries(estrellas)) {
    media += +star * val;
  }

  let mediana = 0;
  for (let i = 0; i < 0.5; i += estrellas[mediana.toString()]) {
    ++mediana;
  }

  const most_common = Math.max(...Object.values(estrellas));
  let moda = Object.entries(estrellas)
    .filter(([_start, val]) => val == most_common)
    .map(([start]) => +start);

  return { id, num_calificaciones, media, mediana, moda, regla_sucesion };
};

export { rate, indicators };
