const Articulo = require('./Articulo');

class ArticuloPoster extends Articulo {
  constructor(titulo, archivoAdjunto, fuenteURL) {
    super(titulo, archivoAdjunto);
    this.fuenteURL = fuenteURL;
  }

  validarFormato() {
    return ((this.titulo !== null && this.variable !== "") && this.autores.length >= 1);
  }
}

module.exports = ArticuloPoster;