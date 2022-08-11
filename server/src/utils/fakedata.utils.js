//DECLARACIONES
import { faker } from "@faker-js/faker";
faker.locale = "es";

const mockArray = [];

const createMock = async () => {
  let cantidad = 5;
  let id = mockArray.length ? mockArray.length + 1 : 1;
  for (let i = 1; i <= cantidad; i++) {
    mockArray.push({
      nombre: faker.commerce.product(),
      precio: faker.commerce.price(),
      foto: faker.image.imageUrl(640, 480, "food", true),
    });
    id++;
  }
  return true;
};

const getMock = async () => {
  await createMock();
  return mockArray;
};

//export
export default getMock;
