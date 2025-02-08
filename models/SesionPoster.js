const Sesion = require('./Sesion');
const ArticuloPoster = require('./ArticuloPoster');

class SesionPoster extends Sesion {
  validarArticulo(articulo) {
    if (!(articulo instanceof ArticuloPoster)) {
      throw new Error("El artículo no es un ArticuloPoster válido.");
    }
    return articulo.validarFormato();
  }
}

module.exports = SesionPoster;