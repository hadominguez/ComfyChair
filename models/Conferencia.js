class Conferencia {
  constructor(nombre, fecha) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.chairs = [];
    this.comitePrograma = [];
    this.sesiones = [];
  }

  agregarChair(chair) {
    this.chairs.push(chair);
  }

  agregarRevisor(revisor) {
    this.comitePrograma.push(revisor);
  }
}

module.exports = Conferencia;