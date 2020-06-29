import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {usePokemonIdState} from '../components/pokemon_id_provider';
import useFetch from 'use-http';
import {ProgressBar, Colors} from 'react-native-paper';

const MovesScreen = props => {
  const pokemonId = usePokemonIdState();

  const {data = [], loading} = useFetch(
    `/pokemon/${pokemonId}`,
    {
      onNewData: (currPokemon, newPokemon) => {
        return {
          moves: newPokemon.moves.map(moveItem => ({
            name: `${moveItem.move.name}`,
          })),
        };
      }, // appends newly fetched todos
    },
    [pokemonId],
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      {data && data.moves && !loading && (
        <FlatList
          keyExtractor={(item, i) => item.name}
          data={data.moves}
          renderItem={({item}) => <ListItem title={item.name} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoFont: {
    fontSize: 16,
  },
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  gridContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

export default MovesScreen;
