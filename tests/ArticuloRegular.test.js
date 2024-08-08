const ArticuloRegular = require('../models/ArticuloRegular');
const Usuario = require('../models/Usuario');
const Autor = require('../models/Autor');

test('Validar formato de artículo regular (con abstract válido e inválido)', () => {
    const usuario = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
    const autor = new Autor();
    usuario.agregarRol(autor);

    const articuloValido = new ArticuloRegular('Título Regular', 'archivo', 'Resumen corto');
    articuloValido.agregarAutor(usuario);
    expect(articuloValido.validarFormato()).toBe(true);

    const articuloInvalido = new ArticuloRegular('Título Regular', 'archivo', 'a '.repeat(301));
    articuloInvalido.agregarAutor(usuario);
    expect(articuloInvalido.validarFormato()).toBe(false);
});