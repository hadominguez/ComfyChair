const SesionWorkshop = require('../models/SesionWorkshop');
const ArticuloRegular = require('../models/ArticuloRegular');
const Usuario = require('../models/Usuario');
const Autor = require('../models/Autor');

test('Validar formato de artículo en SesionWorkshop', () => {
  const usuario = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
  const autor = new Autor();
  usuario.agregarRol(autor);

  const sesion = new SesionWorkshop('Workshop Session', '2024-12-01');
  const articulo = new ArticuloRegular('Título Workshop', 'archivo', "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
  articulo.agregarAutor(usuario);
  articulo.agregarAutorEncargado(usuario);

  expect(sesion.validarFormato(articulo)).toBe(true);

  const articuloInvalido = {};
  expect(sesion.validarFormato(articuloInvalido)).toBe(false);
});
