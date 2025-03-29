require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const cors = require("cors"); // Certifique-se de que isso está incluído

const app = express();
app.use(express.json());

// Configuração explícita do CORS
app.use(cors({
    origin: "http://127.0.0.1:5500", // Permite especificamente essa origem
    methods: ["GET", "POST"],        // Métodos permitidos
    allowedHeaders: ["Content-Type"] // Cabeçalhos permitidos
}));

app.use(express.static("."));

// Função para criar o pool de conexão
async function connect() {
    if (global.connection) return global.connection.connect();

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING,
        ssl: { rejectUnauthorized: false },
    });

    try {
        const client = await pool.connect();
        console.log("Criou o pool de conexão");
        const res = await client.query("SELECT NOW()");
        console.log("Teste de conexão:", res.rows[0]);
        client.release();
        global.connection = pool;
        return pool.connect();
    } catch (err) {
        console.error("Erro ao conectar ao banco:", err.message);
        throw err;
    }
}

// Rota para salvar dados pessoais
app.post("/api/dados-pessoais", async (req, res) => {
    console.log("Recebendo requisição:", req.body);
    const { nome, sobrenome, data_nascimento, cpf, usuario } = req.body;

    if (!nome || !sobrenome || !data_nascimento || !cpf || !usuario) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const client = await connect();
        const query = `
            INSERT INTO schema1.dados_pessoais (nome, sobrenome, data_nascimento, cpf, usuario)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [nome, sobrenome, data_nascimento, cpf, usuario];
        console.log("Executando query com valores:", values);
        const result = await client.query(query, values);
        console.log("Resultado da query:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Erro ao salvar dados pessoais:", err.message, err.stack);
        res.status(500).json({ error: "Erro ao salvar dados pessoais: " + err.message });
    }
});

// Rota para salvar contato
app.post("/api/contato", async (req, res) => {
    console.log("Recebendo requisição:", req.body);
    const { login, email, telefone, redes_sociais } = req.body;

    if (!login || !email || !telefone || !redes_sociais) {
        console.error("Erro: Campos obrigatórios faltando!", req.body);
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const client = await connect();
        const query = `
            INSERT INTO schema1.contato (login, email, telefone, redes_sociais)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [login, email, telefone, redes_sociais];

        console.log("Executando query com valores:", values);
        const result = await client.query(query, values);

        console.log("Resultado da query:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Erro ao salvar contato:", err);
        res.status(500).json({ error: "Erro ao salvar contato: " + err.message });
    }
});

// Rota para salvar salário
app.post("/api/salario", async (req, res) => {
    console.log("Recebendo requisição:", req.body);
    const { login, transacao } = req.body;

    if (!login || !transacao ) {
        console.error("Erro: Campos obrigatórios faltando!", req.body);
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        const client = await connect();
        const query = `
            INSERT INTO schema1.salario (login, transacao)
            VALUES ($1, $2) RETURNING *`;
        const values = [login, transacao];

        console.log("Executando query com valores:", values);
        const result = await client.query(query, values);

        console.log("Resultado da query:", result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Erro ao salvar transacao:", err);
        res.status(500).json({ error: "Erro ao salvar contato: " + err.message });
    }
});


// Rota para servir o HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Sistema rodando na porta ${port}...`);
});