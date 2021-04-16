const app = require("../server");
const request = require("supertest");

describe("Testes das rotas de revendedor", () => {
  it("GET - Não deve retornar um revendedor - Código não existente", async () => {
    const res = await request(app).get("/revendedor/1000");
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Revendedor não existe");
  });

  it("POST - Deve criar um novo revendedor", async () => {
    const res = await request(app).post("/revendedor").send({
      NomeCompleto: "Yasmin Martins dos Santos",
      CPF: 46977429828,
      Email: "yasminmartinssantos@gmail.com",
      Senha: "123456",
      Genero: "F",
      Celular: 11949078657,
      DataCriacao: "1901-01-01T03:06:28.000",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        NomeCompleto: expect.any(String),
        CPF: expect.any(Number),
        Email: expect.any(String),
        Codigo: expect.any(Number),
      })
    );
  });
  it("POST - Deve logar o revendedor", async () => {
    const res = await request(app).post("/revendedor/login").send({
      Email: "yasminmartinssantos@gmail.com",
      Senha: "123456",
    });
    expect(res.statusCode).toEqual(200);
  });

  it("POST -Não deve logar o revendedor - Campo de senha ausente", async () => {
    const res = await request(app).post("/revendedor/login").send({
      Email: "yasminmartinssantos@gmail.com",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Os campos de email e senha são obrigatórios");
  });

  it("POST - Não deve criar um novo revendedor - CPF já existe", async () => {
    const res = await request(app).post("/revendedor").send({
      NomeCompleto: "Yasmin Martins dos Santos",
      CPF: 46977429828,
      Email: "yasminmartinssantos@gmail.com",
      Senha: "123456",
      Genero: "F",
      Celular: 11949078657,
      DataCriacao: "1901-01-01T03:06:28.000",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("CPF Já cadastrado");
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
});
