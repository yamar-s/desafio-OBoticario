const app = require("../server");
const request = require("supertest");

describe("Testes das rotas de vendas", () => {
  it("GET - Deve retornar uma lista de vendas", async () => {
    const res = await request(app).get("/vendas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          CodigoRevendedor: expect.any(Number), // 4
        }),
      ])
    );
  });

  it("POST - Deve criar uma venda", async () => {
    const res = await request(app).post("/vendas").send({
      CodigoRevendedor: 1,
      Valor: 50.0,
      CPF: 15350946056,
      Data: "2021-03-15",
    })
    expect(res.statusCode).toEqual(201);
    expect(res.text).toEqual('Criado com sucesso');
  });
});
