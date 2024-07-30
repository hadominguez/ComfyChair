const Usuario = require('./Usuario');
const Chair = require('./Chair');
const Revisor = require('./Revisor');

class Conferencia {
  constructor(nombre, fecha) {
    this.nombre = nombre;
    this.fecha = fecha;
    this.chairs = [];
    this.comitePrograma = [];
    this.sesiones = [];
  }

  crearSesion(tipo, topic, deadline) {
    let sesion;
    switch (tipo) {
      case 'regular':
        sesion = new SesionRegular(topic, deadline);
        break;
      case 'workshop':
        sesion = new SesionWorkshop(topic, deadline);
        break;
      case 'poster':
        sesion = new SesionPoster(topic, deadline);
        break;
      default:
        throw new Error('Tipo de sesión no válido');
    }
    this.sesiones.push(sesion);
    return sesion;
  }

  agregarChair(chair) {
    let roles = chair.getRoles();
    let esChair = false;
      for (const value of roles) {
        if (value instanceof Chair){
        esChair = true;
        }
    }
    if (chair instanceof Usuario && esChair) {
      this.chairs.push(chair);
    }
  }

  agregarRevisor(revisor) {
    let roles = revisor.getRoles();
    let esRevisor = false;
      for (const value of roles) {
        if (value instanceof Revisor){
        esRevisor = true;
        }
    }
    if (revisor instanceof Usuario && esRevisor) {
      this.comitePrograma.push(revisor);
    }
  }

  asignarArticulos() {
    this.sesiones.forEach(function (sesion) {
      sesion.articulos.forEach(function (articulo) {
        let revisoresAsignados = [];

        let bids = articulo.bids.sort(function (a, b) {
          const estadoOrden = { 'interesado': 1, 'quizas': 2, 'sin_interes': 3, 'no_interesado': 4 };
          return estadoOrden[a.estado] - estadoOrden[b.estado];
        });

        for (let i = 0; i < bids.length; i++) {
          let bid = bids[i];
          if (revisoresAsignados.length < 3) {
            if (!this.revisorTieneLímite(bid.revisor)) {
              revisoresAsignados.push(bid.revisor);
              bid.revisor.revisionesAsignadas++;
            }
          } else {
            break;
          }
        }

        while (revisoresAsignados.length < 3) {
          let revisor = this.seleccionarRevisorAleatorio(revisoresAsignados);
          revisoresAsignados.push(revisor);
          revisor.revisionesAsignadas++;
        }

        articulo.revisoresAsignados = revisoresAsignados;
      }.bind(this));
    }.bind(this));
  }

  revisorTieneLímite(revisor) {
    return revisor.revisionesAsignadas >= this.calcularRevisionesMaximas();
  }

  calcularRevisionesMaximas() {
    let totalArticulos = this.sesiones.reduce(function (total, sesion) {
      return total + sesion.articulos.length;
    }, 0);
    return Math.ceil((totalArticulos * 3) / this.comitePrograma.length);
  }

  seleccionarRevisorAleatorio(revisoresAsignados) {
    let revisoresDisponibles = this.comitePrograma.filter(function (revisor) {
      return !revisoresAsignados.includes(revisor);
    });
    return revisoresDisponibles[Math.floor(Math.random() * revisoresDisponibles.length)];
  }
}

module.exports = Conferencia;