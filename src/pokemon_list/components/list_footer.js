import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const ListFooter = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating size="large" color="#FC6C6D" s/>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'relative',
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ListFooter;
