CREATE TABLE `tblvenda` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CodigoRevendedor` int NOT NULL DEFAULT '0',
  `Valor` double(20,2) NOT NULL DEFAULT '0.00',
  `Status` enum('EmValidacao','Aprovado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'EmValidacao',
  `Data` datetime NOT NULL DEFAULT '1901-01-01 00:00:00',
  `CPF` bigint NOT NULL,
  `ValorCashBack` double(20,2) NOT NULL DEFAULT '0.00',
  `PorcentagemCashBack` decimal(4,2) NOT NULL DEFAULT '0.00',
  KEY `Id` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8;

CREATE TABLE `tblrevendedor` (
  `NomeCompleto` varchar(255) NOT NULL DEFAULT '',
  `CPF` bigint NOT NULL DEFAULT '0',
  `Email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `Codigo` int NOT NULL AUTO_INCREMENT,
  `Senha` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `Genero` enum('M','F') DEFAULT 'F',
  `Celular` bigint NOT NULL DEFAULT '0',
  `Endereco` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `Bairro` varbinary(50) DEFAULT '',
  `UF` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `CEP` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `Cidade` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `DataCriacao` datetime NOT NULL DEFAULT '1901-01-01 00:00:00',
  UNIQUE KEY `UNIQUE` (`CPF`,`Codigo`),
  KEY `Codigo` (`Codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;