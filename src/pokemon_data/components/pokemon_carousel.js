import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {View, Dimensions, StyleSheet, Platform} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
const pokeWidth = 120;

const MyCarousel = props => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  useEffect(() => {
    setEntries(Array.from(Array(746).keys(), k => k + 1));
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri: `https://pokeres.bastionbot.org/images/pokemon/${item -
              1}.png`,
          }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {props.idPokemon !== undefined && (
        <Carousel
          initialScrollIndex={props.idPokemon}
          getItemLayout={(data, index) => {
            return {
              length: screenWidth - pokeWidth,
              offset: (screenWidth - pokeWidth) * index,
              index: index,
            };
          }}
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - pokeWidth}
          data={entries}
          onSnapToItem={index => {
            if (props && props.onSnapToItem) {
              props.onSnapToItem(index);
            }
          }}
          renderItem={renderItem}
          hasParallaxImages={true}
        />
      )}
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
  },
  item: {
    width: screenWidth - pokeWidth,
    height: screenWidth - pokeWidth,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
});
