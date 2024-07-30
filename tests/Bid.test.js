const Bid = require('../models/Bid');
const Usuario = require('../models/Usuario');
const ArticuloPoster = require('../models/ArticuloPoster');

test('Crear un bid y cambiar su estado', () => {
  const revisor = new Usuario('Revisor', 'Afiliación', 'revisor@example.com', 'password');
  const articulo = new ArticuloPoster('Título', 'archivo', 'http://example.com');
  const bid = new Bid(revisor, articulo, 'interesado');

  expect(bid.estado).toBe('interesado');

  bid.cambiarEstado('quizas');
  expect(bid.estado).toBe('quizas');

  expect(() => bid.cambiarEstado('invalido')).toThrow('Estado no válido');
});
