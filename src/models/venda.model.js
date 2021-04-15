var dbConn = require("./../../config/db.config");

//Criação do objeto de Venda

const vendaDAO = {
  CodigoRevendedor: 0,
  Valor: 0.0,
  Status: "EmValidacao",
  Data: "",
  CPF: 0,
  ValorCashBack: 0.0,
  PorcentagemCashBack: 0.0,
  Id: "",

  init: (venda) => {
    if (!venda) {
      return vendaDAO;
    }
    vendaDAO.Id = venda.Id;
    vendaDAO.CodigoRevendedor = venda.CodigoRevendedor;
    vendaDAO.Valor = venda.Valor;
    vendaDAO.Status = venda.Status ? venda.Status : "EmValidacao";
    vendaDAO.Data = venda.Data;
    vendaDAO.CPF = venda.CPF;
    vendaDAO.ValorCashBack = venda.ValorCashBack;
    vendaDAO.PorcentagemCashBack = venda.PorcentagemCashBack;
    return vendaDAO;
  },
  // create: () => {
  //   var query = dbConn.query(
  //     "INSERT INTO tblvenda set ?",
  //     vendaDAO,
  //     function (err, res) {
  //       if (err) {
  //         console.log("error: ", err);
  //         throw err;
  //       }
  //     },
  //     console.log(query.sql)
  //   );
  // },
  create: (newVenda) => {
    return dbConn.query("INSERT INTO tblvenda set ?", newVenda);
  },
  findById: (Id) => {
    return dbConn.query("Select * from tblvenda where ? ", { Id });
  },
  findAll: () => {
    return dbConn.execute("SELECT * FROM tblvenda");
  },
  update: (Id, newVenda) => {
    return dbConn.query(`UPDATE tblvenda SET ? Where Id = ${Id}`, newVenda);
  },
  delete: async (Id) => {
   return await dbConn.query(`DELETE FROM tblvenda Where Id = ${Id}`);
  },
};

module.exports = vendaDAO;
