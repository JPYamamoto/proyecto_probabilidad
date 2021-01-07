export default class Rating {
  constructor() {  }

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
   * Regresamos un objetos JSON con toda la información sobre el vendedor.
   */
  rate({id, num_calificaciones, calificacion}) {
    // Aquí va tu código.

    // El resultado de este método debe quedar en la variable resultado pues esa
    // es la que se regresa, el 0.5 es solo un valor arbitario para que compile.
    const resultado = 0.5;

    return {id, num_calificaciones, calificacion, resultado};
  }
}
