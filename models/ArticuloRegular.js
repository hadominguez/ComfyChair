const Articulo = require('./Articulo');

class ArticuloRegular extends Articulo {
  constructor(titulo, archivoAdjunto, abstract) {
    super(titulo, archivoAdjunto);
    this.abstract = abstract;
  }

  validarFormato() {
    let palabras = this.abstract.split(/\s+/);
    return this.abstract && palabras.length <= 300 && this.titulo && this.autores.length >= 1;
  }
}

module.exports = ArticuloRegular;