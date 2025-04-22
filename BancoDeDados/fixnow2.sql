CREATE DATABASE fixnow;
USE fixnow;

CREATE TABLE maquina (
  id_maquina int null AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  tempo_de_funcionamento datetime DEFAULT NULL,
  status enum('ativo','inativo','Em manutencao') DEFAULT NULL,
  PRIMARY KEY (`id_maquina`)
);

INSERT INTO maquina (nome, status) values ("Citizen L20", "ativo");
CREATE TABLE registro (
  id_registro int NOT NULL AUTO_INCREMENT,
  id_maquina int NOT NULL,
  data_hora datetime NOT NULL,
  PRIMARY KEY (id_registro),
  FOREIGN KEY (id_maquina) REFERENCES maquina (id_maquina)
);

CREATE TABLE solicitacao (
  id_solicitacao int NOT NULL AUTO_INCREMENT,
  nome varchar(100),
  tipo enum('Informatica','Infraestrutura','Mobiliario','Industrial') DEFAULT NULL,
  urgencia enum('Alta','Média','Baixa') DEFAULT NULL,
  descricao text NOT NULL,
  id_maquina int, 
  departamento varchar(60) NOT NULL,
  data date not null,
  status_solicitacao enum('Em andamento','Concluido','Em avaliacao') DEFAULT NULL,
  PRIMARY KEY (`id_solicitacao`),
  FOREIGN KEY (id_maquina) REFERENCES maquina (id_maquina)
);


CREATE TABLE usuario (
  id_usuario int NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  senha varchar(10) NOT NULL,
  tipo_usuario enum('Administrador','Colaborador','Manutencao') DEFAULT NULL,
  PRIMARY KEY (id_usuario)
);