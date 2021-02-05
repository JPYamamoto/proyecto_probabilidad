/**
 * # Rating
 * Funciones relacionadas al cálculo de los indicadores para los vendedores.
 */

/**
 * rate Calcula los indicadores para varios vendedores.
 * @param {[Object]} args Objetos con la información de los vendedores.
 * @returns {[Object]}    Objetos con los indicadores de los vendedores.
 */
const rate = (args) => {
  return args.map(rateOne);
};

/**
 * rateOne Calcula la probabilidad de tener una experiencia positiva con un
 *         vendedor cuya información recibimos. Usamos la Regla de Sucesión de
 *         Laplace.
 * @param {Object} _ Objeto que nos indica el número de calificaciones que
 *                   tiene un vendedor, y su calificación promedio.
 * @return {Object}  Regresamos el resultado de calcular la regla de sucesión.
 */
const rateOne = ({ id, num_calificaciones, calificacion }) => {
  const positivas = Math.round(num_calificaciones * calificacion);
  const resultado = (positivas + 1) / (num_calificaciones + 2);

  return { id, num_calificaciones, calificacion, resultado };
}

/**
 * indicators Calcula los indicadores que se muestran al cliente.
 * @param {Object} _ Información sobre un vendedor: el número de calificaciones
 *                   que tiene, y la función de probabilidad para cada estrella.
 * @return {Object}  Indicadores sobre el vendedor: regla de sucesión, media,
 *                   moda, mediana.
 */
const indicators = ({ id, num_calificaciones, ...estrellas }) => {
  /**
   * La variable estrellas es la información de cuántas estrellas tiene el
   * vendedor, a manera de función de probabilidad.
   *
   * Ejemplo:
   *
   * estrellas = {
   *   "1": 0.03,
   *   "2": 0.03,
   *   "3": 0.05,
   *   "4": 0.09,
   *   "5": 0.8,
   * }
   */
  const positivas = Math.round((estrellas['5'] + estrellas['4']) * num_calificaciones);
  const regla_sucesion = (positivas + 1) / (num_calificaciones + 2);

  // Media
  let media = 0;
  for (const [star, val] of Object.entries(estrellas)) {
    media += +star * val;
  }

  // Mediana
  let mediana = 0;
  for (let i = 0; i < 0.5; i += estrellas[mediana.toString()]) {
    ++mediana;
  }

  // Moda
  const most_common = Math.max(...Object.values(estrellas));
  let moda = Object.entries(estrellas)
    .filter(([_start, val]) => val == most_common)
    .map(([start]) => +start);

  return { id, num_calificaciones, media, mediana, moda, regla_sucesion };
};

export { rate, indicators };
