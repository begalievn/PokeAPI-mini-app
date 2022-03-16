let favoritesArray = JSON.parse(localStorage.getItem("favorites"));

const displayPokemon = (pokemon) => {
  let pokemonHTMLString = pokemon
    .map((poke) => {
      return `
      <li id="${poke.id}" class="card">
        <img class="card-image" src="${poke.image}" />
        <h2 class="card-title">${poke.id}. ${poke.name}</h2>
        <p class="card-subtitle">Type: ${poke.type}</p>
        <button onclick="favoriteButton(this)">Favorite</button>
      </li>
    `;
    })
    .join(" ");

  pokedex.innerHTML = pokemonHTMLString;
};

displayPokemon(favoritesArray);

function favoriteButton(element) {
  console.log(element.parentElement);
  console.log("button clicked from favorites ");
}
