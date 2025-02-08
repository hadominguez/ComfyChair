const SesionPoster = require('../models/SesionPoster');
const ArticuloPoster = require('../models/ArticuloPoster');
const Autor = require('../models/Autor');
const Usuario = require('../models/Usuario');

test('Validar formato de artículo en SesionPoster', () => {
    const usuario = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
    const autor = new Autor();
    usuario.agregarRol(autor);

    const sesion = new SesionPoster('Poster Session', '2024-12-01');
    const articuloPoster = new ArticuloPoster('Título Poster', 'archivo', 'http://example.com');
    articuloPoster.agregarAutor(usuario);
    articuloPoster.agregarAutorEncargado(usuario);

    expect(articuloPoster.validarEnSesion(sesion)).toBe(true);

    const articuloInvalido = {};
    expect(() => sesion.validarArticulo(articuloInvalido)).toThrow();
});
