import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const ImageSlider = ({ images }) => {
  return (
    <View style={styles.container}>
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
    width: width * 0.9,
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
    elevation: 8, // This is for Android shadow
  },
  wrapper: {
    height: 200, // Set your desired height for the image slider
    borderRadius: 20, // Set border radius for rounded corners
  },
  slide: {
    flex: 1,
    borderRadius: 20, // Set border radius for rounded corners
    overflow: 'hidden', // Hide the overflowing content due to border radius
  },
  image: {
    flex: 1,
    width: '100%',
  },
});

export default ImageSlider;
