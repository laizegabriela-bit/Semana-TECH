let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
const listaInscricoes = document.querySelector("#listaInscricoes");
const quantidadeTotal = document.querySelector("#quantidadeTotal");
const valorTotal = document.querySelector("#valorTotal");

function mudarTema(){
    document.body.classList.toggle("escuro");
}

function abrirMenu(){
    document.getElementById("menu").classList.toggle("aberto");
}

function mostrarInscricoes() {
    listaInscricoes.innerHTML = "";

    if (inscricoes.length === 0) {
        listaInscricoes.innerHTML = `
            <div class="vazio">
                <h2>Nenhuma inscrição realizada.</h2>
                <p>Volte para a página de oficinas e escolha uma.</p>
            </div>
        `;

        atualizarResumo();
        return;
    }

    inscricoes.forEach(function(oficina, indice) {
        listaInscricoes.innerHTML += `
            <article class="item-inscricao">
                <img src="${oficina.imagem}" alt="${oficina.nome}">

                <div class="item-info">
                    <h2>${oficina.nome}</h2>
                    <p><strong>Horário:</strong> ${oficina.horario}</p>
                    <p>
                        <strong>Valor:</strong>
                        R$ ${oficina.valor.toFixed(2).replace(".", ",")}
                    </p>
                </div>

                <button
                    class="botao-remover"
                    data-indice="${indice}"
                >
                    Remover
                </button>
            </article>
        `;
    });

    adicionarEventosRemover();
    atualizarResumo();
}

function adicionarEventosRemover(){
    const botoes = document.querySelectorAll(".botao-remover");

    const modal = document.querySelector("#modalRemover");
    const cancelar = document.querySelector("#cancelarRemocao");
    const confirmar = document.querySelector("#confirmarRemocao");

    let indiceEscolhido;

    botoes.forEach(function(botao){
        botao.addEventListener("click", function(){
            indiceEscolhido = Number(botao.dataset.indice);
            modal.classList.add("modal-aberta");
        });
    });

    cancelar.addEventListener("click", function(){
        modal.classList.remove("modal-aberta");
    });

    confirmar.addEventListener("click", function(){
        inscricoes.splice(indiceEscolhido, 1);
        localStorage.setItem(
            "inscricoes",
            JSON.stringify(inscricoes)
        );
        modal.classList.remove("modal-aberta");
        mostrarInscricoes();
    });
}

function atualizarResumo() {
    let total = 0;
    inscricoes.forEach(function(oficina) {
        total += oficina.valor;
    });
    quantidadeTotal.innerText = inscricoes.length;
    valorTotal.innerText = "R$ " + total.toFixed(2).replace(".", ",");
}

mostrarInscricoes();