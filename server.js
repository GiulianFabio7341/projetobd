require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

// Configuração explícita do CORS
app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.static("."));

// Função conexão com o banco PostgreSQL
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

// Conexão com o banco Firebase
try {
    const serviceAccount = require("./serviceAccountKey.json");
    console.log("Service Account carregado com sucesso");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} catch (err) {
    console.error("Erro ao carregar serviceAccountKey.json:", err.message);
    process.exit(1);
}

const db = admin.firestore();

// Rota para salvar dados pessoais
app.post("/api/dados-pessoais", async (req, res) => {
    const { nome, sobrenome, data_nascimento, cpf, usuario } = req.body;
    let client;

    if (!nome || !sobrenome || !data_nascimento || !cpf || !usuario) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const postgresResult = await client.query(`
            INSERT INTO schema1.dados_pessoais (nome, sobrenome, data_nascimento, cpf, usuario) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `, [nome, sobrenome, data_nascimento, cpf, usuario]);

        await db.collection("usuarios").doc(usuario).collection("dados_pessoais").doc(usuario).set({
            primeiro_nome: nome,
            sobrenome: sobrenome,
            data_nascimento: data_nascimento,
            cpf: cpf
        });

        await client.query("COMMIT");
        res.status(201).json({ postgres: postgresResult.rows[0], firebase: "Dados salvos no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao criar dados pessoais:", err);
        res.status(500).json({ error: "Erro ao criar dados pessoais: " + err.message });
    }
});

// Rota para atualizar dados pessoais
app.put("/api/dados-pessoais", async (req, res) => {
    console.log("Recebendo requisição de atualização:", req.body);
    const { nome, sobrenome, data_nascimento, cpf, usuario } = req.body;
    let client;

    if (!nome || !sobrenome || !data_nascimento || !cpf || !usuario) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const query = `
            UPDATE schema1.dados_pessoais
            SET nome = $1, sobrenome = $2, data_nascimento = $3, cpf = $4
            WHERE usuario = $5
            RETURNING *`;
        const values = [nome, sobrenome, data_nascimento, cpf, usuario];
        console.log("Executando query de atualização com valores:", values);
        const postgresResult = await client.query(query, values);
        console.log("Resultado da query de atualização:", postgresResult.rows[0]);

        await db.collection("usuarios").doc(usuario).collection("dados_pessoais").doc(usuario).update({
            primeiro_nome: nome,
            sobrenome: sobrenome,
            data_nascimento: data_nascimento,
            cpf: cpf
        });

        await client.query("COMMIT");
        res.status(200).json({ postgres: postgresResult.rows[0], firebase: "Dados atualizados no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao atualizar dados pessoais:", err.message, err.stack);
        res.status(500).json({ error: "Erro ao atualizar dados pessoais: " + err.message });
    }
});

