const Sesion = require('./Sesion');
const ArticuloPoster = require('./ArticuloPoster');

class SesionPoster extends Sesion {
  validarFormato(articulo) {
    return articulo instanceof ArticuloPoster && articulo.validarFormato();
  }
}

module.exports = SesionPoster;