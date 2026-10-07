let oficinas = [
    {
        nome: "Introdução à Robótica",
        horario: "08:00",
        vagas: 20,
        valor: 30,
        imagem: "https://midia.frm.org.br/drupal/public/styles/imagem_paragraph_foto/public/media/image/2025-04/pexels-vanessa-loring-7869034.jpg.jpeg?VersionId=JO7sQE.Wm5t6dK8WMbcZIgjUK7HFEZnU&itok=3FvAJ2PR"
    },
    {
        nome: "Criação de Jogos com JavaScript",
        horario: "09:00",
        vagas: 15,
        valor: 45,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnvcCi1UXXUPfzRkKQmZef5gN1BvUlg-6u4TUvJoF62XPvyFv1Xp22I18&s=10"
    },
    {
        nome: "Primeiros passos com Arduino",
        horario: "10:00",
        vagas: 18,
        valor: 40,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5rYyTBVUtgnDRnMAWXWag2R5vKt9SPtb4FbMj_TtRq8rqDVT13KoTrE&s=10"
    },
    {
        nome: "Design de Interfaces no Figma",
        horario: "13:00",
        vagas: 25,
        valor: 25,
        imagem: "https://imgproxy.domestika.org/unsafe/w:1200/rs:fill/plain/src://blog-post-open-graph-covers/000/009/753/9753-original.jpg?1640916662"
    },
    {
        nome: "Segurança na Internet",
        horario: "14:00",
        vagas: 30,
        valor: 20,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaMIJARIy_KhohYh5fNucB3OIntynTlt7qSRigHMCy6VOjmm4IG1ozI_Q&s=10"
    },
    {
        nome: "Introdução à Inteligência Artificial",
        horario: "15:00",
        vagas: 20,
        valor: 50,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_LrueeH6d7KdrDJqyrPVKnKRfsB3KFLEAHpfnHiVEcH1yKYbJ5qMSs4Dd&s=10"
    },
    {
        nome: "Desenvolvimento de Aplicativos",
        horario: "16:00",
        vagas: 15,
        valor: 55,
        imagem: "https://uds.com.br/blog/wp-content/uploads/2022/05/Quais-sao-as-melhores-empresas-de-desenvolvimento-de-aplicativos.jpg"
    },
    {
        nome: "Criação de Sites Responsivos",
        horario: "17:00",
        vagas: 25,
        valor: 35,
        imagem: "https://temperim.com/blog/wp-content/uploads/2017/07/devices3.png"
    }
];

const areaOficinas = document.querySelector("#oficinas");
const busca = document.querySelector("#busca");
const ordenar = document.querySelector("#ordenar");
const mensagemBusca = document.querySelector("#mensagemBusca");
const botaoInscricoes = document.querySelector("#botaoInscricoes");

let inscricoes = JSON.parse(localStorage.getItem("inscricoes")) || [];
let ordemAtual = "";

function mudarTema(){
    document.body.classList.toggle("escuro");
}

function abrirMenu(){
    document.getElementById("menu").classList.toggle("aberto");
}

function mostrarOficinas(lista) {
    areaOficinas.innerHTML = "";

    if (lista.length === 0) {
        mensagemBusca.innerText = "Nenhuma oficina encontrada.";
        return;
    }

    mensagemBusca.innerText = "";

    lista.forEach(function(oficina) {
        const inscrita = inscricoes.some(function(item) {
            return item.nome === oficina.nome;
        });

        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${oficina.imagem}" alt="${oficina.nome}">

            <div class="card-conteudo">
                <h2>${oficina.nome}</h2>

                <p><strong>Horário:</strong> ${oficina.horario}</p>
                <p><strong>Vagas:</strong> ${oficina.vagas}</p>
                <p class="valor">
                    <strong>Valor:</strong>
                    R$ ${oficina.valor.toFixed(2).replace(".", ",")}
                </p>

                <button
                    class="botao-inscrever ${inscrita ? "inscrito" : ""}"
                    data-nome="${oficina.nome}"
                    ${inscrita ? "disabled" : ""}
                >
                    ${inscrita ? "Inscrito" : "Inscrever-se"}
                </button>
            </div>
        `;

        areaOficinas.appendChild(card);
    });

    adicionarEventosBotoes();
}


function adicionarEventosBotoes() {
    const botoes = document.querySelectorAll(".botao-inscrever");

    botoes.forEach(function(botao) {
        botao.addEventListener("click", function() {
            const nome = botao.dataset.nome;

            adicionarInscricao(nome);
        });
    });
}

function adicionarInscricao(nome) {
    const oficinaEscolhida = oficinas.find(function(oficina) {
        return oficina.nome === nome;
    });

    if (!oficinaEscolhida) {
        return;
    }

    const jaInscrita = inscricoes.some(function(oficina) {
        return oficina.nome === nome;
    });

    if (jaInscrita) {
        return;
    }

    inscricoes.push(oficinaEscolhida);

    localStorage.setItem(
        "inscricoes",
        JSON.stringify(inscricoes)
    );

    atualizarBotaoInscricoes();
    atualizarTela();
}

function atualizarBotaoInscricoes() {
    botaoInscricoes.innerText =
        `Minhas inscrições (${inscricoes.length})`;
}

busca.addEventListener("input", function() {
    atualizarTela();
});

ordenar.addEventListener("change", function() {
    ordemAtual = ordenar.value;

    atualizarTela();
});

function atualizarTela() {
    let texto = busca.value.toLowerCase();

    let listaFiltrada = oficinas.filter(function(oficina) {
        return oficina.nome.toLowerCase().includes(texto);
    });

    if (ordemAtual === "menor") {
        listaFiltrada.sort(function(a, b) {
            return a.valor - b.valor;
        });
    }

    if (ordemAtual === "maior") {
        listaFiltrada.sort(function(a, b) {
            return b.valor - a.valor;
        });
    }

    mostrarOficinas(listaFiltrada);
}

const imagensSlider = document.querySelector("#imagensSlider");
const botaoAnterior = document.querySelector("#anterior");
const botaoProximo = document.querySelector("#proximo");
const totalImagens = 4;
let posicao = 0;

function atualizarSlider() {
    const largura = document.querySelector(".janela-slider").offsetWidth;

    imagensSlider.style.transform =
        `translateX(-${posicao * largura}px)`;

    botaoAnterior.disabled = posicao === 0;
    botaoProximo.disabled = posicao === totalImagens - 1;
}

botaoProximo.addEventListener("click", function() {
    if (posicao < totalImagens - 1) {
        posicao++;
        atualizarSlider();
    }
});

botaoAnterior.addEventListener("click", function() {
    if (posicao > 0) {
        posicao--;
        atualizarSlider();
    }
});

window.addEventListener("resize", atualizarSlider);
atualizarBotaoInscricoes();
atualizarTela();
atualizarSlider();