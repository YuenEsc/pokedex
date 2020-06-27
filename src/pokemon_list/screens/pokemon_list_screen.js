import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import PokemonList from '../components/pokemon_list';

export default function PokemonListScreen() {
  return (
    <SafeAreaView style={styles.MainContainer}>
      <PokemonList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
});
