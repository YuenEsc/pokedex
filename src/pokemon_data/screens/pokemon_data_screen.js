import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, View, Dimensions, StyleSheet} from 'react-native';
import TabNavigator from '../components/tab_navigator';
import getColorsPerType from '../../shared/utils/get_colors_per_type';
import useFetch from 'use-http';
import PokemonCarousel from '../components/pokemon_carousel';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Text, Button} from 'react-native-elements';
import {useSetPokemonId} from '../components/pokemon_id_provider';

const PokemonDataScreen = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  const [idPokemon, setPokemonId] = useState(undefined);
  const [colors, setColors] = useState({
    color: '#ffffff',
    secondaryColor: '#ffffff',
  });
  const setPokemonIdForProvider = useSetPokemonId();

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (route.params?.idPokemon) {
      setPokemonId(route.params?.idPokemon);
      setPokemonIdForProvider(route.params?.idPokemon);
    }
  }, [route.params]);

  const {data = [], loading} = useFetch(
    `pokemon/${idPokemon}`,
    {
      onNewData: (currentPokemonData, newPokemonData) => {
        return {
          name: newPokemonData.name,
          order: newPokemonData.order,
          types: newPokemonData.types.map(
            typeItem => `${typeItem.type.name.toUpperCase()}`,
          ),
        };
      }, // appends newly fetched todos
    },
    [idPokemon],
  ); // runs onMount AND whenever the `page` updates (onUpdate)

  useEffect(() => {
    if (data && data.types) {
      const typeColors = getColorsPerType(data?.types[0]);
      setColors(currTypeColors => typeColors);
      handleOpen();
    }
  }, [data]);

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
        <Grid style={[styles.uperLayer, {backgroundColor: colors.color}]}>
          <Row style={{height: Dimensions.get('window').height / 10}}>
            <Col size={3}>
              <Text
                h3
                h3Style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 10,
                }}>
                {data.name}
              </Text>
            </Col>
            <Col size={1}>
              <Text
                h3
                h3Style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 10,
                }}>
                #{data.order}
              </Text>
            </Col>
          </Row>
          <Row style={{justifyContent: 'space-between'}}>
            <Col />
            {data &&
              data.types &&
              data.types.map((type, i) => {
                return (
                  <Col>
                    <Button
                      key={data.name + type}
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
