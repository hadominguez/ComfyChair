const SesionRegular = require('../models/SesionRegular');
const ArticuloRegular = require('../models/ArticuloRegular');
const Autor = require('../models/Autor');
const Usuario = require('../models/Usuario');

test('Validar formato de artículo en SesionRegular', () => {
  const usuario = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
  const autor = new Autor();
  usuario.agregarRol(autor);

  const sesion = new SesionRegular('Regular Session', '2024-12-01');
  const articuloRegular = new ArticuloRegular('Título Regular', 'archivo', 'Resumen corto');
  articuloRegular.agregarAutor(usuario);
  articuloRegular.agregarAutorEncargado(usuario);

  expect(articuloRegular.validarEnSesion(sesion)).toBe(true);

  const articuloInvalido = {};
  expect(() => sesion.validarArticulo(articuloInvalido)).toThrow();
});
