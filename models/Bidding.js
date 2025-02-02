const Estado = require('./Estado');
const Revisiones = require('./Revisiones');
class Bidding extends Estado {
    avanzarEstado() {
      this.sesion.setEstado(new Revisiones(this.sesion));
    }
}
module.exports = Bidding;