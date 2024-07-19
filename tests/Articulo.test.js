const ArticuloRegular = require('../models/ArticuloRegular');
const ArticuloPoster = require('../models/ArticuloPoster');
const Autor = require('../models/Autor');
const Usuario = require('../models/Usuario');

test('Validar formato de Artículo Regular y Poster', () => {
  const usuario1 = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
  const usuario2 = new Usuario('Usuario2', 'Afiliacion2', 'email2@example.com', 'password2');
  const usuario3 = new Usuario('Usuario3', 'Afiliacion3', 'email3@example.com', 'password3');

  usuario1.agregarRol(new Autor());
  usuario2.agregarRol(new Autor());
  usuario3.agregarRol(new Autor());

  let articuloRegular = new ArticuloRegular('Título Regular', 'archivo', 'Resumen corto');
  articuloRegular.agregarAutor(usuario1);
  articuloRegular.agregarAutor(usuario2);
  articuloRegular.agregarAutor(usuario3);
  articuloRegular.agregarAutorEncargado(usuario1);
  expect(articuloRegular.validarFormato()).toBe(true);

  let articuloPoster = new ArticuloPoster('Título Poster', 'archivo', 'fuente.url');
  articuloPoster.agregarAutor(usuario2);
  articuloPoster.agregarAutor(usuario3);
  articuloPoster.agregarAutorEncargado(usuario3);

  expect(articuloPoster.validarFormato()).toBe(true);

  let articuloRegularLargo = new ArticuloRegular('Título Regular', 'archivo', 'palabra '.repeat(301));
  articuloRegular.agregarAutor(usuario2);
  articuloRegular.agregarAutorEncargado(usuario2);
  expect(articuloRegularLargo.validarFormato()).toBe(false);
});