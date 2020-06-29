import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';
import {usePokemonIdState} from '../components/pokemon_id_provider';
import useFetch from 'use-http';

const AboutScreen = props => {
  const pokemonId = usePokemonIdState();

  const {data = [], loading} = useFetch(
    `/pokemon-species/${pokemonId}`,
    {
      onNewData: (currPokemon, newPokemon) => {
        return {
          description: newPokemon.flavor_text_entries.find(
            flavorTextItem => flavorTextItem.language.name === 'en',
          ),
          genera: newPokemon.genera.find(
            genusItem => genusItem.language.name === 'en',
          ),
          growth_rate: newPokemon.growth_rate.name,
          habitat: newPokemon.habitat.name,
          shape: newPokemon.shape.name,
          eggGroups: newPokemon.egg_groups.map(
            eggGroupsItem => `${eggGroupsItem.name}`,
          ),
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
              <Text h4>Description: </Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text>{`${data.description.flavor_text.replace(/\\\w/g, '')}`}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text h4 h4Style={styles.infoFont}>
                {'Genera: '}
              </Text>
            </Col>
            <Col size={2}>
              <Text style={styles.infoFont}>{data.genera.genus}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text h4 h4Style={styles.infoFont}>
                {'Growth rate: '}
              </Text>
            </Col>
            <Col size={2}>
              <Text style={styles.infoFont}>{data.growth_rate}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text h4 h4Style={styles.infoFont}>
                {'Shape: '}
              </Text>
            </Col>
            <Col size={2}>
              <Text style={styles.infoFont}>{data.shape}</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text h4 h4Style={styles.infoFont}>
                {'Egg groups: '}
              </Text>
            </Col>
            <Col size={2}>
              <Text style={styles.infoFont}>{data.eggGroups}</Text>
            </Col>
          </Row>
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

export default AboutScreen;
