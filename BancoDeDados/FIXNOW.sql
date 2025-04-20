-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: fixnow
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `maquinas`
--

DROP TABLE IF EXISTS `maquinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maquinas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `temperatura` float DEFAULT NULL,
  `status_maquina` tinyint DEFAULT NULL,
  `tempo` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maquinas`
--

LOCK TABLES `maquinas` WRITE;
/*!40000 ALTER TABLE `maquinas` DISABLE KEYS */;
INSERT INTO `maquinas` VALUES (1,'Citizen L20',NULL,NULL,NULL),(2,'DMG Mori CMX 1100V',NULL,NULL,NULL);
/*!40000 ALTER TABLE `maquinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitacao`
--

DROP TABLE IF EXISTS `solicitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomesolicitante` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `urgencia` varchar(100) NOT NULL,
  `idmaquina` varchar(2) DEFAULT NULL,
  `departamento` varchar(100) NOT NULL,
  `dataSolicitacao` date NOT NULL,
  `descricao` text NOT NULL,
  `statussolicitacao` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitacao`
--

LOCK TABLES `solicitacao` WRITE;
/*!40000 ALTER TABLE `solicitacao` DISABLE KEYS */;
INSERT INTO `solicitacao` VALUES (1,'teste2','Infraestrutura','Media','','asdasd','2151-02-20','dsadasd','emandamento'),(2,'teste3','Mobiliario','Media','','asdasd','2151-02-20','dsadasd','emandamento'),(3,'teste4','Industrial','Alta','1','Usinagem','2025-04-20','Teste 4 de banco de dados','emandamento'),(4,'teste 6','Infraestrutura','Alta','','asdasd','1551-02-21','sdasdasd','emandamento'),(5,'teste 7','Infraestrutura','Media','','Compras','4454-02-20','asdasdasd','emandamento'),(6,'teste 7','Infraestrutura','Media','','Compras','4454-02-20','asdasdasd','emandamento'),(7,'Guilherme','Industrial','Media','2','Compras','1515-02-20','macaco','emandamento'),(8,'123','Infraestrutura','Media','','123','0123-03-12','123123','emandamento'),(9,'asdasd','Mobiliario','Baixa','','asdasdad','1555-12-12','asdasdasd','emandamento'),(10,'Guilherme','Infraestrutura','Media','','asd','2131-03-12','asdasd','emandamento');
/*!40000 ALTER TABLE `solicitacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'fixnow'
--

--
-- Dumping routines for database 'fixnow'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-20 17:47:30
