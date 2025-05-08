CREATE DATABASE  IF NOT EXISTS `fixnow` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fixnow`;
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
-- Table structure for table `maquina`
--

DROP TABLE IF EXISTS `maquina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maquina` (
  `id_maquina` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `tempo_de_funcionamento` datetime DEFAULT NULL,
  `status` enum('ativo','inativo','Em manutencao') DEFAULT NULL,
  PRIMARY KEY (`id_maquina`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maquina`
--

LOCK TABLES `maquina` WRITE;
/*!40000 ALTER TABLE `maquina` DISABLE KEYS */;
INSERT INTO `maquina` VALUES (1,'Citizen L20',NULL,NULL),(2,'DMG Mori CMX 1100V',NULL,NULL);
/*!40000 ALTER TABLE `maquina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro` (
  `id_registro` int NOT NULL AUTO_INCREMENT,
  `id_maquina` int NOT NULL,
  `data_hora` datetime NOT NULL,
  PRIMARY KEY (`id_registro`),
  KEY `id_maquina` (`id_maquina`),
  CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id_maquina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro`
--

LOCK TABLES `registro` WRITE;
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitacao`
--

DROP TABLE IF EXISTS `solicitacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitacao` (
  `id_solicitacao` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `tipo` enum('Informatica','Infraestrutura','Mobiliario','Industrial') DEFAULT NULL,
  `urgencia` enum('Alta','Média','Baixa') DEFAULT NULL,
  `descricao` text NOT NULL,
  `id_maquina` int DEFAULT NULL,
  `departamento` varchar(60) NOT NULL,
  `data` date NOT NULL,
  `status_solicitacao` enum('Em andamento','Concluido','Em avaliacao') DEFAULT NULL,
  `nome_responsavel` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_solicitacao`),
  KEY `id_maquina` (`id_maquina`),
  CONSTRAINT `solicitacao_ibfk_1` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id_maquina`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitacao`
--

LOCK TABLES `solicitacao` WRITE;
/*!40000 ALTER TABLE `solicitacao` DISABLE KEYS */;
INSERT INTO `solicitacao` VALUES (1,'Guilherme Soares','Infraestrutura','Média','O ar quebrou.',NULL,'Montagem','2025-04-22','Em avaliacao',NULL),(2,'Henrique Linhares','Industrial','Alta','A maquina não está rodando o programa.',1,'Usinagem','2025-04-22','Em avaliacao',NULL),(3,'Guilherme dos Anjos','Mobiliario','Baixa','Uma cadeira quebrou.',NULL,'Recebimento','2025-04-22','Em avaliacao',NULL),(4,'Adryan Motta','Informatica','Alta','Meu pc não liga.',NULL,'T.I','2025-04-22','Em andamento','Henrique Linhares'),(5,'Joao Colleto','Infraestrutura','Média','A parede apresenta mofo.',NULL,'Expedição','2025-04-22','Em avaliacao',''),(6,'Guilherme Soares','Mobiliario','Baixa','Uma cadeira quebrou.',NULL,' Montagem','2025-04-23','Em avaliacao',NULL),(7,'Henrique Linhares','Infraestrutura','Média','A mesa está bamba.',NULL,'Compras','2025-04-20','Em avaliacao',NULL),(8,'Henrique Linhares','Industrial','Média','A maquina não está ligando.',1,'Usinagem','2025-04-23','Em avaliacao',''),(9,'Edgar Costa','Infraestrutura','Média','O computador não liga.',NULL,'T.I','2025-04-24','Em avaliacao',NULL),(10,'Edgar Costa','Infraestrutura','Média','O monitor não liga.',NULL,'T.I','2025-04-25','Em avaliacao',NULL),(11,'Pedro Nobukuni','Mobiliario','Alta','O pé da mesa quebrou.',NULL,'Financeiro','2025-04-25','Em avaliacao',''),(12,'Guilherme Soares','Industrial','Baixa','O carro 2 da Maquina quebrou.',2,'Usinagem','2025-04-25','Em avaliacao',NULL),(13,'André Roberto','Industrial','Alta','A maquina está com problemas no carro 1.',2,'Usinagem','2025-04-26','Em avaliacao',NULL),(14,'Guilherme Soares','Informatica','Alta','A impressora está fazendo barulhos incomuns.',NULL,'Controle da Qualidade','2025-04-26','Em avaliacao',NULL),(15,'Adriano Alvares','Industrial','Alta','O teclado da maquina está com problema.',2,'Usinagem','2025-04-27','Em avaliacao',NULL),(16,'Rui Costa','Industrial','Média','A maquina não liga.',1,'Usinagem','2025-04-27','Em avaliacao',''),(17,'Guilherme dos Anjos','Industrial','Alta','A maquina não está rodando o programa.',1,'Usinagem','2025-04-27','Em avaliacao',NULL),(18,'Andre','Industrial','Alta','quebrou',1,'Usinagem','2025-04-29','Em avaliacao',NULL),(19,'Rafael','Informatica','Média','Quebrou.',NULL,'Compras','2025-05-06','Em avaliacao',NULL),(20,'Volkswagen','Informatica','Média','aposdkas\n',NULL,'Montagem','2025-05-23','Em avaliacao',''),(21,'Cleiton','Informatica','Alta','O computador não liga.',NULL,'Recebimento','2025-05-08','Em avaliacao',NULL);
/*!40000 ALTER TABLE `solicitacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(10) NOT NULL,
  `tipo_usuario` enum('Administrador','Colaborador','Manutencao') DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Guilherme Soares da Silva','guihhsoaress@gmail.com','admin','Administrador'),(2,'Henrique Linhares','hlinhares@gmail.com','admin','Administrador'),(3,'Guilherme Dos Anjos','dosanjosguilherme88@gmail.com','admin','Colaborador'),(5,'Colaborador','colaborador@gmail.com','admin','Colaborador'),(6,'Admin','admin@gmail.com','admin','Administrador'),(7,'Manutencao','manutencao@gmail.com','admin','Manutencao'),(8,'Cleiton rasta','cleiton@gmail.com','admin','Manutencao');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
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

-- Dump completed on 2025-05-08 16:08:32
