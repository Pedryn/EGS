const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar o body-parser para tratar dados JSON
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'egs'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota para inserir um produto
app.post('/api/produtos', (req, res) => {
    const { nomeProd, descricao, preco, dimensoes, certificacoes, materiais, fabricante } = req.body;
    const sql = 'INSERT INTO Produto (nomeProd, descricao, preco, dimensao, certificacoes, materiais, fabricante) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [nomeProd, descricao, preco, dimensoes, certificacoes, materiais, fabricante];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
