const Sesion = require('./Sesion');
const Articulo = require('./Articulo');

class SesionWorkshop extends Sesion {
  validarArticulo(articulo) {
    if (!(articulo instanceof Articulo)) {
      throw new Error("El artículo no es un Articulo válido.");
    }
    return articulo.validarFormato();
  }
}

module.exports = SesionWorkshop;