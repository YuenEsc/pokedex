/**
 * Pokedex app
 * https://dribbble.com/shots/6545819-Pokedex-App
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import StackNavigator from './src/stack_navigator';
import {Provider} from 'use-http';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PokemonIdProvider} from './src/pokemon_data/components/pokemon_id_provider';
import {ThemeProvider} from 'react-native-elements';

const theme = {
  Button: {
    titleStyle: {
      fontFamily: 'Roboto',
    },
  },
};

const App = () => {
  return (
    <Provider url="https://pokeapi.co/api/v2/">
      <PokemonIdProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </PokemonIdProvider>
    </Provider>
  );
};

export default App;
