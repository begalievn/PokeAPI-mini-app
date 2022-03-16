/* Pokedex is a Ordered List element */
const pokedex = document.getElementById("pokedex");

/* Favorites array with data from localStorage */
let favoritesArray = JSON.parse(localStorage.getItem("favorites")) || [];

/* Fetch 150 pokemons from PokeAPI */
const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then((results) => {
    let pokemonsArray = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    displayPokemon(pokemonsArray);
  });
};

/* Display pokemons on ol element */
const displayPokemon = (pokemon) => {
  let pokemonHTMLString = pokemon
    .map((poke) => {
      return `
      <li id="${poke.id}" class="card">
        <img class="card-image" src="${poke.image}" />
        <h2 class="card-title">${poke.id}. ${poke.name}</h2>
        <p class="card-subtitle">Type: ${poke.type}</p>
        <button  class="" 
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

// Fetch function call
fetchPokemon();

/* Search form */
const searchInput = document.getElementById("search-input");
// event listener for search for search form
searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    // Enter button key
    console.log("searching...");
  }
});

/* Favorite Button to add pokemon to favorites localStorage */
async function favoriteButton(element) {
  let liElement = element.parentElement;
  let idOfElement = liElement.id;
  let dataOfPokemon = await fetchPokemonById(idOfElement);
  console.log(dataOfPokemon);
  console.log("favorite button clicked");
}

function fetchPokemonById(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let pokemon = fetch(url).then((res) => res.json());
  // .then((data) => {
  //   return {
  //     name: data.name,
  //     id: data.id,
  //     image: data.sprites["front_default"],
  //     type: data.types.map((type) => type.type.name).join(", "),
  //   };
  // });
}

// fetchPokemonById(1);

/* Function to get an index of element from the pokemonsArray */
function getIndexFromPokemonsArray(element) {
  let idOfElement = element.id;
  let indexInArray = pokemonsArray.findIndex((poke) => {
    return poke.id === Number(idOfElement);
  });
  return indexInArray;
}
