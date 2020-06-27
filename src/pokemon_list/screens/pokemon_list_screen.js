import React from 'react';
import {SafeAreaView} from 'react-native';
import PokemonList from '../components/pokemon_list';

export default function PokemonListScreen() {
  return (
    <SafeAreaView>
      <PokemonList />
    </SafeAreaView>
  );
}
