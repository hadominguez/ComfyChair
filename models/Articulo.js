const Autor = require("./Autor");
const Usuario = require("./Usuario");

class Articulo {
  constructor(titulo, archivoAdjunto) {
    if (new.target === Articulo) {
      throw new TypeError('No se puede instanciar la clase abstracta Articulo directamente.');
    }
    this.titulo = titulo;
    this.archivoAdjunto = archivoAdjunto;
    this.autores = [];
    this.revisores = [];
    this.autorEncargado = null;
  }

  validarFormato() {
    throw new Error("Este método debe ser implementado por las subclases.");
  }
  validarEnSesion(sesion) {
    return sesion.validarArticulo(this);
  }

  agregarRevisor(revisor) {
    if (revisor instanceof Revisor) {
      this.autores.push(autor);
    } else {
      console.log('No es un revisor');
    }
  }

  agregarAutor(autor) {
    let roles = autor.getRoles();
    let esAutor = false;
    for (const value of roles) {
      if (value instanceof Autor) {
        esAutor = true;
      }
    }
    if (autor instanceof Usuario && esAutor) {
      this.autores.push(autor);
    } else {
      console.log('El usuario no tiene el rol de Autor');
    }
  }

  agregarAutorEncargado(autor) {
    let roles = autor.getRoles();
    let esAutor = false;
    for (const value of roles) {
      if (value instanceof Autor) {
        esAutor = true;
      }
    }
    if (autor instanceof Usuario && esAutor && this.autores.includes(autor)) {
      this.autorEncargado = autor;
    } else {
      console.log('El usuario no tiene el rol de Autor');
    }
  }
}

module.exports = Articulo;