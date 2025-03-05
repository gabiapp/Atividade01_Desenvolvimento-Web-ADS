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
        data: data,
        genero: genero
    };


    alert("Seja bem-vindo " + objetoCadastro.nome);


    document.getElementById("formulario").reset();
}