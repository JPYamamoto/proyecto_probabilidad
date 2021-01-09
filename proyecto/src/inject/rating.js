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
    const positivas = Math.round(num_calificaciones*(calificacion/100)); 

    const resultado = (positivas+1)/(num_calificaciones + 2);

    return {id, num_calificaciones, calificacion, resultado};
  }
}
