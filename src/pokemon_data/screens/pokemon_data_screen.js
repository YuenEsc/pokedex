import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, View, Dimensions, StyleSheet} from 'react-native';
import TabNavigator from '../components/tab_navigator';
import getColorsPerType from '../../shared/utils/get_colors_per_type';
import useFetch from 'use-http';
import PokemonCarousel from '../components/pokemon_carousel';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, Button} from 'react-native-elements';
import {useSetPokemonId} from '../components/pokemon_id_provider';
import Snackbar from 'react-native-snackbar';

const PokemonDataScreen = ({navigation, route}) => {
  let attempts = useRef(0);
  const [idPokemon, setPokemonId] = useState(undefined);
  const [colors, setColors] = useState({
    color: '#ffffff',
    secondaryColor: '#ffffff',
  });
  const setPokemonIdForProvider = useSetPokemonId();

  useEffect(() => {
    if (route?.params?.idPokemon !== undefined) {
      setPokemonId(route?.params?.idPokemon);
      setPokemonIdForProvider(route?.params?.idPokemon);
    }
  }, [route, route.params]);

  const {data = [], loading, get} = useFetch(
    idPokemon ? `pokemon/${idPokemon}` : '',
    {
      onNewData: (currentPokemonData, newPokemonData) => {
        if (newPokemonData && newPokemonData?.name) {
          return {
            name:
              newPokemonData?.name?.charAt(0)?.toUpperCase() +
              newPokemonData.name?.substring(1, newPokemonData?.name?.length),
            order: newPokemonData?.order,
            types: newPokemonData?.types?.map(
              typeItem => `${typeItem?.type?.name.toUpperCase()}`,
            ),
          };
        } else if (currentPokemonData && currentPokemonData?.name) {
          return {
            name:
              currentPokemonData?.name?.charAt(0)?.toUpperCase() +
              currentPokemonData?.name?.substring(
                1,
                currentPokemonData?.name?.length,
              ),
            order: currentPokemonData?.order,
            types: currentPokemonData?.types?.map(
              typeItem => `${typeItem?.type?.name?.toUpperCase()}`,
            ),
          };
        }
        return [];
      }, // appends newly fetched todos
      retries: 0,
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
      onError(error) {
        console.log(JSON.stringify(error));
        Snackbar.show({
          text: 'Cannot fetch pokemon data. Check your internet connection.',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#FB3737',
          action: {
            text: 'TRY AGAIN',
            textColor: 'white',
            onPress: () => get(),
          },
        });
      },
    },
    [idPokemon],
  ); // runs onMount AND whenever the `page` updates (onUpdate)

  useEffect(() => {
    if (idPokemon && data && data.types) {
      const typeColors = getColorsPerType(data?.types[0]);
      setColors(currTypeColors => typeColors);
    }
  }, [data, idPokemon]);

  return (
    <React.Fragment>
      <View style={styles.overlay}>
        <PokemonCarousel
          idPokemon={idPokemon}
          onSnapToItem={newId => {
            setPokemonId(newId);
            setPokemonIdForProvider(newId);
          }}
        />
      </View>
      <SafeAreaView style={[styles.scene]}>
        {idPokemon && data && data?.name && (
          <Grid style={[styles.uperLayer, {backgroundColor: colors.color}]}>
            <Row style={{height: Dimensions.get('window').height / 10}}>
              <Col size={3}>
                <Text h3 h3Style={styles.h3Style}>
                  {data?.name}
                </Text>
              </Col>
              <Col size={1}>
                <Text h3 h3Style={styles.numberStyle}>
                  #{data?.order}
                </Text>
              </Col>
            </Row>
            <Row style={styles.rowContainer}>
              <Col />
              {data &&
                data?.types &&
                data?.types?.map((type, i) => {
                  return (
                    <Col>
                      <Button
                        key={data?.name + type}
                        title={type}
                        titleStyle={styles.buttonTitleStyle}
                        buttonStyle={[
                          styles.buttonStyle,
                          {backgroundColor: colors.secondaryColor},
                        ]}
                        containerStyle={styles.buttonContainerStyle}
                        raised={false}
                      />
                    </Col>
                  );
                })}
              <Col />
            </Row>
          </Grid>
        )}
      </SafeAreaView>
      <View style={styles.bottomLayer}>
        <TabNavigator />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  bottomLayer: {
    paddingTop: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get('window').height / 2,
    position: 'absolute',
    left: 0,
    right: 0,
    top: Dimensions.get('window').height / 2,
    bottom: 0,
    flex: 2,
  },
  buttonContainerStyle: {
    paddingHorizontal: 4,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    justifyContent: 'space-between',
  },
  h3Style: {
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  numberStyle: {
    color: 'white',
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 35,
  },
  textContainer: {
    marginTop: 70,
  },
  textWhite: {
    color: 'black',
    marginVertical: 10,
  },
  tabContainer: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 10,
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#eef',
    flexDirection: 'column',
  },
  childContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100,
  },
  header: {
    backgroundColor: 'cyan',
    width: '100%',
    height: '15%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: Dimensions.get('window').height / 6,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4,
    elevation: 4,
    height: Dimensions.get('window').height / 2.5,
  },
});

export default PokemonDataScreen;