// Rota para apagar dados pessoais
app.delete("/api/dados-pessoais/:usuario", async (req, res) => {
    const usuario = req.params.usuario;
    let client;

    if (!usuario) {
        return res.status(400).json({ error: "O campo 'usuario' é obrigatório" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const query = `
            DELETE FROM schema1.dados_pessoais
            WHERE usuario = $1
            RETURNING *`;
        const values = [usuario];
        const postgresResult = await client.query(query, values);

        if (postgresResult.rowCount === 0) {
            await client.query("ROLLBACK");
            client.release();
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        await db.collection("usuarios").doc(usuario).collection("dados_pessoais").doc(usuario).delete();

        await client.query("COMMIT");
        res.status(200).json({ message: "Dados pessoais apagados com sucesso", postgres: postgresResult.rows[0], firebase: "Dados apagados no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao apagar dados pessoais:", err);
        res.status(500).json({ error: "Erro ao apagar dados pessoais: " + err.message });
    }
});

// Rota para salvar contato
app.post("/api/contato", async (req, res) => {
    console.log("Recebendo requisição:", req.body);
    const { login, email, telefone, redes_sociais } = req.body;
    let client;

    if (!login || !email || !telefone || !redes_sociais) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const query = `
            INSERT INTO schema1.contato (login, email, telefone, redes_sociais)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [login, email, telefone, redes_sociais];
        const postgresResult = await client.query(query, values);

        await db.collection("usuarios").doc(login).collection("contato").doc(login).set({
            email: email,
            telefone: telefone,
            redes_sociais: redes_sociais
        });

        await client.query("COMMIT");
        res.status(201).json({ postgres: postgresResult.rows[0], firebase: "Contato salvo no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao salvar contato:", err);
        res.status(500).json({ error: "Erro ao salvar contato: " + err.message });
    }
});

// Rota para atualizar contato
app.put("/api/contato", async (req, res) => {
    console.log("Recebendo requisição de atualização de contato:", req.body);
    const { login, email, telefone, redes_sociais } = req.body;
    let client;

    if (!login || !email || !telefone || !redes_sociais) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const query = `
            UPDATE schema1.contato
            SET email = $2, telefone = $3, redes_sociais = $4
            WHERE login = $1
            RETURNING *`;
        const values = [login, email, telefone, redes_sociais];
        const postgresResult = await client.query(query, values);

        await db.collection("usuarios").doc(login).collection("contato").doc(login).update({
            email: email,
            telefone: telefone,
            redes_sociais: redes_sociais
        });

        await client.query("COMMIT");
        res.status(200).json({ postgres: postgresResult.rows[0], firebase: "Contato atualizado no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao atualizar contato:", err);
        res.status(500).json({ error: "Erro ao atualizar contato: " + err.message });
    }
});

// Rota para apagar contato
app.delete("/api/contato/:login", async (req, res) => {
    const login = req.params.login;
    let client;

    if (!login) {
        return res.status(400).json({ error: "O campo 'login' é obrigatório" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const query = `
            DELETE FROM schema1.contato
            WHERE login = $1
            RETURNING *`;
        const values = [login];
        const postgresResult = await client.query(query, values);

        if (postgresResult.rowCount === 0) {
            await client.query("ROLLBACK");
            client.release();
            return res.status(404).json({ error: "Contato não encontrado" });
        }

        await db.collection("usuarios").doc(login).collection("contato").doc(login).delete();

        await client.query("COMMIT");
        res.status(200).json({ message: "Contato apagado com sucesso", postgres: postgresResult.rows[0], firebase: "Contato apagado no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao apagar contato:", err);
        res.status(500).json({ error: "Erro ao apagar contato: " + err.message });
    }
});

// Rota para salvar salário
app.post("/api/salario", async (req, res) => {
    console.log("Recebendo requisição:", req.body);
    const { login, transacao } = req.body;
    let client;

    if (!login || !transacao) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const query = `
            INSERT INTO schema1.salario (login, transacao)
            VALUES ($1, $2) RETURNING *`;
        const values = [login, transacao];
        const postgresResult = await client.query(query, values);

        await db.collection("usuarios").doc(login).collection("salario").doc(login).set({
            transacao: transacao
        });

        await client.query("COMMIT");
        res.status(201).json({ postgres: postgresResult.rows[0], firebase: "Salário salvo no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao salvar transacao:", err);
        res.status(500).json({ error: "Erro ao salvar transacao: " + err.message });
    }
});

// Rota para atualizar salário
app.put("/api/salario", async (req, res) => {
    console.log("Recebendo requisição de atualização de salário:", req.body);
    const { login, transacao } = req.body;
    let client;

    if (!login || !transacao) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const query = `
            UPDATE schema1.salario
            SET transacao = $2
            WHERE login = $1
            RETURNING *`;
        const values = [login, transacao];
        const postgresResult = await client.query(query, values);

        await db.collection("usuarios").doc(login).collection("salario").doc(login).update({
            transacao: transacao
        });

        await client.query("COMMIT");
        res.status(200).json({ postgres: postgresResult.rows[0], firebase: "Salário atualizado no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao atualizar salário:", err);
        res.status(500).json({ error: "Erro ao atualizar salário: " + err.message });
    }
});

// Rota para apagar salário
app.delete("/api/salario/:login", async (req, res) => {
    const login = req.params.login;
    let client;

    if (!login) {
        return res.status(400).json({ error: "O campo 'login' é obrigatório" });
    }

    try {
        client = await connect();
        await client.query("BEGIN");

        const query = `
            DELETE FROM schema1.salario
            WHERE login = $1
            RETURNING *`;
        const values = [login];
        const postgresResult = await client.query(query, values);

        if (postgresResult.rowCount === 0) {
            await client.query("ROLLBACK");
            client.release();
            return res.status(404).json({ error: "Salário não encontrado" });
        }

        await db.collection("usuarios").doc(login).collection("salario").doc(login).delete();

        await client.query("COMMIT");
        res.status(200).json({ message: "Salário apagado com sucesso", postgres: postgresResult.rows[0], firebase: "Salário apagado no Firestore" });
    } catch (err) {
        if (client) {
            await client.query("ROLLBACK");
            client.release();
        }
        console.error("Erro ao apagar salário:", err);
        res.status(500).json({ error: "Erro ao apagar salário: " + err.message });
    }
});

// Rota para buscar todos os dados pessoais
app.get("/api/dados-pessoais", async (req, res) => {
    let client;
    try {
        client = await connect();
        const query = "SELECT * FROM schema1.dados_pessoais";
        const result = await client.query(query);
        client.release();
        res.status(200).json(result.rows);
    } catch (err) {
        if (client) client.release();
        console.error("Erro ao buscar dados pessoais:", err);
        res.status(500).json({ error: "Erro ao buscar dados pessoais: " + err.message });
    }
});

// Rota para buscar todos os contatos
app.get("/api/contato", async (req, res) => {
    let client;
    try {
        client = await connect();
        const query = "SELECT * FROM schema1.contato";
        const result = await client.query(query);
        client.release();
        res.status(200).json(result.rows);
    } catch (err) {
        if (client) client.release();
        console.error("Erro ao buscar contatos:", err);
        res.status(500).json({ error: "Erro ao buscar contatos: " + err.message });
    }
});

// Rota para buscar todos os salários
app.get("/api/salario", async (req, res) => {
    let client;
    try {
        client = await connect();
        const query = "SELECT * FROM schema1.salario";
        const result = await client.query(query);
        client.release();
        res.status(200).json(result.rows);
    } catch (err) {
        if (client) client.release();
        console.error("Erro ao buscar salários:", err);
        res.status(500).json({ error: "Erro ao buscar salários: " + err.message });
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