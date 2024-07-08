const pokemonContainer = document.getElementById('pokemon-container');
const nameFilter = document.getElementById('name-filter');
const generationButtons = document.getElementById('generation-buttons');
const typeButtons = document.getElementById('type-buttons');
const toggleFiltersButton = document.getElementById('toggle-filters');
const filterContainer = document.getElementById('filter-container');

const fetchAllPokemon = async () => {
    let allPokemon = [];
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=1000';
    while (url) {
        const response = await fetch(url);
        const data = await response.json();
        allPokemon = allPokemon.concat(data.results);
        url = data.next;
    }
    const pokemonDetails = await Promise.all(allPokemon.map(async p => {
        const res = await fetch(p.url);
        const pokemonData = await res.json();
        return pokemonData;
    }));
    return pokemonDetails;
};

const displayPokemon = (pokemonList) => {
    pokemonContainer.innerHTML = '';
    pokemonList.forEach(pokemon => {
        if (
            (pokemon.id >= 10027 && pokemon.id <= 10032) ||
            pokemon.id === 10093 ||
            (pokemon.id >= 10116 && pokemon.id <= 10117) ||
            (pokemon.id >= 10121 && pokemon.id <= 10122) ||
            (pokemon.id >= 10128 && pokemon.id <= 10135) ||
            (pokemon.id >= 10143 && pokemon.id <= 10146) ||
            (pokemon.id >= 10149 && pokemon.id <= 10151) ||
            (pokemon.id >= 10153 && pokemon.id <= 10154) ||
            (pokemon.id >= 10181 && pokemon.id <= 10183) ||
            (pokemon.id >= 10264 && pokemon.id <= 10271)
        ) {
            return;
        }

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.sprites.other['official-artwork'].front_default;

        const pokemonName = document.createElement('div');
        pokemonName.classList.add('pokemon-name');
        pokemonName.textContent = capitalizeFirstLetter(pokemon.name);

        const pokemonId = document.createElement('div');
        pokemonId.classList.add('pokemon-id');
        pokemonId.textContent = `#${pokemon.id}`;

        const pokemonTypes = document.createElement('div');
        pokemonTypes.classList.add('pokemon-type');
        pokemon.types.forEach(typeInfo => {
            const typeElement = document.createElement('div');
            typeElement.textContent = typeInfo.type.name;
            typeElement.classList.add(`type-${typeInfo.type.name.toLowerCase()}`);
            pokemonTypes.appendChild(typeElement);
        });

        const pokemonStats = document.createElement('div');
        pokemonStats.classList.add('pokemon-stats');
        pokemonStats.style.display = 'flex'; // Utilisation de flexbox pour aligner les éléments en colonne
        pokemonStats.style.justifyContent = 'center';
        pokemonStats.style.gap = '10px';

        // Création des éléments pour la taille
        const heightLabel = document.createElement('span');
        heightLabel.textContent = 'Height:';
        heightLabel.style.display = 'flex';
        heightLabel.style.justifyContent = 'center';
        const heightValue = document.createElement('span');
        heightValue.textContent = `${pokemon.height / 10} m`;
        heightValue.style.display = 'flex';
        heightValue.style.justifyContent = 'center';

        // Création des éléments pour le poids
        const weightLabel = document.createElement('span');
        weightLabel.textContent = 'Weight:';
        weightLabel.style.display = 'flex';
        weightLabel.style.justifyContent = 'center';
        const weightValue = document.createElement('span');
        weightValue.textContent = `${pokemon.weight / 10} kg`;
        weightValue.style.display = 'flex';
        weightValue.style.justifyContent = 'center';

        // Ajout des éléments à pokemonStats
        const heightContainer = document.createElement('div');
        heightContainer.appendChild(heightLabel);
        heightContainer.appendChild(document.createElement('br')); // Retour à la ligne après heightLabel
        heightContainer.appendChild(heightValue);
        
        const weightContainer = document.createElement('div');
        weightContainer.appendChild(weightLabel);
        weightContainer.appendChild(document.createElement('br')); // Retour à la ligne après weightLabel
        weightContainer.appendChild(weightValue);

        pokemonStats.appendChild(heightContainer);
        pokemonStats.appendChild(weightContainer);

        pokemonCard.appendChild(pokemonImage);
        pokemonCard.appendChild(pokemonName);
        pokemonCard.appendChild(pokemonId);
        pokemonCard.appendChild(pokemonTypes);
        pokemonCard.appendChild(pokemonStats);

        pokemonContainer.appendChild(pokemonCard);
    });
};

