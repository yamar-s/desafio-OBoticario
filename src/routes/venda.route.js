const express = require("express");
const { merge } = require("ramda");
const router = express.Router();
const vendaDAO = require("../models/venda.model");
const revendedorDAO = require("../models/revendedor.model");
/* GET -Lista todas as vendas */
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

/* GET - Busca venda por Id */

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

/* POST - Cadastra nova venda */

router.post("/vendas", async function (req, res, next) {
  const vendas = vendaDAO.init(req.body);

  //Valida se os campos obrigatórios estão preenchidos
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

  //Verifica se o CPF cadastrado deve ter o pedido aprovado
  if (vendas.CPF === 15350946056) {
    vendas.Status = "Aprovado";
  }

  try {
    const newVenda = { ...vendas, ...calcularValorCashBack(vendas.Valor) };
    const revendedor = await revendedorDAO.findByCode(
      newVenda.CodigoRevendedor
    );

    //Verifica se o revendedor informado está cadastrado
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

/* PUT - Edita uma venda existente - Identificada pelo Id*/
router.put("/vendas", async function (req, res, next) {
  const vendas = vendaDAO.init(req.body);

  //Valida se os campos obrigatórios estão preenchidos
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

    //Valida se Id está vinculado a uma venda existente
    if (!dbVenda) {
      res.statusCode = 403;
      res.send("Venda não existe");
      return;
    }

    //Valida se a venda pode ser alterada - validação por status
    if (dbVenda.Status !== "EmValidacao") {
      res.statusCode = 403;
      res.send(
        "A venda não pode ser alterada pois o status é diferente de 'Em validação'"
      );
      return;
    }

    const newVenda = { ...vendas, ...calcularValorCashBack(vendas.Valor) };

    await newVenda.update(newVenda.Id, newVenda);

    const [[row]] = await newVenda.findById(newVenda.Id);

    //Valida se a venda está cadastrada corretamente para exibição
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

/* DEL - Deleta uma venda existente - Identificada pelo Id*/

router.delete("/vendas/excluir/:Id", async function (req, res, next) {
  const vendas = vendaDAO.init();

  try {
    const [[row]] = await vendas.findById(req.params.Id);

    //Valida se Id está vinculado a uma venda existente
    if (!row) {
      res.statusCode = 403;
      res.send("Venda não existe");
      return;
    }

    //Valida se a venda pode ser excluida - validação por status
    if (row.Status === "Aprovado") {
      res.statusCode = 403;
      res.send("A venda não pode ser excluida. Status 'Aprovado'");
      return;
    }

    const [result] = await vendas.delete(row.Id);

    //Valida se a exclusão da venda foi bem sucedida
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

//Realiza o calculo do valor de cashBack de acordo com o valor da venda
// A porcentagem é atribuida de acordo com os criterios de bonificação
//Valores >= 0 && <= 1000 - 10% de cashback
//Valores >= 1001 && <= 1500 - 15% de cashback
//Valores > 1500 - 20% de cashback

function calcularValorCashBack(valor) {
  if (valor <= 1000) {
    return {
      ValorCashBack: ValorTotalCashBack(10, valor),
      PorcentagemCashBack: 10.0,
    };
  }

  if (valor >= 1001 && valor <= 1500) {
    return {
      ValorCashBack: ValorTotalCashBack(15, valor),
      PorcentagemCashBack: 15.0,
    };
  }

  return {
    ValorCashBack: ValorTotalCashBack(20, valor),
    PorcentagemCashBack: 20.0,
  };
}

//Calcula o valor total do cashback de acordo com a porcentagem e o valor total da venda
function ValorTotalCashBack(porcentagem, total) {
  return ((porcentagem / 100) * total).toFixed(2);
}

module.exports = router;
