const Sesion = require('./Sesion');
const ArticuloRegular = require('./ArticuloRegular');

class SesionRegular extends Sesion {
  validarArticulo(articulo) {
    if (!(articulo instanceof ArticuloRegular)) {
      throw new Error("El artículo no es un ArticuloRegular válido.");
    }
    return articulo.validarFormato();
  }
}

module.exports = SesionRegular;