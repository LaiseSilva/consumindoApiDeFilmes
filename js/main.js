/*******************************************************
 * Objetivo: criar os cards conforme consumir a API
 * 
 *******************************************************/


'use strict'

//Simular os dados
const db = [
    {
        id: 1, 
        nome: 'HBO',  
        imagem: './img/hbo.png'
    },

    {
        id: 2, 
        nome: 'apple',  
        imagem: './img/apple.png'
    },

    {
        id: 3, 
        nome: 'globoplay',  
        imagem: './img/globoplay.png'
    },

    {
        id: 4, 
        nome: 'disney',  
        imagem: './img/disney.png'
    },

    {
        id: 5, 
        nome: 'star',  
        imagem: './img/star.png'
    },
]

//Criar os cards de streamings

const criarCard = (streaming) => {

    const card = document.createElement('div')
    card.classList.add('card-streaming')

    card.innerHTML = `
    <div class="fundo-imagem"></div>
                <div class="container-imagem">
                    <img class="imagem" src=${streaming.imagem}" alt="${streaming.nome}">
                </div>

    `

    return card

}


const carregarStreamings = (streaming) =>{
    const container = document.querySelector('.container-streamings')

    const card = streaming.map(criarCard)

    container.replaceChildren(...card)
}

carregarStreamings(db)