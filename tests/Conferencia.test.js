const Conferencia = require('../models/Conferencia');
const Usuario = require('../models/Usuario');
const Chair = require('../models/Chair');
const Revisor = require('../models/Revisor');

test('Crear y agregar sesión a conferencia', () => {
    const conferencia = new Conferencia('Conferencia X', new Date());
    const sesionRegular = conferencia.crearSesion('regular', 'Topic Regular', '2024-12-01');
    const sesionWorkshop = conferencia.crearSesion('workshop', 'Topic Workshop', '2024-12-01');

    expect(conferencia.sesiones).toContain(sesionRegular);
    expect(conferencia.sesiones).toContain(sesionWorkshop);
});

test('Agregar chair y revisor a conferencia', () => {
  const conferencia = new Conferencia('Conferencia X', new Date());
  const usuario1 = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
  const usuario2 = new Usuario('Usuario2', 'Afiliacion2', 'email2@example.com', 'password2');
  const usuario3 = new Usuario('Usuario3', 'Afiliacion3', 'email3@example.com', 'password3');

  const chair1 = new Chair();
  const chair2 = new Chair();
  const revisor1 = new Revisor();

  usuario1.agregarRol(chair1);
  usuario2.agregarRol(chair2);
  usuario1.agregarRol(revisor1);

  conferencia.agregarChair(usuario1);
  conferencia.agregarChair(usuario2);
  conferencia.agregarChair(usuario3);
  conferencia.agregarRevisor(usuario1);
  conferencia.agregarRevisor(usuario2);
  conferencia.agregarRevisor(usuario3);

  expect(conferencia.chairs).toContain(usuario1);
  expect(conferencia.chairs).toContain(usuario2);
  expect(conferencia.chairs).not.toContain(usuario3);
  expect(conferencia.comitePrograma).toContain(usuario1);
  expect(conferencia.comitePrograma).not.toContain(usuario2);
  expect(conferencia.comitePrograma).not.toContain(usuario3);
});