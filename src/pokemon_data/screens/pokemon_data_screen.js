import React, {useState} from 'react';
import {Backdrop} from 'react-native-backdrop';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import TabNavigator from '../components/tab_navigator';
import {ListItem} from 'react-native-elements';

const PokemonDataScreen = () => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          activeOpacity={0.6}
          un
          style={{
            width: 200,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 1,
            backgroundColor: '#fff',
          }}>
          <Text>Handle Backdrop</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Backdrop
        visible={visible}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onClose={() => {}}
        swipeConfig={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        animationConfig={{
          speed: 14,
          bounciness: 4,
        }}
        overlayColor="rgba(0,0,0,0.0)"
        backdropStyle={{
          backgroundColor: '#fff',
        }}
        containerStyle={styles.backdropContainer}
       >
        {/* <TabNavigator /> */}
        <View
          style={{
            height: Dimensions.get('screen').height / 2,
          }}>
          <TabNavigator />
        </View>
      </Backdrop>
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
  backdropContainer: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
  },
});

export default PokemonDataScreen;
