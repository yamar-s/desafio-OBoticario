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
  create: () => {
    return dbConn.query("INSERT INTO tblvenda set ?", vendaDAO);
  },
  findById: (Id) => {
    return dbConn.query("Select * from tblvenda where ? ", { Id });
  },
  findAll: () => {
    return dbConn.execute("SELECT * FROM tblvenda");
  },
  update: (codigo, revendedor, result) => {
    dbConn.query(
      "UPDATE tblrevendedor SET NomeCompleto=?,CPF=?,Email=?,Codigo=?,Senha=?,Genero=?,Celular=?,Endereco=?,Bairro=?,UF=?,CEP=?,Cidade=? WHERE CPF = ?",
      [
        revendedor.NomeCompleto,
        revendedor.CPF,
        revendedor.Email,
        revendedor.Codigo,
        revendedor.Senha,
        revendedor.Genero,
        revendedor.Celular,
        revendedor.Endereco,
        revendedor.Bairro,
        revendedor.UF,
        revendedor.CEP,
        revendedor.Cidade,
        codigo,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  },
  delete: (id, result) => {
    dbConn.query(
      "DELETE FROM tblvenda WHERE codigo = ?",
      [id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  },
};

module.exports = vendaDAO;
