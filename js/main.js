/*******************************************************
 * Objetivo: criar os cards conforme consumir a API
 *
 *******************************************************/

"use strict";

//Chave da API
const key = "3027ea6c9704fac6a712caabdf255b7c";

// Responsável por guardar o indice que foi clicado
let i = -1;

//Responsável por guarda as informações do que vem do request 
let filme = "";
//Requisição para pegar os filmes que estão em alta
const pesquisarFilmes = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
};


//Funcão para ativar a modal
function iniciarModal(modalId) {

  const container = document.querySelector(".modal")

   const teste = paodebatata()

   const container.replaceChildren(teste);



  const modal = document.getElementById(modalId);
  modal.classList.add("mostrar");
  modal.addEventListener("click", (evento) => {
    if (evento.target.id == modalId || evento.target.className == "fechar") {
      modal.classList.remove("mostrar");
    }
  });
}


//Função responsável por pegar o indice que foi clicado e jogar para criar a modal
const paodebatata = (batata) => {
  const teste =  criarModal(filme.results[batata]);

  iniciarModal('modal');

  console.log(teste);
  return teste
};


//Criar os  cards do filme
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
        </div>`;

  return card;
};


//Criação do modal
const criarModal = (filme) => {

  console.log(filme);
  const modal = document.createElement("div");

  modal.classList.add("conteudo-modal");

  modal.innerHTML = `
        <style>
          .conteudo-modal {
              background:#000;
          }
        </style>
    <button class="fechar">X</button>

    <div class="container-imagem">
      <img class="imagem-modal" src="${filme.poster_path}" alt="">
    </div>

    <div>
      <h1 class="titulo-filme">${filme.original_title}</h1>
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

    </div>`;

    return modal;

};


//Carrega os filmes na página
const carregarFilmes = async () => {
  const container = document.querySelector(".container-filmes");

  filme = await pesquisarFilmes();

  const card = filme.results.map(criarCardFilme);

  container.replaceChildren(...card);
};



/*const maisInformacoesBotao = document.querySelector(".botao-informacoes");
const maisInformacoesImagem = document.querySelector('.card-filme');*/

/*maisInformacoes.addEventListener('click', () => iniciarModal('modal'));
maisInformacoesImagem.addEventListener('click', () => iniciarModal('modal'));*/

carregarFilmes();
