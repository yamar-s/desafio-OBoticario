const express = require("express");
const md5 = require("md5");
const router = express.Router();
const revendedorDAO = require("../models/revendedor.model");
const axios = require("axios");

/* GET - Recupera o cashback acumulado - Identificado pelo CPF */

router.get("/revendedor/cashback/:CPF", async function (req, res, next) {
  try {
    const { data } = await axios.get(
      "https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback",
      {
        params: {
          cpf: req.params.CPF,
        },
        headers: { token: "ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm" },
      }
    );

    res.send(data.body);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

/* GET - Lista todos os revendedores */

router.get("/revendedor", async function (req, res, next) {
  try {
    const revendedor = revendedorDAO.init();
    const [rows] = await revendedor.findAll();

    res.send(
      rows.map(function (current) {
        const { Senha, ...item } = current;
        return item;
      })
    );
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

/* GET - Busca revendedor por código */

router.get("/revendedor/:codigo", async function (req, res, next) {
  try {
    const revendedor = revendedorDAO.init();
    const [[row]] = await revendedor.findByCode(req.params.codigo);

    //Valida se o código informado corresponde a um revendedor cadastrado
    if (!row) {
      res.statusCode = 400;
      res.send("Revendedor não existe");
      return;
    }

    const { Senha, ...item } = row;

    res.send(item);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

/* POST - Cadastra novo revendedor */

router.post("/revendedor", async function (req, res, next) {
  const revendedor = revendedorDAO.init(req.body);

  //Valida se os campos obrigatórios estão preenchidos  
  if (
    !revendedor.Email ||
    !revendedor.Senha ||
    !revendedor.CPF ||
    !revendedor.NomeCompleto
  ) {
    res.statusCode = 400;
    res.send("Verifique os dados enviados");
  }

  try {
    const [[resultItem]] = await revendedor.findByCPF(req.body.CPF);

    //Valida se o CPF informado já está cadastrado
    if (resultItem) {
      res.statusCode = 400;
      res.send("CPF Já cadastrado");
      return;
    }

    revendedor.Senha = md5(revendedor.Senha);
    revendedor.DataCriacao = new Date().toISOString().split("Z")[0];

    const result = await revendedor.create();

    const [[{ Senha, ...item }]] = await revendedor.findByCode(
      result[0].insertId
    );

    res.statusCode = 201;
    res.send(item);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});

/* POST - Efetua login do revendedor */

router.post("/revendedor/login", async function (req, res, next) {
  const revendedor = revendedorDAO.init(req.body);

    //Valida se os campos obrigatórios estão preenchidos  
  if (!revendedor.Email || !revendedor.Senha) {
    res.statusCode = 400;
    res.send("Os campos de email e senha são obrigatórios");
    return;
  }

  revendedor.Senha = md5(revendedor.Senha);

  try {
    const [[item]] = await revendedor.login(revendedor);

      //Valida se as informações correspondem a um revendedor cadastrado 
    if (!item) {
      res.statusCode = 401;
      res.send();
      return;
    }

    res.statusCode = 200;
    res.send();
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
});
module.exports = router;
