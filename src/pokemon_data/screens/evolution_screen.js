import React from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {ListItem, Text, Image} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';
import {usePokemonIdState} from '../components/pokemon_id_provider';
import useFetch from 'use-http';
import {ProgressBar, Colors} from 'react-native-paper';

const parseEvolutionChain = chain => {
  let evoChain = [];
  let evoData = chain;
  do {
    let numberOfEvolutions = evoData['evolves_to'].length;
    evoChain.push({
      species_name: evoData?.species?.name,
      image: evoData?.species.url.split('/')[6]
        ? `https://pokeres.bastionbot.org/images/pokemon/${
            evoData?.species.url.split('/')[6]
          }.png`
        : undefined,
      id: evoData?.species.url.split('/')[6],
      min_level: evoData?.min_level ? evoData?.min_level : 0,
      trigger_name: evoData?.trigger?.name,
      item: evoData?.item,
    });
    if (numberOfEvolutions > 0) {
      for (let i = 0; i < numberOfEvolutions; i++) {
        evoChain.push({
          species_name: evoData?.evolves_to[i]?.species.name,
          id: evoData?.evolves_to[i]?.species.url.split('/')[6],
          image: evoData?.evolves_to[i]?.species.url.split('/')[6]
            ? `https://pokeres.bastionbot.org/images/pokemon/${
                evoData?.evolves_to[i]?.species.url.split('/')[6]
              }.png`
            : undefined,
          min_level: evoData?.evolves_to[i]?.evolution_details[0]?.min_level,
          trigger_name: evoData.evolves_to[i]?.trigger?.name,
          item: evoData?.evolves_to[i]?.item,
        });
      }
    }
    evoData = evoData['evolves_to'][0];
  } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
  evoChain = evoChain.reduce(function(result, value, index, array) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
  return evoChain;
};

const EvolutionScreen = props => {
  const pokemonId = usePokemonIdState();

  const {data = [], loading} = useFetch(
    `/evolution-chain/${Math.ceil((pokemonId) / 3)}`,
    {
      onNewData: (currPokemon, newPokemon) => {
        const evolutions = parseEvolutionChain(newPokemon.chain);
        return evolutions;
      }, // appends newly fetched todos
    },
    [pokemonId],
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      {data && !loading && (
        <FlatList
          keyExtractor={(item, i) => item.name}
          data={data}
          renderItem={({item}) => {
            if (item.length == 2) {
              return (
                <ListItem
                  leftAvatar={{source: {uri: item[0].image}}}
                  title={'Evolves to'}
                  rightAvatar={{source: {uri: item[1].image}}}
                  subtitle={`At level ${item[1].min_level}`}
                />
              );
            } else {
              return <React.Fragment />;
            }
          }}
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

export default EvolutionScreen;
