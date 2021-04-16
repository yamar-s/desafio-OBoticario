var dbConn = require("./../../config/db.config");

//Criação do objeto de revendedor

const revendedorDAO = {
  NomeCompleto: "",
  CPF: 0,
  Email: "",
  Codigo: 0,
  Senha: "",
  Genero: "",
  Celular: 0,
  Endereco: "",
  Bairro: "",
  UF: "",
  CEP: 0,
  Cidade: "",
  DataCriacao: new Date(),

  init: (revendedor) => {
    if (!revendedor) {
      return revendedorDAO;
    }
    revendedorDAO.NomeCompleto = revendedor.NomeCompleto;
    revendedorDAO.CPF = revendedor.CPF;
    revendedorDAO.Email = revendedor.Email;
    revendedorDAO.Codigo = revendedor.Codigo;
    revendedorDAO.Senha = revendedor.Senha;
    revendedorDAO.Genero = revendedor.Genero;
    revendedorDAO.Celular = revendedor.Celular;
    revendedorDAO.Endereco = revendedor.Endereco;
    revendedorDAO.Bairro = revendedor.Bairro;
    revendedorDAO.UF = revendedor.UF;
    revendedorDAO.CEP = revendedor.CEP;
    revendedorDAO.Cidade = revendedor.Cidade;
    revendedorDAO.DataCriacao = revendedor.DataCriacao;
    return revendedorDAO;
  },
  create: () => {
    return dbConn.query("INSERT INTO tblrevendedor set ?", revendedorDAO);
  },
  findByCode: async (Codigo) => {
    return await dbConn.query("SELECT * from tblrevendedor where ? ", {
      Codigo,
    });
  }, 
  findByCPF: async (CPF) => {
    return await dbConn.query("SELECT * from tblrevendedor where ? ", {
      CPF,
    });
  },
  login: async ({Email, Senha}) => {
    return await dbConn.query(
      "SELECT * from tblrevendedor where  `Email` = ? AND `Senha` = ?  ",
      [Email, Senha]
    );
  },
  findAll: async () => {
    return await dbConn.execute("SELECT * FROM tblrevendedor");
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
          return res;
        } else {
          return res;
        }
      }
    );
  },
  delete: (id, result) => {
    dbConn.query(
      "DELETE FROM tblrevendedor WHERE codigo = ?",
      [id],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          return res;
        } else {
          return res;
        }
      }
    );
  },
};
module.exports = revendedorDAO;
