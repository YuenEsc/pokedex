import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {ScrollView} from 'react-native-gesture-handler';
import {usePokemonIdState} from '../components/pokemon_id_provider';
const AboutScreen = props => {
  const pokemonId = usePokemonIdState();

  return (
    <ScrollView>
      <Grid>
        <Row>
          <Col>
            <Text>{JSON.stringify(pokemonId)}</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </Text>
          </Col>
        </Row>
      </Grid>
    </ScrollView>
  );
};

export default AboutScreen;
