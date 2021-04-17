/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 8.0.23 : Database - oboticario
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`oboticario` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `oboticario`;

/*Table structure for table `tblrevendedor` */

DROP TABLE IF EXISTS `tblrevendedor`;

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

/*Table structure for table `tblrevendedor_hist` */

DROP TABLE IF EXISTS `tblrevendedor_hist`;

CREATE TABLE `tblrevendedor_hist` (
  `tracking_id` int NOT NULL AUTO_INCREMENT,
  `NomeCompleto` varchar(255) DEFAULT NULL,
  `CPF` bigint DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Codigo` int DEFAULT NULL,
  `Senha` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `Genero` enum('M','F') DEFAULT 'F',
  `Celular` bigint DEFAULT NULL,
  `Endereco` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Bairro` varchar(50) DEFAULT NULL,
  `UF` char(2) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `CEP` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Cidade` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `DataCriacao` datetime DEFAULT '1901-01-01 00:00:00',
  `actionhist` enum('U','D') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'U',
  `datetimehist` datetime NOT NULL DEFAULT '1901-01-01 00:00:00',
  KEY `tracking_id` (`tracking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Table structure for table `tblvenda` */

DROP TABLE IF EXISTS `tblvenda`;

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

/*Table structure for table `tblvenda_hist` */

DROP TABLE IF EXISTS `tblvenda_hist`;

CREATE TABLE `tblvenda_hist` (
  `tracking_id` int NOT NULL AUTO_INCREMENT,
  `Id` int DEFAULT NULL,
  `CodigoRevendedor` int DEFAULT NULL,
  `Valor` double(20,2) DEFAULT NULL,
  `Status` enum('EmValidacao','Aprovado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Data` datetime DEFAULT NULL,
  `CPF` bigint DEFAULT NULL,
  `ValorCashBack` double(20,2) DEFAULT NULL,
  `PorcentagemCashBack` decimal(4,2) DEFAULT NULL,
  `actionhist` enum('U','D') DEFAULT 'U',
  `datetimehist` datetime NOT NULL DEFAULT '1901-01-01 00:00:00',
  KEY `tracking_id` (`tracking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8;

/* Trigger structure for table `tblrevendedor` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `tblrevendedor_update_data` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `tblrevendedor_update_data` BEFORE UPDATE ON `tblrevendedor` FOR EACH ROW BEGIN
INSERT INTO tblrevendedor_hist (`NomeCompleto`, 
	`CPF`, 
	`Email`, 
	`Codigo`, 
	`Senha`, 
	`Genero`, 
	`Celular`, 
	`Endereco`, 
	`Bairro`, 
	`UF`, 
	`CEP`, 
	`Cidade`, 
	`DataCriacao`, `actionhist`, `datetimehist`) VALUES (OLD.NomeCompleto, 
	OLD.CPF, 
	OLD.Email, 
	OLD.Codigo, 
	OLD.Senha, 
	OLD.Genero, 
	OLD.Celular, 
	OLD.Endereco, 
	OLD.Bairro, 
	OLD.UF, 	
	OLD.CEP, 
	OLD.Cidade, 
	OLD.DataCriacao, 'U', NOW());
END */$$


DELIMITER ;

/* Trigger structure for table `tblrevendedor` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `tblrevendedor_delete_data` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `tblrevendedor_delete_data` BEFORE DELETE ON `tblrevendedor` FOR EACH ROW BEGIN
INSERT INTO tblrevendedor_hist (`NomeCompleto`, 
	`CPF`, 
	`Email`, 
	`Codigo`, 
	`Senha`, 
	`Genero`, 
	`Celular`, 
	`Endereco`, 
	`Bairro`, 
	`UF`, 
	`CEP`, 
	`Cidade`, 
	`DataCriacao`, `actionhist`, `datetimehist`) VALUES (OLD.NomeCompleto, 
	OLD.CPF, 
	OLD.Email, 
	OLD.Codigo, 
	OLD.Senha, 
	OLD.Genero, 
	OLD.Celular, 
	OLD.Endereco, 
	OLD.Bairro, 
	OLD.UF, 	
	OLD.CEP, 
	OLD.Cidade, 
	OLD.DataCriacao, 'D', NOW());
END */$$


DELIMITER ;

/* Trigger structure for table `tblvenda` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `tblvenda_update_data` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `tblvenda_update_data` BEFORE UPDATE ON `tblvenda` FOR EACH ROW BEGIN
INSERT INTO tblvenda_hist (Id, CodigoRevendedor, Valor, Status, Data, CPF, ValorCashBack, PorcentagemCashBack, actionhist, datetimehist) VALUES (OLD.Id, OLD.CodigoRevendedor, OLD.Valor, OLD.STATUS, OLD.DATA, OLD.CPF, OLD.ValorCashBack, OLD.PorcentagemCashBack, 'U', NOW());
END */$$


DELIMITER ;

/* Trigger structure for table `tblvenda` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `tblvenda_delete_data` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `tblvenda_delete_data` BEFORE DELETE ON `tblvenda` FOR EACH ROW BEGIN
INSERT INTO tblvenda_hist (Id, CodigoRevendedor, Valor, STATUS, DATA, CPF, ValorCashBack, PorcentagemCashBack, actionhist, datetimehist) VALUES (OLD.Id, OLD.CodigoRevendedor, OLD.Valor, OLD.STATUS, OLD.DATA, OLD.CPF, OLD.ValorCashBack, OLD.PorcentagemCashBack, 'D', NOW());
END */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
