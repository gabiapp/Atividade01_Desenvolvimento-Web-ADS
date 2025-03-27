// Função de login
async function Entrar() {
    // Coletar dados de entrada
    const cpf = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;

    // Validação básica
    if (!cpf || !senha) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    try {
        // Buscar todos os usuários
        const response = await fetch('http://localhost:3000/listarUsuarios');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar usuários');
        }

        const usuarios = await response.json();

        // Verificar credenciais
        const usuarioEncontrado = usuarios.find(usuario => 
            usuario.tx_cpf === cpf && usuario.tx_senha === senha
        );

        if (usuarioEncontrado) {
            alert(`Bem-vindo, ${usuarioEncontrado.tx_nome}!`);
            
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            
            window.location.href = '../Pagina_inicial/index.html';
        } else {
            alert('CPF ou senha incorretos');
        }

    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao tentar fazer login. Tente novamente.');
    }
}

// Adicionar evento de Enter nos campos
document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpf');
    const senhaInput = document.getElementById('senha');

    cpfInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            senhaInput.focus();
        }
    });

    senhaInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            Entrar();
        }
    });
});

// Verificar se usuário já está logado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const paginaAtual = window.location.pathname;
    
    // Redirecionar apenas se não estiver na página de login
    if (usuarioLogado && !paginaAtual.includes('index_entrar.html')) {
        window.location.href = '../Pagina_inicial/index.html';
    }
});

// Função de logout (para ser usada em outras páginas)
function Logout() {
    // Remover dados do usuário do localStorage
    localStorage.removeItem('usuarioLogado');
    
    // Redirecionar para página de login
    window.location.href = '../Login/index_entrar.html';
}