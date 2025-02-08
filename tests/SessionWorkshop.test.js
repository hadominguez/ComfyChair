const SesionWorkshop = require('../models/SesionWorkshop');
const ArticuloRegular = require('../models/ArticuloRegular');
const Usuario = require('../models/Usuario');
const Autor = require('../models/Autor');

test('Validar formato de artículo en SesionWorkshop', () => {
  const usuario = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
  const autor = new Autor();
  usuario.agregarRol(autor);

  const sesion = new SesionWorkshop('Workshop Session', '2024-12-01');
  const articulo = new ArticuloRegular('Título Regular', 'archivo', 'a'.repeat(300));
  articulo.agregarAutor(usuario);
  articulo.agregarAutorEncargado(usuario);

  // Se usa validarEnSesion en lugar de validarFormato directamente en la sesión
  expect(articulo.validarEnSesion(sesion)).toBe(true);

  const articuloInvalido = {};
  expect(() => sesion.validarArticulo(articuloInvalido)).toThrow();
});
