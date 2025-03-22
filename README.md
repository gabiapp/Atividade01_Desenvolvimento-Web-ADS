# 💼 E-commerce - Banco de Dados & Backend Setup

## 📂 Sumário

- [Descrição](#descrição)
- [Criação do Banco de Dados](#criação-do-banco-de-dados)
- [Comandos para Manipulação de Dados](#comandos-para-manipulação-de-dados)
  - [Inserir Dados (POST)](#inserir-dados-post)
  - [Consultar Dados (GET)](#consultar-dados-get)
  - [Atualizar Dados (UPDATE)](#atualizar-dados-update)
  - [Deletar Dados (DELETE)](#deletar-dados-delete)
- [Configuração do Backend](#configuração-do-backend)
- [Observações](#observações)

---

## 📄 Descrição

Este projeto contém a estrutura inicial do banco de dados para um sistema de e-commerce, com tabelas de usuários e gêneros, além das instruções para configuração do backend em Node.js.

---

## 💄️ Criação do Banco de Dados

Execute os comandos abaixo no seu **MySQL** para criar o banco e as tabelas:

```sql
-- Criação do banco de dados
CREATE DATABASE ecommerce;

-- Criação da tabela de gêneros
CREATE TABLE tb_genero (
    id_genero INT AUTO_INCREMENT PRIMARY KEY,
    tx_descricao VARCHAR(100) NOT NULL
);

-- Inserção de dados na tabela de gêneros
INSERT INTO tb_genero (tx_descricao) VALUES ('Masculino'), ('Feminino'), ('Outro');

-- Criação da tabela de usuários
CREATE TABLE tb_usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    tx_nome VARCHAR(100) NOT NULL,
    tx_email VARCHAR(100) NOT NULL,
    dt_nascimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nr_telefone NUMERIC(20) NOT NULL,
    tx_cpf VARCHAR(100) UNIQUE NOT NULL,
    cd_genero INT NOT NULL,
    tx_senha VARCHAR(255) NOT NULL,
    FOREIGN KEY (cd_genero) REFERENCES tb_genero(id_genero)
);
```

---

## 📝 Comandos para Manipulação de Dados

### 📅 Inserir Dados (POST)

```sql
-- Inserir usuário Fernando
INSERT INTO tb_usuario
(tx_nome, tx_email, dt_nascimento, nr_telefone, tx_cpf, cd_genero, tx_senha)
VALUES
('Fernando', 'fernandofiorini@gmail.com', '1999-09-30', 49991567121, '10620961937', 1, '123456');

-- Inserir usuário Maria
INSERT INTO tb_usuario
(tx_nome, tx_email, dt_nascimento, nr_telefone, tx_cpf, cd_genero, tx_senha)
VALUES
('Maria', 'fer@gmail.com', '1999-09-30', '13218311', '1238112318', 1, '123');
```

---

### 📄 Consultar Dados (GET)

```sql
-- Selecionar todos os usuários
SELECT * FROM tb_usuario;
```

---

### ✏️ Atualizar Dados (UPDATE)

```sql
-- Atualizar nome e gênero do usuário com ID = 2
UPDATE tb_usuario
SET tx_nome = 'Natalia', cd_genero = 2
WHERE id_usuario = 2;
```

---

### 🗑️ Deletar Dados (DELETE)

```sql
-- Deletar usuário com ID = 2
DELETE FROM tb_usuario WHERE id_usuario = 2;
```

---

## 🚀 Configuração do Backend

Após a criação das tabelas e inserção dos dados, configure o backend:

1. Navegue até a pasta do backend:

```bash
cd backend
```

2. Instale as dependências necessárias:

```bash
npm install
```

3. Inicie o servidor:

```bash
node server.js
```

---

## ⚙️ Observações

- **Banco de Dados:** Certifique-se que o MySQL está ativo e o banco `ecommerce` foi criado corretamente.
- **Senhas:** O campo `tx_senha` suporta até 255 caracteres, ideal para armazenar senhas criptografadas (recomenda-se uso de bcrypt ou similar).
- **Backend:** O backend está preparado para interagir com o banco via API REST (GET, POST, PUT, DELETE).

---

