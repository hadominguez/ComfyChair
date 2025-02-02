const EstrategiaSeleccion = require('./EstrategiaSeleccion.js');
class CorteFijo extends EstrategiaSeleccion {
    constructor(porcentajeAceptacion) {
      super();
      this.porcentajeAceptacion = porcentajeAceptacion;
    }
  
    seleccionarArticulos(articulos) {
      articulos.sort((a, b) => b.puntuacionMedia - a.puntuacionMedia);
      let num = Math.ceil(articulos.length * this.porcentajeAceptacion);
      return articulos.slice(0, num);
    }
}
module.exports = CorteFijo;