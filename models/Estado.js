class Estado {
    constructor(sesion) {
      this.sesion = sesion;
    }
  
    avanzarEstado() {
      throw new Error("Método no implementado.");
    }
}
module.exports = Estado;