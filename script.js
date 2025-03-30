async function salvarDadosPessoais() {
    const dados = {
        nome: document.getElementById("nome-dados").value || null,
        sobrenome: document.getElementById("sobrenome-dados").value || null,
        data_nascimento: document.getElementById("date-dados").value || null,
        cpf: document.getElementById("cpf-dados").value || null,
        usuario: document.getElementById("usuario-dados").value || null
    };

    try {
        const response = await fetch("http://localhost:3000/api/dados-pessoais", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Dados pessoais salvos com sucesso!");
        } else {
            alert("Erro ao salvar dados pessoais.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function atualizarDadosPessoais() {
    const dados = {
        nome: document.getElementById("nome-dados").value || null,
        sobrenome: document.getElementById("sobrenome-dados").value || null,
        data_nascimento: document.getElementById("date-dados").value || null,
        cpf: document.getElementById("cpf-dados").value || null,
        usuario: document.getElementById("usuario-dados").value || null
    };

    try {
        const response = await fetch("http://localhost:3000/api/dados-pessoais", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Dados pessoais atualizados com sucesso!");
        } else {
            alert("Erro ao atualizar dados pessoais.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function mostrarTabelaDadosPessoais() {
    const dados = {
        nome: document.getElementById("nome-dados").value || null,
        sobrenome: document.getElementById("sobrenome-dados").value || null,
        data_nascimento: document.getElementById("date-dados").value || null,
        cpf: document.getElementById("cpf-dados").value || null,
        usuario: document.getElementById("usuario-dados").value || null
    };

    try {
        const response = await fetch("http://localhost:3000/api/dados-pessoais", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Dados pessoais atualizados com sucesso!");
        } else {
            alert("Erro ao mostrarTabela dados pessoais.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function salvarContato() {
    const dados = {
        login: document.getElementById("login-contato").value || null,
        email: document.getElementById("email-contato").value || null,
        telefone: document.getElementById("telefone-contato").value || null,
        redes_sociais: document.getElementById("redes-contato").value || null
    };

    try {
        const response = await fetch("http://localhost:3000/api/contato", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Contato salvo com sucesso!");
        } else {
            alert("Erro ao salvar contato.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function atualizarContato() {
    const dados = {
        login: document.getElementById("login-contato").value || null,
        email: document.getElementById("email-contato").value || null,
        telefone: document.getElementById("telefone-contato").value || null,
        redes_sociais: document.getElementById("redes-contato").value || null
    };

    try {
        const response = await fetch("http://localhost:3000/api/contato", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Contato atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar contato.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function mostrarTabelaContato() {
    const dados = {
        login: document.getElementById("login-contato").value,
        email: document.getElementById("email-contato").value,
        telefone: document.getElementById("telefone-contato").value,
        redes_sociais: document.getElementById("redes-contato").value
    };

    try {
        const response = await fetch("http://localhost:3000/api/contato", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Contato atualizado com sucesso!");
        } else {
            alert("Erro ao mostrarTabela contato.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function salvarSalario() {
    const dados = {
        login: document.getElementById("login-salario").value || null,
        transacao: document.getElementById("transacao-salario").value || null
    };

    try {
        const response = await fetch("http://localhost:3000/api/salario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Salário salvo com sucesso!");
        } else {
            alert("Erro ao salvar salário.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function atualizarSalario() {
    const dados = {
        login: document.getElementById("login-salario").value || null,
        transacao: document.getElementById("transacao-salario").value || null
    };

    try {
        const response = await fetch("http://localhost:3000/api/salario", {
            method: "PUT", // Usando o método PUT para atualização
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Salário atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar salário.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function mostrarTabelaSalario() {
    const dados = {
        login: document.getElementById("login-salario").value,
        transacao: document.getElementById("transacao-salario").value
    };

    try {
        const response = await fetch("http://localhost:3000/api/salario", {
            method: "PUT", // Usando o método PUT para atualização
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Salário atualizado com sucesso!");
        } else {
            alert("Erro ao mostrarTabela salário.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

// Função para mostrarTabela a tabela com base na seleção
async function mostrarTabela() {
    const escolha = document.getElementById("escolha").value;
    const tabela = document.querySelector("table");
    let headers = [];
    let endpoint = "";

    // Definir cabeçalhos e endpoint com base na seleção
    switch (escolha) {
        case "valor1": // Dados Pessoais
            headers = ["Usuário", "Sobrenome", "Data Nascimento", "CPF", "Nome"];
            endpoint = "/api/dados-pessoais";
            break;
        case "valor2": // Contato
            headers = ["Login", "Email", "Telefone", "Redes Sociais"];
            endpoint = "/api/contato";
            break;
        case "valor3": // Salário
            headers = ["Login", "Transação"];
            endpoint = "/api/salario";
            break;
    }

    try {
        const response = await fetch(`http://localhost:3000${endpoint}`);
        const dados = await response.json();

        // Limpar tabela atual
        tabela.innerHTML = "";

        // Criar cabeçalhos
        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        tabela.appendChild(thead);

        // Preencher linhas com dados
        const tbody = document.createElement("tbody");
        dados.forEach(item => {
            const tr = document.createElement("tr");
            switch (escolha) {
                case "valor1":
                    [item.usuario, item.sobrenome, item.data_nascimento, item.cpf, item.nome]
                        .forEach(value => {
                            const td = document.createElement("td");
                            td.textContent = value !== null ? value : "null"; // Exibe "null" se o valor for nulo
                            tr.appendChild(td);
                        });
                    break;
                case "valor2":
                    [item.login, item.email, item.telefone, item.redes_sociais]
                        .forEach(value => {
                            const td = document.createElement("td");
                            td.textContent = value !== null ? value : "null"; // Exibe "null" se o valor for nulo
                            tr.appendChild(td);
                        });
                    break;
                case "valor3":
                    [item.login, item.transacao]
                        .forEach(value => {
                            const td = document.createElement("td");
                            td.textContent = value !== null ? value : "null"; // Exibe "null" se o valor for nulo
                            tr.appendChild(td);
                        });
                    break;
            }
            tbody.appendChild(tr);
        });
        tabela.appendChild(tbody);

    } catch (err) {
        console.error("Erro ao buscar dados:", err);
        alert("Erro ao carregar os dados da tabela.");
    }
}

// Adicionar evento ao select
document.getElementById("escolha").addEventListener("change", mostrarTabela);

// Carregar a tabela inicial ao carregar a página
document.addEventListener("DOMContentLoaded", mostrarTabela);
