import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonListScreen from '../pokemon_list/screens/pokemon_list_screen';
import PokemonDataScreen from '../pokemon_data/screens/pokemon_data_screen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokemonListScreen}
        options={{
          headerTintColor: '#fffff',
          headerStyle: {backgroundColor: '#FB4B4B'},
          headerTitleStyle: {color: '#ffffff'},
          headerBackTitleStyle: {color: '#ffffff'},
        }}
      />
      <Stack.Screen
        name="Pokemon data"
        component={PokemonDataScreen}
        options={{
          headerTintColor: '#fffff',
          headerStyle: {backgroundColor: '#FB4B4B'},
          headerTitleStyle: {color: '#ffffff'},
          headerBackTitleStyle: {color: '#ffffff'},
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
