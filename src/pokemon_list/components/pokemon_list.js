import React, {useEffect, useState, useCallback, useRef} from 'react';
import useFetch from 'use-http';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-elements';
import PokemonCard from './pokemon_card';
import ListFooter from '../components/list_footer';
import {ActivityIndicator} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';

const parseRawPokemons = rawPokemons => {
  if (rawPokemons !== null) {
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
  } else {
    return Promise.reject('Something bad happened');
  }
};

const PokemonList = ({navigation}) => {
  let attempts = useRef(0);
  const [url, setUrl] = useState('pokemon?limit=10&offset=0');
  const [pokemons, setPokemons] = useState([]);
  const [loadingPokemons, setLoadingPokemons] = useState(false);

  const keyExtractor = (item, index) => index.toString();

  const {data = [], loading, error, get} = useFetch(
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
      retries: 2,
      // retryOn: [305]
      retryOn({attempt, error: retryError, response}) {
        attempts.current = attempt + 1;
        console.log('(retryOn) attempt', attempt);
        console.log('(retryOn) error', retryError);
        console.log('(retryOn) response', response);
        return response && response.status >= 300;
      },
      // retryDelay: 3000,
      retryDelay({attempt, error: retryDelayError, response}) {
        console.log('(retryDelay) attempt', attempt);
        console.log('(retryDelay) error', retryDelayError);
        console.log('(retryDelay) response (delay)', response);
        return 1000 * (attempt + 1);
      },
      onError() {
        Snackbar.show({
          text: 'Cannot fetch more pokemons. Check your internet connection.',
          duration: Snackbar.LENGTH_INDEFINITE,
          backgroundColor: '#FB3737',
          action: {
            text: 'TRY AGAIN',
            textColor: 'white',
            onPress: () => get(),
          },
        });
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
    if (data != null && !loading) {
      parsePokemons();
    }
  }, [data, loading]);

  return (
    <React.Fragment>
      {(loading || !loadingPokemons) && pokemons.length === 0 && !error && (
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
          ListFooterComponent={
            !loadingPokemons ? <ListFooter /> : <React.Fragment />
          }
        />
      )}
      {error && pokemons.length === 0 && (
        <View style={styles.errorWrapper}>
          <Text h4 h4Style={styles.errorText}>
            Error! Something bad happened, try again later or check your
            internet connection
          </Text>
          <View style={{marginTop: 40}} />
          <Button title="Try again" onPress={() => get()} />
        </View>
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
  errorText: {
    color: '#FB3737',
    textAlign: 'left',
  },
  listTitleStyle: {
    marginLeft: 8,
  },
  errorWrapper: {
    flex: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  loadingFooterStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PokemonList;
