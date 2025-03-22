//Comandos para criação da base. 
create database ecommerce;

create table tb_genero (
	id_genero INT AUTO_INCREMENT PRIMARY KEY,
	tx_descricao VARCHAR(100) not NULL
);

INSERT INTO tb_genero (tx_descricao) VALUES ('Masculino'), ('Feminino'), ('Outro');


CREATE TABLE tb_usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    tx_nome VARCHAR(100) NOT NULL,
    tx_email VARCHAR(100) NOT NULL,
    dt_nascimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nr_telefone NUMERIC(20) NOT NULL,
    tx_cpf VARCHAR(100) UNIQUE NOT NULL,
    cd_genero INT not null,
    tx_senha VARCHAR(255) NOT NULL,
   	FOREIGN KEY (cd_genero) REFERENCES tb_genero(id_genero)
);

--------------------------------------------------------------------------------------------
Após criar as tabelas no MySQL ir na pasta backend e rodar o comando npm install no terminal.
Depois rodar o comando node server.js 



//Comandos para verificação
#@GET
#PEGUE TUDO DA TABELA USUARIO
select * from tb_usuario tu ;

#@POST
#inserir na tabela de usuario
INSERT INTO tb_usuario
( tx_nome, tx_email, dt_nascimento, nr_telefone, tx_cpf, cd_genero, tx_senha) #nas colunas
VALUES('Fernando', 'fernandofiorini@gmail.com', '1999-09-30', 49991567121, '10620961937', 1, '123456'); #os valores


insert
	into
	tb_usuario( tx_nome,
	tx_email,
	dt_nascimento,
	nr_telefone,
	tx_cpf,
	cd_genero,
	tx_senha)
	nas colunas VALUES('Maria', 'fer@gmail.com', '1999-09-30', '13218311', '1238112318', 1, '123');

#@DELETE
#Deletar da tabela usuario com base no id
delete from tb_usuario where id_usuario = 2;

#@UPDATE
#atualizar tb_usuario com nome e genero quando o id = 2
update tb_usuario set tx_nome = 'Natalia', cd_genero = 2 where id_usuario = 2;