import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';
import {usePokemonIdState} from '../components/pokemon_id_provider';
import useFetch from 'use-http';
import {ProgressBar, Colors} from 'react-native-paper';

const BaseStatsScreen = props => {
  const pokemonId = usePokemonIdState();

  const {data = [], loading} = useFetch(
    `/pokemon/${pokemonId}`,
    {
      onNewData: (currPokemon, newPokemon) => {
        return {
          hp: newPokemon.stats.find(statItem => statItem.stat.name === 'hp')
            .base_stat,
          attack: newPokemon.stats.find(
            statItem => statItem.stat.name === 'attack',
          ).base_stat,
          defense: newPokemon.stats.find(
            statItem => statItem.stat.name === 'defense',
          ).base_stat,
          special_attack: newPokemon.stats.find(
            statItem => statItem.stat.name === 'special-attack',
          ).base_stat,
          special_defense: newPokemon.stats.find(
            statItem => statItem.stat.name === 'special-defense',
          ).base_stat,
          speed: newPokemon.stats.find(
            statItem => statItem.stat.name === 'speed',
          ).base_stat,
        };
      }, // appends newly fetched todos
    },
    [pokemonId],
  );

  return (
    <ScrollView style={styles.mainContainer}>
      {data && !loading && (
        <Grid style={styles.gridContainer}>
          <Row>
            <Col>
              <Text h4>Stats:</Text>
            </Col>
          </Row>
          <ListItem
            title="HP"
            subtitle={<ProgressBar progress={data.hp / 255} />}
          />
          <ListItem
            title="Attack"
            subtitle={<ProgressBar progress={data.attack / 190} />}
          />
          <ListItem
            title="Defense"
            subtitle={<ProgressBar progress={data.defense / 250} />}
          />
          <ListItem
            title="Special attack"
            subtitle={<ProgressBar progress={data.special_attack / 190} />}
          />
          <ListItem
            title="Special defense"
            subtitle={<ProgressBar progress={data.special_defense / 250} />}
          />
          <ListItem
            title="Speed"
            subtitle={<ProgressBar progress={data.speed / 180} />}
          />
        </Grid>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoFont: {
    fontSize: 16,
  },
  mainContainer: {
    backgroundColor: '#fff',
  },
  gridContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

export default BaseStatsScreen;
