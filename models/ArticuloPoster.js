const Articulo = require('./Articulo');

class ArticuloPoster extends Articulo {
  constructor(titulo, archivoAdjunto, autores, autorEncargado, fuenteURL) {
    super(titulo, archivoAdjunto, autores, autorEncargado);
    this.fuenteURL = fuenteURL;
  }

  validarFormato() {
    return this.titulo && this.autores.length >= 1;
  }
}

module.exports = ArticuloPoster;