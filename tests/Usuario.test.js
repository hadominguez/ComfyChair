const Usuario = require('../models/Usuario');
const Chair = require('../models/Chair');
const Revisor = require('../models/Revisor');
const Autor = require('../models/Autor');

test('Un usuario puede tener múltiples roles', () => {
    const usuario = new Usuario('Nombre', 'Afiliación', 'email@example.com', 'password');
    const chair = new Chair();
    const revisor = new Revisor();
    const autor = new Autor();
  
    usuario.agregarRol(chair);
    usuario.agregarRol(revisor);
    usuario.agregarRol(autor);
  
    const roles = usuario.getRoles();
    expect(roles.has(chair)).toBe(true);
    expect(roles.has(revisor)).toBe(true);
    expect(roles.has(autor)).toBe(true);
  });