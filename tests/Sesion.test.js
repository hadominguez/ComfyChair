const SesionRegular = require('../models/SesionRegular');
const ArticuloRegular = require('../models/ArticuloRegular');
const Usuario = require('../models/Usuario');
const Autor = require('../models/Autor');
const Revisor = require('../models/Revisor');
const Bid = require('../models/Bid');

describe('Sesion', () => {
    it('Debería lanzar un error al instanciar la clase abstracta Sesion', () => {
        const Sesion = require('../models/Sesion');
        expect(() => new Sesion('Topic', '2025-12-01')).toThrowError('No se puede instanciar la clase abstracta Sesion directamente.');
    });

    it('Debería agregar un artículo a la sesión en estado de recepción', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        const usuario = new Usuario('Autor', 'Afiliacion', 'email@ejemplo.com', 'contrasena');
        usuario.agregarRol(new Autor());
        const articulo = new ArticuloRegular('Título Regular', 'archivo', 'Resumen corto');
        articulo.agregarAutor(usuario);

        expect(() => sesion.agregarArticulo(articulo)).not.toThrow();
        expect(sesion.articulos).toContain(articulo);
    });

    it('No debería permitir agregar artículos después de la fecha límite', () => {
        const sesion = new SesionRegular('Topic', '2020-01-01');
        const usuario = new Usuario('Autor', 'Afiliacion', 'email@ejemplo.com', 'contrasena');
        usuario.agregarRol(new Autor());
        const articulo = new ArticuloRegular('Título Regular', 'archivo', 'Resumen corto');
        articulo.agregarAutor(usuario);

        expect(() => sesion.agregarArticulo(articulo)).toThrow('No se puede agregar artículos después de la fecha límite');
    });

    it('Debería avanzar al siguiente estado', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        sesion.avanzarEstado();
        expect(sesion.estado).toBe('bidding');
    });

    it('No debería avanzar más allá del último estado', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        for (let i = 0; i < 4; i++) {
            sesion.avanzarEstado();
        }
        expect(sesion.estado).toBe('seleccion');
        sesion.avanzarEstado();
        expect(sesion.estado).toBe('seleccion');
    });

    it('Debería permitir iniciar el bidding en estado de recepción', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        expect(() => sesion.iniciarBidding()).not.toThrow();
        expect(sesion.estado).toBe('bidding');
    });

    it('No debería permitir iniciar el bidding en un estado diferente de recepción', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        sesion.avanzarEstado();
        sesion.avanzarEstado();
        expect(() => sesion.iniciarBidding()).toThrow('No se puede iniciar el bidding en el estado actual.');
    });

    it('Debería recibir un bid en el estado correcto', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        sesion.iniciarBidding();
        const revisor = new Usuario('Revisor', 'Afiliacion', 'revisor@ejemplo.com', 'contrasena');
        const articulo = new ArticuloRegular('Título Regular', 'archivo', 'Resumen corto');
        expect(() => sesion.recibirBid(revisor, articulo, 'interesado')).not.toThrow();
        expect(sesion.bids.length).toBe(1);
    });

    it('No debería aceptar bids fuera del estado de bidding', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        const revisor = new Usuario('Revisor', 'Afiliacion', 'revisor@ejemplo.com', 'contrasena');
        const articulo = new ArticuloRegular('Título Regular', 'archivo', 'Resumen corto');
        expect(() => sesion.recibirBid(revisor, articulo, 'interesado')).toThrow('No se pueden recibir bids fuera del estado de bidding.');
    });

    it('Debería finalizar el bidding y asignar artículos correctamente', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        const revisor1 = new Usuario('Revisor1', 'Afiliacion1', 'revisor1@ejemplo.com', 'contrasena');
        const revisor2 = new Usuario('Revisor2', 'Afiliacion2', 'revisor2@ejemplo.com', 'contrasena');
        const usuario = new Usuario('Usuario1', 'Afiliacion1', 'email1@example.com', 'password1');
        const autor = new Autor();
        usuario.agregarRol(autor);
        const articulo1 = new ArticuloRegular('Título Regular 1', 'archivo1', 'Resumen corto 1');
        articulo1.agregarAutor(usuario);
        const articulo2 = new ArticuloRegular('Título Regular 2', 'archivo2', 'Resumen corto 2');
        articulo2.agregarAutor(usuario);

        revisor1.agregarRol(new Revisor());
        revisor2.agregarRol(new Revisor());
        sesion.agregarArticulo(articulo1);
        sesion.agregarArticulo(articulo2);

        sesion.iniciarBidding();

        const bid1 = new Bid(revisor1, articulo1, 'interesado');
        const bid2 = new Bid(revisor2, articulo2, 'interesado');

        sesion.recibirBid(revisor1, articulo1, 'interesado');
        sesion.recibirBid(revisor2, articulo2, 'interesado');

        sesion.finalizarBidding([revisor1, revisor2]);

        expect(articulo1.revisores).toContain(revisor1);
        expect(articulo2.revisores).toContain(revisor2);
    });

    it('Debería finalizar la revisión y seleccionar artículos aceptados, calificación Corte Fijo', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        sesion.avanzarEstado();
        sesion.avanzarEstado();

        const articulo1 = new ArticuloRegular('Título Regular 1', 'archivo1', 'Resumen corto 1');
        const articulo2 = new ArticuloRegular('Título Regular 2', 'archivo2', 'Resumen corto 2');

        articulo1.revisiones = [{ calificacion: 5 }, { calificacion: 4 }, { calificacion: 5 }];
        articulo2.revisiones = [{ calificacion: 2 }, { calificacion: 2 }, { calificacion: 2 }];

        sesion.articulos.push(articulo1);
        sesion.articulos.push(articulo2);

        sesion.finalizarRevision();

        expect(sesion.articulosAceptados.length).toBe(1);
        expect(sesion.articulosAceptados).toContain(articulo1);
    });

    it('Debería finalizar la revisión y seleccionar artículos aceptados, calificación Mejores', () => {
        const sesion = new SesionRegular('Topic', '2024-12-01');
        sesion.criterioSeleccion="mejores";
        sesion.avanzarEstado();
        sesion.avanzarEstado();

        const articulo1 = new ArticuloRegular('Título Regular 1', 'archivo1', 'Resumen corto 1');
        const articulo2 = new ArticuloRegular('Título Regular 2', 'archivo2', 'Resumen corto 2');

        articulo1.revisiones = [{ calificacion: 5 }, { calificacion: 4 }, { calificacion: 5 }];
        articulo2.revisiones = [{ calificacion: 2 }, { calificacion: 2 }, { calificacion: 2 }];

        sesion.articulos.push(articulo1);
        sesion.articulos.push(articulo2);

        sesion.finalizarRevision();

        expect(sesion.articulosAceptados.length).toBe(2);
        expect(sesion.articulosAceptados).toContain(articulo1);
    });
});