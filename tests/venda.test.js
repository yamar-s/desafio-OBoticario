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
  
  it("GET - Deve retornar uma venda especifica", async () => {
    const res = await request(app).get("/vendas/118");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoRevendedor: expect.any(Number),
        CPF: expect.any(Number),
        Valor: expect.any(Number),
        Data: expect.any(String),
        ValorCashBack: expect.any(Number),
        PorcentagemCashBack: expect.any(String),
      })
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
      expect.objectContaining({
        PorcentagemCashBack: "10.00",
      })
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
      expect.objectContaining({
        PorcentagemCashBack: "15.00",
      })
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
      expect.objectContaining({
        PorcentagemCashBack: "20.00",
      })
    );
  });
  
  it("PUT - Deve editar a venda - status EmValidacao", async () => {
    const res = await request(app).put("/vendas/editar").send({
      Id: 103,
      CodigoRevendedor: 1,
      Valor: 200,
      Status: "EmValidacao",
      Data: "2021-03-15T03:00:00.000",
      CPF: 15350946056,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoRevendedor: expect.any(Number),
        CPF: expect.any(Number),
        Valor: expect.any(Number),
        Data: expect.any(String),
        ValorCashBack: expect.any(Number),
        PorcentagemCashBack: expect.any(String),
      })
    );
  });
  
  it("PUT -Não deve editar a venda - status Aprovado", async () => {
    const res = await request(app).put("/vendas/editar").send({
      Id: 117,
      CodigoRevendedor: 1,
      Valor: 520,
      Status: "Aprovado",
      Data: "2021-03-15T03:00:00.000",
      CPF: 15350946056,
    });
    expect(res.statusCode).toEqual(403);
    expect(res.text).toEqual(
      "A venda não pode ser alterada pois está com o status 'Em validação'"
    );
  });
  
  it("DEL - Deve excluir uma venda especifica", async () => {
    const res = await request(app).del("/vendas/excluir/149");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Excluido com sucesso");    
  });
});
