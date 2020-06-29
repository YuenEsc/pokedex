import React, {useEffect, useState, useCallback, Suspense} from 'react';
import useFetch from 'use-http';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import PokemonCard from './pokemon_card';
import ListFooter from '../components/list_footer';
import {ActivityIndicator} from 'react-native-paper';

const parseRawPokemons = rawPokemons => {
  return Promise.all(
    rawPokemons.map(async (p, i) => {
      const id = p.url.split('/')[6];
      const types = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(result => result.json())
        .then(data =>
          data.types.map(typeItem => `${typeItem.type.name.toUpperCase()}`),
        );
      const name =
        p.name.charAt(0).toUpperCase() + p.name.substring(1, p.name.length);
      return {
        id,
        name,
        url: p.url,
        image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        types: types,
      };
    }),
  );
};

const PokemonList = ({navigation}) => {
  const [url, setUrl] = useState('pokemon?limit=10&offset=0');
  const [pokemons, setPokemons] = useState([]);
  const [isEndReached, toggleEndReached] = useState(false);
  const [loadingPokemons, setLoadingPokemons] = useState(false);

  const keyExtractor = (item, index) => index.toString();

  const {data = [], loading, response} = useFetch(
    url,
    {
      onNewData: (currPokemons, newPokemons) => {
        return {
          count: newPokemons.count,
          next: newPokemons.next,
          results:
            currPokemons != null
              ? [...currPokemons.results, ...newPokemons.results]
              : newPokemons.results,
        };
      },
      perPage: 10,
    },
    [url],
  );

  const parsePokemons = useCallback(async () => {
    setLoadingPokemons(true);
    const parsedPokemons = await parseRawPokemons(data.results);
    setPokemons(parsedPokemons);
    setLoadingPokemons(false);
  }, [data.results]);

  useEffect(() => {
    parsePokemons();
  }, [parsePokemons]);

  return (
    <React.Fragment>
      {loading && pokemons.length === 0 && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FC6C6D" />
        </View>
      )}
      {pokemons && (
        <FlatList
          keyExtractor={keyExtractor}
          refreshing={loading}
          onEndReachedThreshold={0.7}
          data={pokemons}
          numColumns={2}
          renderItem={({item}) => (
            <PokemonCard pokemon={item} navigation={navigation} />
          )}
          onEndReached={() => {
            if (pokemons.length !== 0 && data.next) {
              setUrl(data.next);
            }
          }}
          ListFooterComponent={<ListFooter />}
        />
      )}
    </React.Fragment>
  );
};

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
