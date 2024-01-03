const API_Pokemon = "https://pokeapi.co/api/v2/pokemon/";
const pokemonContainer = document.getElementById('showPokemon')
const containerModal = document.getElementById('Container-Modal')

for(let i = 1; i <= 151; i++) {
    fetch(API_Pokemon + i)
    .then(res => res.json())
    .then(data => {
        pokemonInfo(data)
    })
}

const pokemonInfo = (data) => {
    console.log(data)
    const typePokemonClass = {
        water: 'water',
        grass: 'grass',
        poison: 'poison',
        bug: 'bug',
        electric: 'electric',
        normal: 'normal',
        fairy: 'fairy',
        fighting: 'fighting',
        psychic: 'psychic',
      };

    const divPokemon = document.createElement('div');
    divPokemon.classList.add("col-12", "col-md-4", "my-2");

    divPokemon.innerHTML = `
    <div class="card text-center rounded-5" style="width: 18rem;">
        <img src="${data.sprites.front_default}" id="imagePokemon" class="card-img-top" alt="Pokemon ${data.name}">
        <div class="card-body">
            <h5 class="card-title fw-bold" id="Name">${data.name.toUpperCase()}</h5>
            <p class="card-text"></p>
            <div class="Container-Button-types">
                <button class="Button-type ${typePokemonClass[data.types[0].type.name]}">${data.types[0].type.name}</button>
            </div>
        </div>
    </div>
    `;

    pokemonContainer.append(divPokemon);
}

const Send = async () => {
    const pokemonNames = [];

    const infoPokemon = []

    const fetchPromises = [];

    for (let i = 1; i <= 151; i++) {
        const fetchPromise = fetch(API_Pokemon + i)
            .then(res => res.json())
            .then(data => {
                pokemonNames.push(data.name);
                infoPokemon.push(data)
            });

        fetchPromises.push(fetchPromise);
    }

    await Promise.all(fetchPromises);

    SearchPokemon(pokemonNames, infoPokemon);
};

const SearchPokemon = (name, data) => {
    console.log(name)
    console.log(data)

    const valueInputSearch = document.getElementById('searchInput').value;

    const nameFind = name.find((element) => element === valueInputSearch.toLowerCase())

    const findIndex = name.findIndex((element) => element === valueInputSearch.toLowerCase())

    if (nameFind !== undefined && findIndex !== undefined) {
        findedPokemon(data[findIndex])  
    } else {
        Swal.fire({
        title: "Advertencia",
        html: '<span class="text-secondary"> Ups!! Pokemon no encontrado </span>',
        icon: "warning",
        confirmButtonText: "Volver",
        footer:
        '<span class="text-secondary"> Verifica tu busqueda:( </span>',
        allowOutsideClick: false,
        buttonsStyling: false,
        customClass: {
            popup: "bg-dark rounded-5",
            confirmButton: "Button"
        },
    })
    }
}

const findedPokemon = (data) => {
    const divPokemon = document.createElement('div');
    divPokemon.classList.add("Modal");

    containerModal.style.display = "grid";

    let longitudId = ``

    longitudId = data.id >= 10 ? `#0${data.id}` : `#00${data.id}`

    divPokemon.innerHTML = `
    <div class="card rounded-5" style="width: 100%;">
        <img src="${data.sprites.front_default}" id="imagePokemon" class="card-img-top" alt="Pokemon ${data.name}">
        <div class="card-body">
            <h5 class="card-title fw-bold" id="Name"><span class="opacity-50">${longitudId} </span>${data.name.toUpperCase()}</h5>
            <p class="card-text">${data.height}M ${data.weight}KG</p>
            <div class="Container-Button-types">
                <button class="Button-type">${data.types[0].type.name}</button>
                <button class="btn btn-outline-success" onclick="ModalClose()">Cerrar</button>
            </div>
        </div>
    </div>
    `;

    containerModal.append(divPokemon)
}

const ModalClose = () => {
    containerModal.style.display = "none";
}