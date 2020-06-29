import React, {useCallback} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import {Card, Image, Button} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import getColorsPerType from '../../shared/utils/get_colors_per_type';

const PokemonCard = ({pokemon, navigation}) => {
  const getColors = useCallback(() => {
    return getColorsPerType(pokemon.types[0]);
  }, [pokemon]);
  const colors = getColors();
  return (
    <View style={styles.mainContainerStyle}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          navigation.navigate('Pokemon data', {idPokemon: pokemon.id});
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
    minHeight: 150,
    flex: 1,
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
