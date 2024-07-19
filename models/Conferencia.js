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
      } else {
        console.log('El usuario no tiene el rol de Chair');
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
      } else {
        console.log('El usuario no tiene el rol de Revisor');
      }
    }
  }
  
  module.exports = Conferencia;