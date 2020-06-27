import Pokedex from 'pokedex-promise-v2';

const options = {
  protocol: 'https',
  hostName: 'Pokedex',
  vesionPath: '/api/v2/',
  cacheLimit: 100 * 1000,
  timeout: 20 * 1000,
};

const API = new Pokedex(options);

export default API;
