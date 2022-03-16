let favoritesArray = JSON.parse(localStorage.getItem("favorites"));

const displayPokemon = (pokemon) => {
  let pokemonHTMLString = pokemon
    .map((poke) => {
      return `
      <li id="${poke.id}" class="card">
        <img class="card-image" src="${poke.image}" />
        <h2 class="card-title">${poke.id}. ${poke.name}</h2>
        <p class="card-subtitle">Type: ${poke.type}</p>
        <button  class="${
          isThisElementInFavorites(poke.id, favoritesArray)
            ? "favorite-true"
            : ""
        }" 
          onclick="favoriteButton(this)" 
        >
          Favorite
        </button>
      </li>
    `;
    })
    .join(" ");

  pokedex.innerHTML = pokemonHTMLString;
};

displayPokemon(favoritesArray);

function favoriteButton(element) {
  let liElement = element.parentElement;
  let liElementId = Number(liElement.id);
  let indexInArray = findIndexOfElementInArrayById(liElementId, favoritesArray);
  favoritesArray.splice(indexInArray, 1);
  localStorage.setItem("favorites", JSON.stringify(favoritesArray));
  displayPokemon(favoritesArray);
}

function isThisElementInFavorites(id, array) {
  let index = array.findIndex((data) => data.id === id);
  return index >= 0 ? true : false;
}

function findIndexOfElementInArrayById(id, array) {
  let index = array.findIndex((data) => data.id === id);
  return index;
}
