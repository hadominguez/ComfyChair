const Estado = require('./Estado');
const Bidding = require('./Bidding');
class Recepcion extends Estado {
    avanzarEstado() {
      this.sesion.setEstado(new Bidding(this.sesion));
    }
}
module.exports = Recepcion;