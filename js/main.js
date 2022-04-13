/*******************************************************
 * Objetivo: criar os cards conforme consumir a API
 *
 *******************************************************/

"use strict";

//Chave da API
const key = "3027ea6c9704fac6a712caabdf255b7c";
let i = -1;
let filme = "";
//Requisição para pegar os filmes que estão em alta
const pesquisarFilmes = async () => {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
};

//Criar os  cards do filme
const paodebatata = (batata) => {
  criarModal(filme.results[batata]);
  console.log(filme.results[batata]);
  console.log(batata);
};
const criarCardFilme = (filme) => {
  i += 1;

  const card = document.createElement("div");
  card.classList.add("card-filme");

  card.innerHTML = `
        <div class="imagem-filme" onclick=paodebatata("${i}")>
            <img class="imagem" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${
              filme.poster_path
            }" alt="${
    filme.original_title == undefined
      ? filme.original_name
      : filme.original_title
  }">
        </div>

        <div class="container-titulo">
                                    <!--Condicional para verificar se está vazia ou não-->
          <p class="titulo-filme">${
            filme.original_title == undefined
              ? filme.original_name
              : filme.original_title
          }</p>
        </div>
    `;

  return card;
};

const criarModal = (filme) => {
  const modal = document.createElement("div");

  modal.classList.add("conteudo-modal");

  modal.innerHTML = `
        <style>
          .conteudo-modal {
              background-image: url();
          }
        </style>
    <button class="fechar">X</button>

    <div class="container-imagem">
      <img class="imagem-modal" src="${filme.poster_path}" alt="">
    </div>

    <div>
      <h1 class="titulo-filme">${filme.poster_path}</h1>
      <div class="informacoes-adicionais">
          <div class="classificao">${filme.popularity}</div>
          <div class="genero">
              <p>${filme.genre_ids}</p>
          </div>
          <div class="lancamento">${filme.release_date}</div>
      </div>

      <div class="sinopse">
          <h3>Sinopse</h3>
          <p class="descricao">${filme.overview}</p>
      </div>

    </div>

      
      `;
};

//Carrega os filmes na página
const carregarFilmes = async () => {
  const container = document.querySelector(".container-filmes");

  filme = await pesquisarFilmes();

  const card = filme.results.map(criarCardFilme);

  container.replaceChildren(...card);
};

function iniciarModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("mostrar");
  modal.addEventListener("click", (evento) => {
    if (evento.target.id == modalId || evento.target.className == "fechar") {
      modal.classList.remove("mostrar");
    }
  });
}

const maisInformacoesBotao = document.querySelector(".botao-informacoes");
/*const maisInformacoesImagem = document.querySelector('.card-filme');

maisInformacoes.addEventListener('click', () => iniciarModal('modal'));
maisInformacoesImagem.addEventListener('click', () => iniciarModal('modal'));*/

carregarFilmes();
