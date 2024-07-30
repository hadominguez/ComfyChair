const Sesion = require('./Sesion');
const Articulo = require('./Articulo');

class SesionWorkshop extends Sesion {
  validarFormato(articulo) {
    return articulo instanceof Articulo && articulo.validarFormato();
  }
}

module.exports = SesionWorkshop;