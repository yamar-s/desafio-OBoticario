const express = require("express");
const md5 = require("md5");
const router = express.Router();
const revendedorDAO = require("../models/revendedor.model");

router.get("/revendedor", async function (req, res, next) {
  const revendedor = revendedorDAO.init();
  const [rows] = await revendedor.findAll();
  res.send(rows);
});

router.get("/revendedor/:codigo", async function (req, res, next) {
  const revendedor = revendedorDAO.init();
  const [[rows]] = await revendedor.findByCode(req.params.codigo);

  if (!rows) {
    res.send("Revendedor não existe");
  }

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
  const [[rows]] = await revendedor.findByCPF(req.body.CPF);
  if (rows) {
    res.statusCode = 400;
    res.send("CPF Já cadastrado");
  }

  revendedor.Senha = md5(revendedor.Senha);
  revendedor.DataCriacao = new Date().toISOString().split("Z")[0];

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

  revendedor.Senha = md5(revendedor.Senha);

  try {
    const [rows] = await revendedor.findByLogin(
      revendedor
    );

    if (rows.length) {
      res.statusCode = 200;
      res.send("Criado com sucesso");
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
