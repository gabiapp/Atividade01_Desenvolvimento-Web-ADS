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

document.addEventListener('DOMContentLoaded', carregarUsuarios);

async function carregarUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/listarUsuarios');
        const usuarios = await response.json();
        renderizarUsuarios(usuarios);
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}


function renderizarUsuarios(usuarios) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'user-table';

    // Cabeçalho
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    ['Nome', 'E-mail', 'Nascimento', 'Telefone', 'CPF', 'Gênero', 'Ações'].forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        headerRow.appendChild(th);
    });

    // Corpo
    const tbody = table.createTBody();
    usuarios.forEach(usuario => {
        const row = tbody.insertRow();

        row.innerHTML = `
            <td>${usuario.tx_nome}</td>
            <td>${usuario.tx_email}</td>
            <td>${new Date(usuario.dt_nascimento).toLocaleDateString('pt-BR')}</td>
            <td>${formatarTelefone(usuario.nr_telefone)}</td>
            <td>${formatarCPF(usuario.tx_cpf)}</td>
            <td>${obterGenero(usuario.cd_genero)}</td>
            <td>   
                 <button class="btn-acao btn-editar" onclick="abrirEdicao(${usuario.id_usuario})">Editar</button>
                 <button class="btn-acao btn-excluir" onclick="excluirUsuario(${usuario.id_usuario})">Excluir</button>
            </td>
        `;
    });

    userList.appendChild(table);
}

// Funções auxiliares
function obterGenero(codigo) {
    const generos = {
        1: 'Masculino',
        2: 'Feminino',
        3: 'Prefiro não informar'
    };
    return generos[codigo] || 'Desconhecido';
}

