const express = require("express");
const { merge } = require("ramda");
const router = express.Router();
const vendaDAO = require("../models/venda.model");
const revendedorDAO = require("../models/revendedor.model");
/* GET lista venda. */
router.get("/vendas", async function (req, res, next) {
  try {
    const vendas = vendaDAO.init();
    const [rows] = await vendas.findAll();

    res.send(rows);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

router.get("/vendas/:Id", async function (req, res, next) {
  try {
    const vendas = vendaDAO.init();
    const [[row]] = await vendas.findById(req.params.Id);

    res.send(row);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
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
    return;
  }

  if (vendas.CPF === 15350946056) {
    vendas.Status = "Aprovado";
  }

  try {
    const newVenda = { ...vendas, ...calcularValorVenda(vendas.Valor) };
    const revendedor = await revendedorDAO.findByCode(
      newVenda.CodigoRevendedor
    );

    if (!revendedor.length || !revendedor[0].length) {
      res.statusCode = 403;
      res.send("Revendedor não existe");
      return;
    }

    const result = await newVenda.create(newVenda);
    const [[row]] = await newVenda.findById(result[0].insertId);

    res.statusCode = 201;
    res.send(row);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

router.put("/vendas/editar", async function (req, res, next) {
  const vendas = vendaDAO.init(req.body);

  if (
    !vendas.Id ||
    !vendas.CodigoRevendedor ||
    !vendas.Data ||
    !vendas.Valor ||
    !vendas.Status ||
    !vendas.CPF
  ) {
    res.statusCode = 403;
    res.send("Informe o objeto de venda");
    return;
  }

  try {
    const [[dbVenda]] = await vendaDAO.findById(vendas.Id);

    if (!dbVenda) {
      res.statusCode = 403;
      res.send("Venda não existe");
      return;
    }

    if (dbVenda.Status !== "EmValidacao") {
      res.statusCode = 403;
      res.send(
        "A venda não pode ser alterada pois o status é diferente de 'Em validação'"
      );
      return;
    }

    const newVenda = { ...vendas, ...calcularValorVenda(vendas.Valor) };

    await newVenda.update(newVenda.Id, newVenda);

    const [[row]] = await newVenda.findById(newVenda.Id);

    if (row) {
      res.statusCode = 200;
      res.send(row);
      return;
    }
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

function calcularValorVenda(valor) {
  if (valor <= 1000) {
    return { ValorCashBack: percentage(10, valor), PorcentagemCashBack: 10.0 };
  }

  if (valor >= 1001 && valor <= 1500) {
    return { ValorCashBack: percentage(15, valor), PorcentagemCashBack: 15.0 };
  }

  return { ValorCashBack: percentage(20, valor), PorcentagemCashBack: 20.0 };
}

function percentage(percent, total) {
  return ((percent / 100) * total).toFixed(2);
}

router.delete("/vendas/excluir/:Id", async function (req, res, next) {
  const vendas = vendaDAO.init();

  try {
    const [[row]] = await vendas.findById(req.params.Id);

    if (!row) {
      res.statusCode = 403;
      res.send("Venda não existe");
      return;
    }

    if (row.Status === "Aprovado") {
      res.statusCode = 403;
      res.send("A venda não pode ser excluida. Status 'Aprovado'");
      return;
    }

    const [result] = await vendas.delete(row.Id);

    if (!result.affectedRows) {
      res.statusCode = 500;
      res.send("Erro ao excluir");
      return;
    }

    res.statusCode = 200;
    res.send("Excluido com sucesso");
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

module.exports = router;
