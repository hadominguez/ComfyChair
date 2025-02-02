const Estado = require('./Estado');
class Seleccion extends Estado {
    avanzarEstado() {
      console.log("La sesión ya está en el último estado.");
    }
}
module.exports = Seleccion;