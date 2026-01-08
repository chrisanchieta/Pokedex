const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
           
            <div class="info">
                <ol class="about">
                    <strong>Sobre:</strong>
                    <p>Altura: <span>${pokemon.height / 10}</span>M</p>
                    <p>Peso: <span>${pokemon.weight / 10}</span> KG</p>
                    <p>Experiência Base: ${pokemon.base_experience}</p>
                </ol>
            
                <ol class="abilities">
                    <strong>Habilidades:</strong><br>
                    <p>${pokemon.abilities.map((ability) => `<span class="ability">${ability}</span>`).join(', ')}</p>
                    ${pokemon.moves.length ? `<p>Movimentos: ${pokemon.moves.slice(0, 3).join(', ')}</p>` : ''}
                </ol>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})