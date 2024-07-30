const Revision = require('../models/Revision');
const Usuario = require('../models/Usuario');
const ArticuloPoster = require('../models/ArticuloPoster');

test('Crear una revisión', () => {
  const revisor = new Usuario('Revisor', 'Afiliación', 'revisor@example.com', 'password');
  const articulo = new ArticuloPoster('Título', 'archivo', 'http://example.com');
  const revision = new Revision(revisor, articulo, 4, 'Comentario de la revisión');

  expect(revision.revisor).toBe(revisor);
  expect(revision.articulo).toBe(articulo);
  expect(revision.calificacion).toBe(4);
  expect(revision.comentario).toBe('Comentario de la revisión');
});
