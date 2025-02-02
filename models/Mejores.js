const EstrategiaSeleccion = require('./EstrategiaSeleccion.js');
class Mejores extends EstrategiaSeleccion {
    constructor(puntajeMinimoAceptacion) {
      super();
      this.puntajeMinimoAceptacion = puntajeMinimoAceptacion;
    }
  
    seleccionarArticulos(articulos) {
        let articulosAceptados = [];
        for (let articulo of articulos) {
            if (articulo.puntuacionMedia > this.puntajeMinimoAceptacion) {
                articulosAceptados.push(articulo);
            }
        }
        return articulosAceptados;
    }
}
module.exports = Mejores;