const app = require("../server");
const request = require("supertest");

describe("Testes das rotas de vendas", () => {
  it("GET - Deve retornar uma lista de vendas", async () => {
    const res = await request(app).get("/vendas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          CodigoRevendedor: expect.any(Number),
          CPF: expect.any(Number),
          Valor: expect.any(Number),
          Data: expect.any(String),
          ValorCashBack: expect.any(Number),
          PorcentagemCashBack: expect.any(String),
        }),
      ])
    );
  });

  it("POST - Deve criar uma venda com 10% de cashBack", async () => {
    const res = await request(app).post("/vendas").send({
      CodigoRevendedor: 1,
      Valor: 50.0,
      CPF: 15350946056,
      Data: "2021-03-15",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          PorcentagemCashBack: '10.00',
        }),
      ])
    );
  });
  it("POST - Deve criar uma venda com 15% de cashBack", async () => {
    const res = await request(app).post("/vendas").send({
      CodigoRevendedor: 1,
      Valor: 1400.0,
      CPF: 15350946056,
      Data: "2021-03-15",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          PorcentagemCashBack: '15.00',
        }),
      ])
    );
  });
  it("POST - Deve criar uma venda com 20% de cashBack", async () => {
    const res = await request(app).post("/vendas").send({
      CodigoRevendedor: 1,
      Valor: 5000.0,
      CPF: 15350946056,
      Data: "2021-03-15",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          PorcentagemCashBack: '20.00',
        }),
      ])
    );
  });
});
