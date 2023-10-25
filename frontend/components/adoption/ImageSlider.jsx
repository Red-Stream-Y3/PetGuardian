import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const ImageSlider = ({ images, widthX }) => {
  const setWidth = widthX ? width * widthX : width * 0.9;
  return (
    <View style={[styles.container, { width: setWidth }]}>
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        {images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: setWidth,
    height: 180,
    borderRadius: 20,
    shadowColor: '#000',
    marginTop: 5,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  wrapper: {
    height: 200,
    borderRadius: 20,
  },
  slide: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
  },
});

export default ImageSlider;
