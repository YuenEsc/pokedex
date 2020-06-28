import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import PokemonListScreen from '../pokemon_list/screens/pokemon_list_screen';
import PokemonDataScreen from '../pokemon_data/screens/pokemon_data_screen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pokedex" component={PokemonListScreen} />
      <Stack.Screen name="Pokemon data" component={PokemonDataScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
