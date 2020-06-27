import API from './pokedex';

const fetchPokemonList = (offset, limit) => {
  return API.getPokemonsList({offset, limit});
};

export default fetchPokemonList;
