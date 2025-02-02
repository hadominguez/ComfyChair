const Estado = require('./Estado');
const Seleccion = require('./Seleccion');
class Revisiones extends Estado {
    avanzarEstado() {
      this.sesion.setEstado(new Seleccion(this.sesion));
    }
}
module.exports = Revisiones;