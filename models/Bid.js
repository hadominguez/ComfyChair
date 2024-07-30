class Bid {
  constructor(revisor, articulo, estado = 'no interesado') {
    this.revisor = revisor;
    this.articulo = articulo;
    this.estado = estado; // 'interesado', 'quizas', 'no interesado'
  }

  cambiarEstado(nuevoEstado) {
    const estadosValidos = ['interesado', 'quizas', 'no interesado'];
    if (estadosValidos.includes(nuevoEstado)) {
      this.estado = nuevoEstado;
    } else {
      throw new Error('Estado no válido');
    }
  }
}

module.exports = Bid;
