import React, {useEffect, useState} from 'react';
import useFetch from 'use-http';
import {FlatList, ActivityIndicator, StyleSheet, View} from 'react-native';
import {ListItem, Text} from 'react-native-elements';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const {get, response, loading, error} = useFetch(
    'https://pokeapi.co/api/v2/',
  );

  useEffect(() => {
    loadInitialPokemon();
  }, []); // componentDidMount

  async function loadInitialPokemon() {
    const initialPokemon = await get('pokemon?limit=100&offset=0');
    const initialPokemonList = await Promise.all(
      initialPokemon.results.map(async (p, i) => {
        const id = p.url.split('/')[6];
        const pokemonData = await get(`pokemon/${id}`);
        return {
          name: p.name,
          url: p.url,
          image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
          types: pokemonData.types.map(type => `${type.type.name.toUpperCase()}`),
        };
      }),
    );
    if (response.ok) setPokemon(initialPokemonList);
  }

  const keyExtractor = (item, index) => index.toString();

  return (
    <React.Fragment>
      {error && <Text>Error!</Text>}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FC6C6D" />
        </View>
      )}
      {!loading && pokemon && (
        <FlatList
          keyExtractor={keyExtractor}
          data={pokemon}
          renderItem={({item}) => {
            let color;
            switch (item.types[0]) {
              case 'WATER':
                color = '#76BEFE';
                break;
              case 'FIRE':
                color = '#FC6C6D';
                break;
              case 'GRASS':
                color = '#49D0B0';
                break;
              case 'ELECTRIC':
                color = '#FFD86F';
                break;
              case 'POISON':
                color = '#7B538B';
                break;
              default:
                break;
            }
            return (
              <ListItem
                title={<Text>{item.name}</Text>}
                buttonGroup={{
                  buttons: item.types.map(type => {
                    return {
                      element: () => <Text key={item.name + type}>{type}</Text>,
                    };
                  }),
                }}
                leftAvatar={{rounded: true, source: {uri: item.image}}}
                containerStyle={{
                  backgroundColor: color,
                }}
              />
          )}}
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
    justifyContent: 'center'
  },
});

export default PokemonList;
