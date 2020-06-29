/**
 * Pokedex app
 * https://dribbble.com/shots/6545819-Pokedex-App
 *
 * @format
 * @flow strict-local
 */

import React, {Suspense} from 'react';
import StackNavigator from './src/stack_navigator';
import {Provider} from 'use-http';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {PokemonIdProvider} from './src/pokemon_data/components/pokemon_id_provider';
import {ThemeProvider} from 'react-native-elements';

const theme = {
  Button: {
    titleStyle: {
      fontFamily: 'monospace',
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

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
