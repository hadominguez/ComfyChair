const Bid = require('./Bid');
const Recepcion = require('./Recepcion');
const Bidding = require('./Bidding');
const Revisiones = require('./Revisiones');
const Seleccion = require('./Seleccion');

class Sesion {
  constructor(topic, deadline) {
    if (new.target === Sesion) {
      throw new TypeError('No se puede instanciar la clase abstracta Sesion directamente.');
    }
    this.topic = topic;
    this.deadline = new Date(deadline);
    this.articulos = [];
    this.bids = [];
    this.estado = new Recepcion(this);
    this.criterioSeleccion = 'corteFijo'; // Puede ser 'corteFijo' o 'mejores'
    this.porcentajeAceptacion = 0.3; // Ejemplo, acepta el 30% de los artículos
    this.puntajeMinimoAceptacion = 1; // Ejemplo, acepta artículos con puntaje mayor a 1
    this.articulosAceptados = [];
  }

  avanzarEstado() {
    this.estado.avanzarEstado();
  }

  seleccionarArticulos() {
    if (!(this.estado instanceof Seleccion)) {
      throw new Error('No se puede seleccionar artículos cuando no se está en el estado de selección');
    }

    for (let i = 0; i < this.articulos.length; i++) {
      let articulo = this.articulos[i];
      let sum = 0;
      for (let j = 0; j < articulo.revisiones.length; j++) {
        sum += articulo.revisiones[j].calificacion;
      }
      articulo.puntuacionMedia = sum / articulo.revisiones.length;
    }

    this.articulos.sort(function(a, b) {
      return b.puntuacionMedia - a.puntuacionMedia;
    });

    if (this.criterioSeleccion === 'corteFijo') {
      let numeroArticulosAceptar = Math.ceil(this.articulos.length * this.porcentajeAceptacion);
      this.articulosAceptados = this.articulos.slice(0, numeroArticulosAceptar);
    } else if (this.criterioSeleccion === 'mejores') {
      for (let i = 0; i < this.articulos.length; i++) {
        if (this.articulos[i].puntuacionMedia > this.puntajeMinimoAceptacion) {
          this.articulosAceptados.push(this.articulos[i]);
        }
      }
    } else {
      throw new Error('Criterio de selección no válido');
    }

    for (let i = 0; i < this.articulos.length; i++) {
      let articulo = this.articulos[i];
      articulo.aceptado = this.articulosAceptados.includes(articulo);
    }
  }

  agregarArticulo(articulo) {
    if (!(this.estado instanceof Recepcion)) {
      throw new Error('No se puede agregar artículos a una sesión que no está en recepción');
    }

    const ahora = new Date();
    if (ahora > this.deadline) {
      throw new Error('No se puede agregar artículos después de la fecha límite');
    }

    if (this.validarFormato(articulo)) {
      this.articulos.push(articulo);
    } else {
      throw new Error('Formato de artículo inválido.');
    }
  }

  validarFormato(articulo) {
    throw new Error("Este método debe ser implementado por las subclases.");
  }

  setEstado(estado) {
    this.estado = estado;
  }

  avanzarEstado() {
    this.estado.avanzarEstado();
  }

  iniciarBidding() {
    if (!(this.estado instanceof Recepcion)) {
      throw new Error('No se puede iniciar el bidding en el estado actual.');
    }
    this.avanzarEstado();
  }

  recibirBid(revisor, articulo, estado) {
    if (!(this.estado instanceof Bidding)) {
      throw new Error('No se pueden recibir bids fuera del estado de bidding.');
    }
    const bid = new Bid(revisor, articulo, estado);
    this.bids.push(bid);
  }

  finalizarBidding(comitePrograma) {
    if (!(this.estado instanceof Bidding)) {
      throw new Error('No se puede finalizar el bidding en el estado actual.');
    }
    this.avanzarEstado();
    this.asignarArticulos(comitePrograma);
  }

  asignarArticulos(comitePrograma) {
    this.articulos.forEach((articulo) => {

      let bids = this.bids.filter(bid => bid.articulo === articulo).sort((a, b) => {
        const estadoOrden = { 'interesado': 1, 'quizas': 2, 'sin_interes': 3, 'no_interesado': 4 };
        return estadoOrden[a.estado] - estadoOrden[b.estado];
      });

      for (let bid of bids) {
        if (articulo.revisores.length < 3) {
          if (!this.revisorTieneLimite(bid.revisor, comitePrograma)) {
            bid.revisor.revisionesAsignadas++;
            articulo.revisores.push(bid.revisor);
          }
        } else {
          break;
        }
      }

      while (articulo.revisores.length < 3) {
        let revisor = this.seleccionarRevisorAleatorio(comitePrograma);
        revisor.revisionesAsignadas++;
        articulo.revisores.push(revisor);
      }
    });
  }

  revisorTieneLimite(revisor, comitePrograma) {
    return revisor.revisionesAsignadas >= this.calcularRevisionesMaximas(comitePrograma);
  }

  calcularRevisionesMaximas(comitePrograma) {
    let totalArticulos = this.articulos.length;
    return Math.ceil((totalArticulos * 3) / comitePrograma.length);
  }

  seleccionarRevisorAleatorio(revisoresAsignados) {
    return revisoresAsignados[Math.floor(Math.random() * revisoresAsignados.length)];
  }

  finalizarRevision() {
    if (!(this.estado instanceof Revisiones)) {
      throw new Error('No se puede finalizar la revisión en el estado actual.');
    }
    this.avanzarEstado();
    this.seleccionarArticulos();
  }
}

module.exports = Sesion;