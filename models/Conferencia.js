const Usuario = require('./Usuario');
const Chair = require('./Chair');
const Revisor = require('./Revisor');
const SesionRegular = require('./SesionRegular');
const SesionWorkshop = require('./SesionWorkshop');
const SesionPoster = require('./SesionPoster');

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
}

module.exports = Conferencia;