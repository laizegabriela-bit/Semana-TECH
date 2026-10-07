const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const idade = document.querySelector("#idade");
const cidade = document.querySelector("#cidade");
const senha = document.querySelector("#senha");

const validacaoNome = document.querySelector("#validacaoNome");
const validacaoEmail = document.querySelector("#validacaoEmail");

const perfilNome = document.querySelector("#perfilNome");
const perfilEmail = document.querySelector("#perfilEmail");
const perfilIdade = document.querySelector("#perfilIdade");
const perfilCidade = document.querySelector("#perfilCidade");

const mensagemSucesso = document.querySelector("#mensagemSucesso");

const imagemPrincipal = document.querySelector("#imagemPrincipal");


function abrirMenu(){
    document.getElementById("menu").classList.toggle("aberto");
}

function mudarTema(){
    document.body.classList.toggle("escuro");
}

function mostrarSenha() {
    const senha = document.querySelector("#senha");
    const botao = document.querySelector("#botaoSenha");
    if (senha.type === "password") {
        senha.type = "text";
        botao.innerText = "Ocultar";
    } else {
        senha.type = "password";
        botao.innerText = "Mostrar";
    }
};


nome.addEventListener("input", function(){
    if(nome.value.length >= 3){
        validacaoNome.innerText = "Nome válido";
    }
    else{
        validacaoNome.innerText = "Nome inválido";
    }
});


email.addEventListener("input", function(){
    if(email.value.includes("@")){
        validacaoEmail.innerText = "E-mail válido";
    }
    else{
        validacaoEmail.innerText = "E-mail inválido";
    }
});


function salvarDados(){
    perfilNome.innerText = nome.value;
    perfilEmail.innerText = email.value;
    perfilIdade.innerText = idade.value + " anos";
    perfilCidade.innerText = cidade.value;
    mensagemSucesso.innerText = "Dados atualizados com sucesso!";
}


function mostrarSenha(){
    if(senha.type === "password"){
        senha.type = "text";
    }
    else{
        senha.type = "password";
    }
}


function trocarImagem(imagem){
    imagemPrincipal.src = imagem.src;
}