function formatarTelefone(numero) {
    return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função de abrir edição
async function abrirEdicao(id) {
    try {
        if (!id || isNaN(id)) throw new Error('ID inválido');

        const response = await fetch(`http://localhost:3000/adquirirUsuario/${id}`);
        if (!response.ok) {
            if (response.status === 404) throw new Error('Usuário não encontrado');
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const usuario = await response.json();
        criarModalEdicao(usuario);

    } catch (error) {
        console.error('Erro na abertura de edição:', error);
        alert(error.message);
    }
}

// Função de Edição 
function criarModalEdicao(usuario) {

    // Criar o modal
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal-edicao';
    modalContainer.className = 'modal-edicao';
    modalContainer.innerHTML = `
        <div class="modal-conteudo">
            <h2>Editar Usuário</h2>
            <form id="formulario-edicao">
                <div class="campo-edicao">
                    <label for="nome-edicao">Nome:</label>
                    <input type="text" id="nome-edicao" value="${usuario.tx_nome}" required>
                </div>
                <div class="campo-edicao">
                    <label for="email-edicao">E-mail:</label>
                    <input type="email" id="email-edicao" value="${usuario.tx_email}" required>
                </div>
                <div class="campo-edicao">
                    <label for="data-edicao">Data de Nascimento:</label>
                    <input type="date" id="data-edicao" value="${formatarDataParaInput(usuario.dt_nascimento)}" required>
                </div>
                <div class="campo-edicao">
                    <label for="telefone-edicao">Telefone:</label>
                    <input type="tel" id="telefone-edicao" value="${usuario.nr_telefone}" required>
                </div>
                <div class="campo-edicao">
                    <label for="cpf-edicao">CPF:</label>
                    <input type="text" id="cpf-edicao" value="${usuario.tx_cpf}" required>
                </div>
                <div class="campo-edicao">
                    <label for="genero-edicao">Gênero:</label>
                    <select id="genero-edicao" required>
                        <option value="1" ${usuario.cd_genero === 1 ? 'selected' : ''}>Masculino</option>
                        <option value="2" ${usuario.cd_genero === 2 ? 'selected' : ''}>Feminino</option>
                        <option value="3" ${usuario.cd_genero === 3 ? 'selected' : ''}>Prefiro não informar</option>
                    </select>
                </div>
                <div class="acoes-modal">
                    <button type="button" id="btn-salvar-edicao">Salvar</button>
                    <button type="button" id="btn-cancelar-edicao">Cancelar</button>
                </div>
            </form>
        </div>
    `;

    // Adicionar ao corpo do documento
    document.body.appendChild(modalContainer);

    // Configurar botões
    document.getElementById('btn-cancelar-edicao').addEventListener('click', () => {
        document.body.removeChild(modalContainer);
    });

    document.getElementById('btn-salvar-edicao').addEventListener('click', () => {
        salvarEdicao(usuario.id_usuario);
    });

    // Adicionar estilos básicos
    const style = document.createElement('style');
    style.textContent = `
        /* Modal Styling */
        .modal-edicao {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal-conteudo {
            background-color: #FFFAF0;
            border-radius: 10px;
            padding: 15px;
            width: 400px;
            margin: 70px auto;
            box-shadow: 5px 5px 10px rgb(11, 54, 94);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .modal-conteudo h2 {
            font: normal 40px Arial;
            font-weight: bold;
            color: black;
            margin-top: 40px;
            margin-bottom: 20px;
        }

        .campo-edicao {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
        }

        .campo-edicao label {
            font: normal 15px Arial;
            font-weight: bold;
            color: black;
            margin-top: 5px;
            align-self: flex-start;
        }

        .campo-edicao input, 
        .campo-edicao select {
            background-color: rgb(240, 248, 248);
            border: 1px solid transparent;
            border-radius: 10px;
            padding: 5px 0 5px 15px;
            box-shadow: 5px 5px 10px rgb(11, 54, 94);
            width: 250px;
            height: 15px;
            margin: 15px 0;
            color: rgb(0, 0, 0);
        }

        .campo-edicao select {
            width: 265px;
            height: 25px;
            background-color: white;
        }

        .acoes-modal {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }

        .acoes-modal button {
            background-color: white;
            border: 5px solid transparent;
            border-radius: 10px;
            padding: 5px;
            box-shadow: 5px 5px 10px rgb(11, 54, 94);
            width: 100px;
            height: 50px;
            font: normal 15px Arial;
            font-weight: bold;
            color: rgb(0, 0, 0);
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .acoes-modal button:hover {
            background-color: #f0f0f0;
        }
    `;
    document.body.appendChild(style);
}

// Função auxiliar para formatar data para input de data
function formatarDataParaInput(data) {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const dia = String(dataObj.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

// Função de salvar edição
async function salvarEdicao(id) {
    try {
        // Coletar dados do formulário
        const novosDados = {
            nome: document.getElementById('nome-edicao').value,
            email: document.getElementById('email-edicao').value,
            dataNascimento: document.getElementById('data-edicao').value,
            telefone: document.getElementById('telefone-edicao').value,
            cpf: document.getElementById('cpf-edicao').value,
            genero: document.getElementById('genero-edicao').value
        };

        // Validações básicas
        if (!novosDados.nome || !novosDados.email || !novosDados.dataNascimento ||
            !novosDados.telefone || !novosDados.cpf || !novosDados.genero) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        // Enviar requisição de atualização
        const updateResponse = await fetch(`http://localhost:3000/atualizarUsuario/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novosDados)
        });

        // Verificar resposta
        if (!updateResponse.ok) {
            const errorData = await updateResponse.json();
            throw new Error(errorData.error || 'Falha na atualização');
        }

        // Fechar modal e recarregar usuários
        document.body.removeChild(document.getElementById('modal-edicao'));
        await carregarUsuarios();
        alert('Atualização realizada com sucesso!');

    } catch (error) {
        console.error('Erro na edição:', error);
        alert(error.message);
    }
}

// Atualizar a função excluirUsuario
async function excluirUsuario(id) {
    try {
        if (!id || isNaN(id)) throw new Error('ID inválido');
        if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

        const response = await fetch(`http://localhost:3000/excluirUsuario/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro na exclusão');
        }

        await carregarUsuarios();
        alert('Usuário excluído com sucesso!');

    } catch (error) {
        console.error('Erro na exclusão:', error);
        alert(error.message);
    }
}