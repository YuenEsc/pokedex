import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import PokemonListScreen from '../pokemon_list/screens/pokemon_list_screen';
import SettingsScreen from '../settings/screens/settings_screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';

const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor:'#FC6C6D' }}
        activeColor="#ffffff"
        inactiveColor="#FDAFAF">
        <Tab.Screen
          name="PokemonList"
          component={PokemonListScreen}
          options={{
            tabBarLabel: 'Pokémon',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="pokeball" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color}) => (
              <FeatherIcons name="settings" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
