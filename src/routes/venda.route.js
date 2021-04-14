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

  if (vendas.Valor > 0) {
    var valor = vendas.Valor;

    switch (true) {
      case valor <= 1000:
        vendas.ValorCashBack = percentage(10, valor);
        vendas.PorcentagemCashBack = 10.0;
        break;
      case valor >= 1001 && valor <= 1500:
        vendas.ValorCashBack = percentage(15, valor);
        vendas.PorcentagemCashBack = 15.0;
        break;
      case valor > 1501:
        vendas.ValorCashBack = percentage(20, valor);
        vendas.PorcentagemCashBack = 20.0;
        break;
    }
  }

  try {
    const revendedor = await revendedorDAO.findByCode(vendas.CodigoRevendedor);
    if (!revendedor.length || !revendedor[0].length) {
      res.statusCode = 403;
      res.send("Revendedor não existe");
    }

    const result = await vendas.create();
    console.log(result[0].insertId);

    const [rows] = await vendas.findById(result[0].insertId);
    res.statusCode = 201;
    res.send(rows);
  } catch (error) {
    res.send(error);
  }
});

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2);
}

module.exports = router;
