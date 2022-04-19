'use strict';

const chave = '3027ea6c9704fac6a712caabdf255b7c';

const pesquisarDestaque = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${chave}&language=pt-BR&page=2`;

  const response = await fetch(url);

  const data = await response.json();
  return data;
  
};



const criarCardDestaque = (filme) => {
  const card = document.createElement('div');
  card.classList.add('slide');
  card.style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${filme.backdrop_path})`;

  card.innerHTML = `
       <div class="container-informacao">
            <div class="titulo">${filme.original_title}</div>
            <div class="descricao">${filme.overview}</div>

            <div class="container-botoes">
                <div class="caixa-botao">
                    <a class="botao" href="#">Assistir trailer</a>
                </div>

                <div class="caixa-botao">
                    <a class="botao" href="#">+ informações</a>
                </div>
            </div>
       </div>`;

  return card;
}

const carregarDestaque = async () =>
{
    const container = document.querySelector('.slides-container');
  
    const filmes = await pesquisarDestaque();

    //console.log(filmes.results)
  
  const cardDestaque = filmes.results.map(criarCardDestaque);
  
  //console.log(cardDestaque)

  container.replaceChildren(...cardDestaque);

}




let slideIndex = 0;

function showSlides() {
  let i;
  let slides = document.getElementsByClassName('slide');
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 5000);
}

carregarDestaque();
showSlides();

