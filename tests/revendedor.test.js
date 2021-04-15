const app = require("../server");
const request = require("supertest");

describe("Testes das rotas de revendedor", () => {
  it("GET - Deve retornar uma lista de revendedor", async () => {
    const res = await request(app).get("/revendedor");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          NomeCompleto: expect.any(String),
          CPF: expect.any(Number),
          Email: expect.any(String),
          Codigo: expect.any(Number),
        }),
      ])
    );
  });
  it("GET - Deve retornar um revendedor especifico", async () => {
    const res = await request(app).get("/revendedor/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        NomeCompleto: expect.any(String),
        CPF: expect.any(Number),
        Email: expect.any(String),
        Codigo: expect.any(Number),
      })
    );
  });
  it("GET - Não deve retornar um revendedor - Código não existente", async () => {
    const res = await request(app).get("/revendedor/1000");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Revendedor não existe");
  });
});
