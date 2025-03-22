carregarUsuarios();

function registrar() {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let data = document.getElementById("data").value;
    let telefone = document.getElementById("telefone").value;
    let cpf = document.getElementById("cpf").value;
    let genero = document.getElementById("genero").value;
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmarSenha").value;

    if (!nome) {
        return alert("Por favor preencha o campo Nome");
    }

    if (!email) {
        return alert("Por favor preencha o campo E-mail");
    }

    if (!data) {
        return alert("Por favor preencha o campo Data de nascimento");
    }

    if (!telefone) {
        return alert("Por favor preencha o campo Telefone");
    }

    if (!cpf) {
        return alert("Por favor preencha o campo CPF");
    }

    if (!genero) {
        return alert("Por favor selecione o seu gênero");
    }

    if (!senha) {
        return alert("Por favor preencha o campo Senha");
    }

    if (!confirmarSenha) {
        return alert("Por favor preencha o campo Confirmar Senha");
    }

    if (senha !== confirmarSenha) {
        return alert("As senhas devem ser iguais");
    }


    let objetoCadastro = {
        nome: nome,
        email: email,
        dataNascimento: data,
        telefone: telefone,
        cpf: cpf,
        genero: Number(genero),
        senha: senha
    };

    alert("Seja bem-vindo " + objetoCadastro.nome);

    fetch("http://localhost:3000/gravarNovoUsuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objetoCadastro),
    })
        .then(response => response.json())
        .then(data => {
            alert("Usuário adicionado com sucesso!");
            carregarUsuarios(); // Recarregar a lista de usuários
        })
        .catch(error => {
            console.error("Erro ao adicionar usuário:", error);
        });



    document.getElementById("formulario").reset();
}

function carregarUsuarios() {
    fetch("http://localhost:3000/listarUsuarios")
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById("userList");
            userList.innerHTML = ""; // Limpar lista antes de adicionar os itens

            data.forEach(usuario => {
                const li = document.createElement("li");
                li.textContent = `${usuario.name} - ${usuario.description}`;

                // Botão para excluir o usuário
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Excluir";
                deleteButton.classList.add("delete-btn");
                deleteButton.onclick = function () {
                    excluirUsuario(usuario.id); // Chamar a função de excluir usuário
                };

                li.appendChild(deleteButton);
                userList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar usuários:", error);
        });
}