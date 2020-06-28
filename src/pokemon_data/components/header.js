import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <React.Fragment>
      <View style={styles.header}>
        <View style={styles.containerHeader}>
          <View style={styles.tabContainer}>
            <View>
              <Text>About</Text>
            </View>
            <View>
              <Text>Base Stats</Text>
            </View>
            <View>
              <Text>Evolution</Text>
            </View>
            <View>
              <Text>Moves</Text>
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
    justifyContent: 'space-around',
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
});

export default Header;
