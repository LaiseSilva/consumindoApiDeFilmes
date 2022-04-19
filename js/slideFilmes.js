'use strict';

const key = '3027ea6c9704fac6a712caabdf255b7c';

//função para pegar os filmes
const pesquisarFilmes = async (caminho) => {
  const url = `${caminho}`;

  const response = await fetch(url);

  const data = await response.json();

  return data;
};

let cliqueFilme = -1

//Criando os cards de filme
const criarCardFilme = (imagem) => {
  cliqueFilme += 1

  const card = document.createElement('div');
  card.onclick = cliqueFilme
  card.className = 'container__filme';
  card.style.backgroundImage = `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2${imagem})`;

  //console.log(cliqueFilme)
  return card;
};


//Carregando os cards do filme
const carregarFilmes = async (container, caminho) => { 
  let filmes = await pesquisarFilmes(caminho);
  
  for (let cont = 0; cont < filmes.results.length; cont++) {
    const posterFilme = filmes.results[cont]["poster_path"];
    let cardFilme = criarCardFilme(posterFilme);
    container.appendChild(cardFilme)
  }
  return 
};

const criarModal = (filme) => {
  console.log(filme);
  const modal = document.createElement('div');
  modal.classList.add('conteudo-modal');
  modal.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${filme.backdrop_path})`;

  modal.innerHTML = `
    <button class="fechar">X</button>

    <div class="container-imagem">
      <img class="imagem-modal" src="${filme.poster_path}" alt="">
    </div>

    <div>
      <h1 class="titulo-filme">${filme.original_title}</h1>
      <div class="informacoes-adicionais">
          <div class="classificao">${filme.popularity}</div>
          <div class="genero">
              <p></p>
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

function iniciarModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('mostrar');

  modal.addEventListener('click', (evento) => {
    if (evento.target.id == modalId || evento.target.className == 'fechar') {
      modal.classList.remove('mostrar');
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.container__filmes');
  var filme = document.querySelectorAll('.container__filme');
  var anterior = document.querySelector('.anterior');
  var proximo = document.querySelector('.proximo');

  anterior.addEventListener('click', function () {
    container.insertBefore(filme[filme.length - 1], filme[0]);
    filme = document.querySelectorAll('.container__filme');
  });

  proximo.addEventListener('click', function () {
    container.appendChild(filme[0]);
    filme = document.querySelectorAll('.container__filme');
  });
});


const sugestao = document.getElementById('sugestao').querySelector('.container__filmes');
const upcoming = document.getElementById('upcoming').querySelector('.container__filmes');
const lancamentos = document.getElementById('lancamentos').querySelector('.container__filmes');

carregarFilmes(sugestao, `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR&page=1`);
carregarFilmes(upcoming,`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=pt-BR&page=3`);
carregarFilmes(lancamentos, `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=pt-BR&page=5`)

