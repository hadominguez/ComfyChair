const Revisor = require('../models/Revisor');
const Rol = require('../models/Rol');

test('Revisor es instancia de Rol', () => {
    const revisor = new Revisor();
    expect(revisor).toBeInstanceOf(Rol);
});