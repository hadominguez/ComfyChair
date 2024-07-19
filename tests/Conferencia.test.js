const Conferencia = require('../models/Conferencia');
const Chair = require('../models/Chair');
const Revisor = require('../models/Revisor');

test('Agregar chair y revisor a conferencia', () => {
  const conferencia = new Conferencia('Conferencia X', new Date());
  const chair1 = new Chair();
  const chair2 = new Chair();
  const revisor1 = new Revisor();
  const revisor2 = new Revisor();

  conferencia.agregarChair(chair1);
  conferencia.agregarChair(chair2);
  conferencia.agregarRevisor(revisor1);
  conferencia.agregarRevisor(revisor2);

  expect(conferencia.chairs).toContain(chair1);
  expect(conferencia.chairs).toContain(chair2);
  expect(conferencia.comitePrograma).toContain(revisor1);
  expect(conferencia.comitePrograma).toContain(revisor2);
});