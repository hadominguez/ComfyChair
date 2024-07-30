const Sesion = require('./Sesion');
const ArticuloRegular = require('./ArticuloRegular');

class SesionRegular extends Sesion {
  validarFormato(articulo) {
    return articulo instanceof ArticuloRegular && articulo.validarFormato();
  }
}

module.exports = SesionRegular;