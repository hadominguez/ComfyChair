class Usuario {
  constructor(nombre, afiliacion, email, contrasena) {
    this.nombre = nombre;
    this.afiliacion = afiliacion;
    this.email = email;
    this.contrasena = contrasena;
    this.roles = new Set();
  }

  getRoles() {
    return this.roles;
  }

  agregarRol(rol) {
    this.roles.add(rol);
  }
}

module.exports = Usuario;