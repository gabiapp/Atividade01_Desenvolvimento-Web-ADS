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
  db.query("SELECT * FROM tb_usuario", (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(results);
  });
});

app.get("/adquirirUsuario/:id", (req, res) => {
  const userId = req.params.id;

  db.query("SELECT * FROM tb_usuario WHERE id_usuario = ?", [userId], (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário:", err);
      return res.status(500).json({ error: "Erro ao buscar usuário", details: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(results[0]);
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

// PUT
app.put("/atualizarUsuario/:id", (req, res) => {
  const { nome, email, dataNascimento, telefone, cpf, genero } = req.body;
  const userId = req.params.id;

  db.query(
    "UPDATE tb_usuario SET tx_nome = ?, tx_email = ?, dt_nascimento = ?, nr_telefone = ?, tx_cpf = ?, cd_genero = ? WHERE id_usuario = ?", 
    [nome, email, dataNascimento, telefone, cpf, genero, userId], 
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar usuário:", err);
        return res.status(500).json({ error: "Erro ao atualizar usuário", details: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json({ 
        message: "Usuário atualizado com sucesso", 
        affectedRows: results.affectedRows 
      });
    }
  );
});

// DELETE
app.delete("/excluirUsuario/:id", (req, res) => {
  db.query("DELETE FROM tb_usuario WHERE id_usuario = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item deletado" });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


// Rota de login
app.post("/login", (req, res) => {
  const { cpf, senha } = req.body;

  // Consulta segura para verificar credenciais
  db.query("SELECT * FROM tb_usuario WHERE tx_cpf = ? AND tx_senha = ?", [cpf, senha], (err, results) => {
    if (err) {
      console.error("Erro na verificação de login:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (results.length > 0) {
      const usuario = results[0];
      delete usuario.tx_senha;
      return res.json({ 
        message: "Login bem-sucedido", 
        usuario: usuario 
      });
    } else {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
  });
});
