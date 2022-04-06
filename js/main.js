/*******************************************************
 * Objetivo: criar os cards conforme consumir a API
 *
 *******************************************************/

'use strict';



//https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces /**endereco da imagem como bacground */


//Chave da API
const key = '3027ea6c9704fac6a712caabdf255b7c';


//Requisição para pegar streamings
const pesquisarStreamings = async () => {
  const url = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${key}&language=pt-BR`;

  const response = await fetch(url);

  const data = await response.json();

  //data.results.forEach(element => {
    //  element.logo_path
  //})


  return data;
};

//Requisição para pegar os filmes que estão em alta
const pesquisarFilmes = async () => {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`

  const response = await fetch(url)

  const data = await response.json();
  
  return data;
}

//Criar os cards de streamings
const criarCardStreaming = (streaming) => {
  const card = document.createElement('div');
  card.classList.add('card-streaming');

  card.innerHTML = `
    <div class="fundo-imagem"></div>
                <div class="container-imagem">
                    <img class="imagem" src="https://image.tmdb.org/t/p/original/${streaming.logo_path}" alt="${streaming.provider_name}">
                </div>

    `;

  return card;
};

//Criar os  cards do filme
const criarCardFilme = (filme) => {
  const card = document.createElement('div');
  card.classList.add('card-filme');

  card.innerHTML = `
        <div class="imagem-filme">
            <img class="imagem" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${filme.poster_path}" alt="${filme.original_title == undefined ? filme.original_name : filme.original_title}">
        </div>

        <div class="container-titulo">
                                    <!--Condicional para verificar se está vazia ou não-->
          <p class="titulo-filme">${filme.original_title == undefined ? filme.original_name : filme.original_title}</p>
        </div>
    `;

  return card;
};


//Carrega as streamings na página
const carregarStreamings =  async () => {
  const container = document.querySelector('.container-streamings');

  const streaming = await pesquisarStreamings()

  let array = []
  for(let i = 0; i< 5; i++) {
    array[i] = streaming.results[i]
  }

  console.log(array)

  const card = array.map(criarCardStreaming);


  container.replaceChildren(...card);
};


//Carrega os filmes na página
const carregarFilmes = async () => {
  const container = document.querySelector('.container-filmes');

  const filme = await pesquisarFilmes()

  const card = filme.results.map(criarCardFilme);

  container.replaceChildren(...card);
};

carregarFilmes()

carregarStreamings()
