import React, {useCallback} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {Card, Image, Button} from 'react-native-elements';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

const getColorsPerType = pokemon => {
  let color;
  let secondaryColor;
  switch (pokemon.types[0]) {
    case 'WATER':
      color = '#58A9F4';
      secondaryColor = '#6DC1F9';
      break;
    case 'ICE':
      color = '#9DD5FB';
      secondaryColor = '#B1DEFC';
      break;
    case 'DRAGON':
      color = '#9DD5FB';
      secondaryColor = '#B1DEFC';
      break;
    case 'STEEL':
      color = '#919AA1';
      secondaryColor = '#9CA4AB';
      break;
    case 'FIRE':
      color = '#FC6C6D';
      secondaryColor = '#FA8A7E';
      break;
    case 'FIGHTING':
      color = '#FC6C6D';
      secondaryColor = '#FA8A7E';
      break;
    case 'GRASS':
      color = '#49D0B0';
      secondaryColor = '#67D8C1';
      break;
    case 'ELECTRIC':
      color = '#FFD86F';
      secondaryColor = '#FDCE4C';
      break;
    case 'POISON':
      color = '#7B538B';
      secondaryColor = '#855996';
      break;
    case 'GHOST':
      color = '#7B538B';
      secondaryColor = '#855996';
      break;
    case 'DARK':
      color = '#31363A';
      secondaryColor = '#42484D';
      break;
    case 'BUG':
      color = '#52C1A9';
      secondaryColor = '#66D5BD';
      break;
    case 'GROUND':
      color = '#B0736D';
      secondaryColor = '#C28880';
      break;
    case 'ROCK':
      color = '#B0736D';
      secondaryColor = '#C28880';
      break;
    case 'NORMAL':
      color = '#e7a0ae';
      secondaryColor = '#EFBEC8';
      break;
    case 'FAIRY':
      color = '#e7a0ae';
      secondaryColor = '#EFBEC8';
      break;
    case 'PSYCHIC':
      color = '#e7a0ae';
      secondaryColor = '#EFBEC8';
      break;
    default:
      break;
  }
  return {color: color, secondaryColor: secondaryColor};
};

const PokemonCard = ({pokemon, navigation}) => {
  const getColors = useCallback(() => {
    return getColorsPerType(pokemon);
  }, [pokemon]);
  const colors = getColors();
  return (
    <View style={styles.mainContainerStyle}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          navigation.navigate('Pokemon data', {pokemonId: pokemon.id});
        }}>
        <Card
          title={pokemon.name}
          titleStyle={styles.cardTitleStyle}
          dividerStyle={styles.noneDisplayStyle}
          containerStyle={[styles.cardStyle, {backgroundColor: colors.color}]}>
          <Grid>
            <Col size={1} style={styles.centerContent}>
              {pokemon.types.map((type, i) => {
                return (
                  <Button
                    key={pokemon.name + type}
                    title={type}
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={[
                      styles.buttonStyle,
                      {backgroundColor: colors.secondaryColor},
                    ]}
                    containerStyle={styles.buttonContainerStyle}
                    raised={false}
                  />
                );
              })}
              {pokemon.types.length === 1 && (
                <Button
                  title={'not'}
                  buttonStyle={{backgroundColor: colors.color}}
                  titleStyle={{color: colors.color}}
                />
              )}
            </Col>
            <Col size={2}>
              <Image
                source={{uri: pokemon.image}}
                style={styles.pokemonImageStyle}
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator color={'white'} />}
              />
            </Col>
          </Grid>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
  },
  cardStyle: {
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  cardTitleStyle: {
    color: 'white',
  },
  noneDisplayStyle: {
    display: 'none',
  },
  centerContent: {
    justifyContent: 'center',
  },
  pokemonImageStyle: {
    width: 60,
    height: 60,
    marginHorizontal: 8,
  },
  buttonContainerStyle: {
    marginTop: 3,
    paddingHorizontal: 0,
  },
  buttonTitleStyle: {
    fontSize: 6,
    fontWeight: 'bold',
  },
});

export default PokemonCard;
