async function salvarDadosPessoais() {
    const dados = {
        nome: document.getElementById("nome-dados").value,
        sobrenome: document.getElementById("sobrenome-dados").value,
        data_nascimento: document.getElementById("date-dados").value,
        cpf: document.getElementById("cpf-dados").value,
        usuario: document.getElementById("usuario-dados").value
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
        nome: document.getElementById("nome-dados").value,
        sobrenome: document.getElementById("sobrenome-dados").value,
        data_nascimento: document.getElementById("date-dados").value,
        cpf: document.getElementById("cpf-dados").value,
        usuario: document.getElementById("usuario-dados").value
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

async function salvarContato() {
    const dados = {
        login: document.getElementById("login-contato").value,
        email: document.getElementById("email-contato").value,
        telefone: document.getElementById("telefone-contato").value,
        redes_sociais: document.getElementById("redes-contato").value
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
            alert("Erro ao atualizar contato.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}

async function salvarSalario() {
    const dados = {
        login: document.getElementById("login-salario").value,
        transacao: document.getElementById("transacao-salario").value
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
            alert("Erro ao atualizar salário.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao conectar ao servidor.");
    }
}
