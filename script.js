const pokemonImagem = document.querySelector("#pokemon-imagem");
const pokemonNome = document.querySelector("#pokemon-nome");
const pokemonTipos = document.querySelector("#pokemon-tipos");
const formulario = document.querySelector(".formulario");
const areaResultado = document.querySelector("#area-resultado");
const areaErro = document.querySelector("#area-erro");
const mensagemErro = document.querySelector("#mensagem-erro");
const inputPokemon = document.querySelector("#input-pokemon");
const btnBuscar = document.querySelector("#btn-buscar");


btnBuscar.addEventListener("click", function() {
    const nomePokemon = inputPokemon.value

    if (nomePokemon.trim() === "") {
        return
    }
    buscarPokemon(nomePokemon)
});

async function buscarPokemon(nome) {
    try {
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/" + nome);

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }
        const dados = await resposta.json();

        const nomePokemon = dados.name;
        const urlImagem = dados.sprites.front_default;
        const pokemonTipos = dados.types[0].type.name;

        pokemonImagem.setAttribute("src", urlImagem);
        pokemonNome.textContent = nomePokemon;
        areaResultado.classList.remove("oculto")

    } catch (erro) {
        areaErro.classList.remove("oculto");
        mensagemErro.textContent = erro.message;
    }
}
