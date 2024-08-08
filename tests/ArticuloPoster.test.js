const ArticuloPoster = require('../models/ArticuloPoster');
const Usuario = require('../models/Usuario');
const Autor = require('../models/Autor');

test('Validar formato de artículo poster', () => {
    const usuario = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
    const autor = new Autor();
    usuario.agregarRol(autor);

    const articuloValido = new ArticuloPoster('Título Poster', 'archivo', 'http://example.com');
    articuloValido.agregarAutor(usuario);
    expect(articuloValido.validarFormato()).toBe(true);

    const articuloInvalido = new ArticuloPoster(null, '', 'fuente.url');
    articuloInvalido.agregarAutor(usuario);
    expect(articuloInvalido.validarFormato()).toBe(false);
});