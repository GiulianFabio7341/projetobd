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
            const error = await response.json();
            alert(`Erro ao salvar dados pessoais: ${error.error}`);
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
            const error = await response.json();
            alert(`Erro ao atualizar dados pessoais: ${error.error}`);
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function apagarDadosPessoais() {
    const usuario = document.getElementById("usuario-dados").value || null;
    if (!usuario) {
        alert("Por favor, informe o usuário para apagar.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/dados-pessoais/${usuario}`, {
            method: "DELETE",
        });
        if (response.ok) {
            alert("Dados pessoais apagados com sucesso!");
        } else {
            const error = await response.json();
            alert(`Erro ao apagar dados pessoais: ${error.error}`);
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
            const error = await response.json();
            alert(`Erro ao salvar contato: ${error.error}`);
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
            const error = await response.json();
            alert(`Erro ao atualizar contato: ${error.error}`);
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function apagarContato() {
    const login = document.getElementById("login-contato").value || null;
    if (!login) {
        alert("Por favor, informe o login para apagar.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/contato/${login}`, {
            method: "DELETE",
        });
        if (response.ok) {
            alert("Contato apagado com sucesso!");
        } else {
            const error = await response.json();
            alert(`Erro ao apagar contato: ${error.error}`);
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
            const error = await response.json();
            alert(`Erro ao salvar salário: ${error.error}`);
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
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });
        if (response.ok) {
            alert("Salário atualizado com sucesso!");
        } else {
            const error = await response.json();
            alert(`Erro ao atualizar salário: ${error.error}`);
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function apagarSalario() {
    const login = document.getElementById("login-salario").value || null;
    if (!login) {
        alert("Por favor, informe o login para apagar.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/salario/${login}`, {
            method: "DELETE",
        });
        if (response.ok) {
            alert("Salário apagado com sucesso!");
        } else {
            const error = await response.json();
            alert(`Erro ao apagar salário: ${error.error}`);
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

// Função para mostrar a tabela com base na seleção
async function mostrarTabela() {
    const escolha = document.getElementById("escolha").value;
    const tabela = document.querySelector("table");
    let headers = [];
    let endpoint = "";

    switch (escolha) {
        case "valor1": // Dados Pessoais
            headers = ["Usuário", "Nome", "Sobrenome", "CPF", "Data Nascimento"];
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
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: "GET",
        });
        const dados = await response.json();

        tabela.innerHTML = "";

        const thead = document.createElement("thead");
        const trHead = document.createElement("tr");
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        tabela.appendChild(thead);

        const tbody = document.createElement("tbody");
        dados.forEach(item => {
            const tr = document.createElement("tr");
            switch (escolha) {
                case "valor1":
                    [item.usuario, item.nome, item.sobrenome, item.cpf, item.data_nascimento]
                        .forEach(value => {
                            const td = document.createElement("td");
                            td.textContent = value !== null ? value : "null";
                            tr.appendChild(td);
                        });
                    break;
                case "valor2":
                    [item.login, item.email, item.telefone, item.redes_sociais]
                        .forEach(value => {
                            const td = document.createElement("td");
                            td.textContent = value !== null ? value : "null";
                            tr.appendChild(td);
                        });
                    break;
                case "valor3":
                    [item.login, item.transacao]
                        .forEach(value => {
                            const td = document.createElement("td");
                            td.textContent = value !== null ? value : "null";
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

// Funções mostrarTabela
document.getElementById("escolha").addEventListener("change", mostrarTabela);
document.addEventListener("DOMContentLoaded", mostrarTabela);
