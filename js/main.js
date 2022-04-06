/*******************************************************
 * Objetivo: criar os cards conforme consumir a API
 *
 *******************************************************/

'use strict';

const key = '3027ea6c9704fac6a712caabdf255b7c';
function name(chave, data) {
  let values = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
  }
  return values;
}
const pesquisarStreamings = async () => {
  const url = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${key}&language=pt-BR`;

  const response = await fetch(url);

  const data = await response.json();
  result = data['results'];
  // let { results } = await response.json();

  console.log(results);
  // console.log(data);
  // `https://image.tmdb.org/t/p/original/${image}`
  console.log(data[i]['logo_path']);
  console.log(data[i]['provide_name']);

  return data;
};

const streaming = pesquisarStreamings();

console.log(streaming);

//Criar os cards de streamings

const criarCardStreaming = async (streaming) => {
  streaming = pesquisarStreamings();

  const card = document.createElement('div');
  card.classList.add('card-streaming');

  card.innerHTML = `
    <div class="fundo-imagem"></div>
                <div class="container-imagem">
                    <img class="imagem" src="" alt="">
                </div>

    `;

  return card;
};

const criarCardFilme = async (filme) => {
  const card = document.createElement('div');
  card.classList.add('card-filme');

  card.innerHTML = `
        <div class="imagem-filme">
            <img class="imagem" src="" alt="">
        </div>

        <div>
          <p class="titulo-filme">tetse</p>
        </div>
    `;

  return card;
};

const carregarStreamings = (filme) => {
  const container = document.querySelector('.container-streamings');

  const card = streaming.map(criarCardFilme);

  container.replaceChildren(...card);
};
