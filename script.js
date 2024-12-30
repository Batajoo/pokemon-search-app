const searchInputBox = document.getElementById("search-input")
const searchButton = document.getElementById("search-button");
const card = document.getElementById("card");
const cardStatsContainer = document.querySelector(".card-stats");

const pokemonName = document.getElementById("pokemon-name");
const pokemonHp = document.getElementById("hp");
const pokemonHeight = document.getElementById("height");
const pokemonWeight = document.getElementById("weight");
const pokemonTypeContainer = document.getElementById("types");
const pokemonImage = document.getElementById("pokemon-img");
const pokemonId = document.getElementById('pokemon-id');

const getData = async (pokemonNameNo) => {
    try {
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameNo}`);
        const data = await res.json();
        console.log(data);
        return data;
    } catch(err){
        console.error(err);
    }
};


const getPokemonCard = async () => {
    const inputValue = searchInputBox.value.toLowerCase();
    const data = await getData(inputValue);
    if(data){
        card.classList.remove("hide-card");
        const {height, id, name, stats, types, weight, sprites} = data;
        pokemonName.textContent = name;
        pokemonHp.textContent = stats[0].base_stat;
        pokemonWeight.textContent = weight;
        pokemonHeight.textContent = height;
        types.forEach(({type})=>{
            pokemonTypeContainer.innerHTML += `<span class="pokemon-types ${type.name}">${type.name}</span>`;
        });
        pokemonImage.src = sprites.front_default;
        stats.forEach(({base_stat, stat})=>{
            cardStatsContainer.innerHTML += ` <p>
              <span class="stats-name">${stat.name}</span>
              <span class="stats-value hp" id="${stat.name}">${base_stat}</span>
            </p>`;
        });
        pokemonId.textContent = id;

    } else {
        alert("Pokémon not found");
    }
};


searchButton.addEventListener("click", getPokemonCard);


// card rotating animation
document.addEventListener("mousemove", (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});


//animation reset after mouse off screen
document.addEventListener("mouseleave", (e)=>{
    card.style.transform = 'rotateX(0) rotateY(0)';
});