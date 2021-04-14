const { request } = require("express");
const express = require("express");
const router = express.Router();
const vendaDAO = require("../models/venda.model");
const revendedorDAO = require("../models/revendedor.model");
/* GET lista venda. */
router.get("/vendas", async function (req, res, next) {
  const vendas = vendaDAO.init();
  const [rows] = await vendas.findAll();
  res.send(rows);
});

router.post("/vendas", async function (req, res, next) {
  const vendas = vendaDAO.init(req.body);
  if (
    !vendas.CPF ||
    !vendas.CodigoRevendedor ||
    !vendas.Data ||
    !vendas.Valor
  ) {
    res.statusCode = 400;
    res.send("Verifique os dados enviados");
  }

  if (vendas.CPF === 15350946056) {
    vendas.Status = "Aprovado";
  }
  try {
    const revendedor = await revendedorDAO.findByCode(vendas.CodigoRevendedor);
    if (!revendedor.length || !revendedor[0].length) {
      res.statusCode = 403;
      res.send("Revendedor não existe");
    }

    await vendas.create();
    res.statusCode = 201;
    res.send("Criado com sucesso");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