// Fonction pour capitaliser la première lettre d'une chaîne de caractères
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const filterPokemon = () => {
    const nameValue = nameFilter.value.toLowerCase();
    const activeGenerationButtons = Array.from(generationButtons.querySelectorAll('button.active')).map(button => button.getAttribute('data-generation'));
    const activeTypeButtons = Array.from(typeButtons.querySelectorAll('button.active')).map(button => button.getAttribute('data-type'));

    const filteredPokemon = allPokemonData.filter(pokemon => {
        const nameMatch = pokemon.name.includes(nameValue);
        const generationMatch = !activeGenerationButtons.length || activeGenerationButtons.some(generationValue => 
            (generationValue === '1' && pokemon.id >= 1 && pokemon.id <= 151) ||
            (generationValue === '2' && pokemon.id >= 152 && pokemon.id <= 251) ||
            (generationValue === '3' && ((pokemon.id >= 252 && pokemon.id <= 386) || (pokemon.id >= 10001 && pokemon.id <= 10003) || (pokemon.id >= 10013 && pokemon.id <= 10015))) ||
            (generationValue === '4' && ((pokemon.id >= 387 && pokemon.id <= 493) || (pokemon.id >= 10004 && pokemon.id <= 10012))) ||
            (generationValue === '5' && ((pokemon.id >= 494 && pokemon.id <= 649) || (pokemon.id >= 10016 && pokemon.id <= 10024))) ||
            (generationValue === '6' && ((pokemon.id >= 650 && pokemon.id <= 721) || (pokemon.id >= 10025 && pokemon.id <= 10079) || (pokemon.id >= 10086 && pokemon.id <= 10090))) ||
            (generationValue === '7' && ((pokemon.id >= 722 && pokemon.id <= 809) || (pokemon.id >= 10100 && pokemon.id <= 10147) || pokemon.id === 10152 || (pokemon.id >= 10155 && pokemon.id <= 10157))) ||
            (generationValue === '8' && ((pokemon.id >= 810 && pokemon.id <= 905) || (pokemon.id >= 10161 && pokemon.id <= 10228) || pokemon.id === 10249)) ||
            (generationValue === '9' && ((pokemon.id >= 906 && pokemon.id <= 1025) || (pokemon.id >= 10250 && pokemon.id <= 10277))) ||
            (generationValue === 'mega' && ((pokemon.id >= 10033 && pokemon.id <= 10079) || (pokemon.id >= 10087 && pokemon.id <= 10090))) ||
            (generationValue === 'gmax' && pokemon.id >= 10195 && pokemon.id <= 10228) ||
            (generationValue === 'alola' && ((pokemon.id >= 10091 && pokemon.id <= 10092) || (pokemon.id >= 10100 && pokemon.id <= 10115))) ||
            (generationValue === 'galar' && pokemon.id >= 10161 && pokemon.id <= 10180) ||
            (generationValue === 'hisui' && pokemon.id >= 10229 && pokemon.id <= 10248) ||
            (generationValue === 'paldea' && pokemon.id >= 10250 && pokemon.id <= 10277) ||
            (generationValue === 'pikachu' && (pokemon.id === 25 || (pokemon.id >= 10080 && pokemon.id <= 10085) || (pokemon.id >= 10094 && pokemon.id <= 10099) || pokemon.id === 10148 || pokemon.id === 10158 || pokemon.id === 10160))
        );
        const typeMatch = !activeTypeButtons.length || pokemon.types.some(typeInfo => activeTypeButtons.includes(typeInfo.type.name));
        return nameMatch && generationMatch && typeMatch;
    });

    displayPokemon(filteredPokemon);
};

let allPokemonData = [];

const initializeApp = async () => {
    allPokemonData = await fetchAllPokemon();
    displayPokemon(allPokemonData);

    nameFilter.addEventListener('input', filterPokemon);
    generationButtons.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            event.target.classList.toggle('active');
            filterPokemon();
        }
    });
    typeButtons.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            event.target.classList.toggle('active');
            filterPokemon();
        }
    });
    toggleFiltersButton.addEventListener('click', () => {
        filterContainer.style.display = filterContainer.style.display === 'none' ? 'flex' : 'none';
    });
};

initializeApp();

// Get the button
const backToTopButton = document.getElementById('back-to-top');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
