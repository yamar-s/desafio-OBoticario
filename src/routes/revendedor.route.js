var express = require("express");
var router = express.Router();
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


module.exports = router;
