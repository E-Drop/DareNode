import { findById } from "../../src/utils/findById.js";

describe("FilterById Unitary Testing", () => {
  it("filter array of names an id's by id", () => {
    const arrayTofilter = [
      { name: 'MariTrini', id: 1},
      { name: 'Falete', id: 2},
      { name: 'Lola', id: 3},
      { name: 'Manoli', id: 4},
      { name: 'Paqui', id: 5},
    ];

    expect(findById(arrayTofilter, 'id', 3).name).toEqual('Lola');
    expect(findById(arrayTofilter, 'id', 1).name).toEqual('MariTrini');
  });
});
