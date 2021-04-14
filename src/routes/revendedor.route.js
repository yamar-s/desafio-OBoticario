const express = require("express");
const md5 = require("md5");
const rvsmd5 = require("reverse-md5");

const router = express.Router();
const revendedorDAO = require("../models/revendedor.model");

router.get("/revendedor", async function (req, res, next) {
  const revendedor = revendedorDAO.init();
  const [rows] = await revendedor.findAll();
  res.send(rows);
});

router.get("/revendedor/:codigo", async function (req, res, next) {
  const revendedor = revendedorDAO.init();
  const [rows] = await revendedor.findByCode(req.params.codigo);
  res.send(rows);
});

router.post("/revendedor/cadastro", async function (req, res, next) {
  const revendedor = revendedorDAO.init(req.body);
  if (
    !revendedor.Email ||
    !revendedor.Senha ||
    !revendedor.CPF ||
    !revendedor.NomeCompleto
  ) {
    res.statusCode = 400;
    res.send("Verifique os dados enviados");
  }

  revendedor.Senha = md5(revendedor.Senha);  

  console.log(new Date().toISOString().split('Z')[0])
  revendedor.DataCriacao = new Date().toISOString().split('Z')[0]
  try {
    await revendedor.create();
    res.statusCode = 201;
    res.send("Criado com sucesso");
  } catch (error) {
    res.send(error);
  }
});

router.post("/revendedor/login", async function (req, res, next) {
  const revendedor = revendedorDAO.init(req.body);
  if (!revendedor.Email || !revendedor.Senha) {
    res.statusCode = 400;
    res.send("Os campos de email e senha são obrigatórios");
  }

  if (revendedor.Senha) {
    revendedor.Senha = md5(revendedor.Senha);
  }

  try {
    console.log(revendedor);

    const [rows] = await revendedor.findByLogin(
      revendedor.Email,
      revendedor.Senha
    );
    console.log(rows);
    if (rows.length && rows.length > 0) {
      res.statusCode = 200;
      res.send("Criado com sucesso");
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
