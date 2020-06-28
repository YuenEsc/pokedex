import React, {useEffect, useState, useCallback} from 'react';
import useFetch from 'use-http';
import {FlatList, ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import PokemonCard from './pokemon_card';

function PokemonList({navigation}) {
  const [pokemon, setPokemon] = useState([]);
  const [isEndReached, toggleEndReached] = useState(false);
  const [url, setUrl] = useState('pokemon?limit=10&offset=0');
  const {get, response, loading, error} = useFetch(
    'https://pokeapi.co/api/v2/',
  );

  useEffect(
    (url, isEndReached) => {
      if ((isEndReached || pokemon.length === 0) && !loading) {
        loadPokemon();
      }
    },
    [url, isEndReached, pokemon.length, loadPokemon, loading],
  ); // componentDidMount

  const loadPokemon = useCallback(async () => {
    const rawPokemonList = await get(url);
    const pokemonList = await Promise.all(
      rawPokemonList.results.map(async (p, i) => {
        const id = p.url.split('/')[6];
        const pokemonData = await get(`pokemon/${id}`);
        const name =
          p.name.charAt(0).toUpperCase() + p.name.substring(1, p.name.length);
        return {
          id,
          name,
          url: p.url,
          image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
          types: pokemonData.types.map(
            type => `${type.type.name.toUpperCase()}`,
          ),
        };
      }),
    );
    if (response.ok) {
      const nextUrl = rawPokemonList.next.split('/')[5];
      setUrl(nextUrl);
      setPokemon([...pokemon, ...pokemonList]);
    }
  }, [pokemon, response.ok, get, url]);

  const keyExtractor = (item, index) => index.toString();

  return (
    <React.Fragment>
      {error && <Text>{JSON.stringify(error)}</Text>}
      {loading && pokemon.length === 0 && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FC6C6D" />
        </View>
      )}
      {pokemon && (
        <FlatList
          ListFooterComponent={
            isEndReached &&
            loading && (
              <View style={styles.loadingFooterStyle}>
                <ActivityIndicator />
              </View>
            )
          }
          keyExtractor={keyExtractor}
          data={pokemon}
          numColumns={2}
          renderItem={({item}) => (
            <PokemonCard pokemon={item} navigation={navigation} />
          )}
          onEndReached={async () => {
            toggleEndReached(true);
            await loadPokemon();
            toggleEndReached(false);
          }}
        />
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitleStyle: {
    marginLeft: 8,
  },
  loadingFooterStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokemonList;
