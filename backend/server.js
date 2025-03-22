require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Configuração da porta de execução do servidor Node
const PORT = 3000;

// Configuracao do servidor node
app.use(cors());
app.use(bodyParser.json());

// Criando o objeto de conexao
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Conectando com o banco de dados
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL");
});


/// Cadastro de usuarios

// GET
app.get("/listarUsuarios", (req, res) => {
  db.query("select * from tb_usuario", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

//POST
app.post("/gravarNovoUsuario", (req, res) => {

  const { nome, email, dataNascimento, telefone, cpf, genero, senha } = req.body;
  db.query("INSERT INTO tb_usuario( tx_nome, tx_email, dt_nascimento, nr_telefone, tx_cpf, cd_genero, tx_senha) VALUES(?, ?, ?, ?, ?, ?, ?);", [nome, email, dataNascimento, telefone, cpf, genero, senha], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item adicionado", id: results.insertId });
  });
});

// DELETE
app.delete("/excluirUsuario/:id", (req, res) => {
  db.query("DELETE FROM items WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item deletado" });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
