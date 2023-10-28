import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import getThemeContext from '../../context/ThemeContext';

const PetCardPlay = ({ image, name, breed, age, weight }) => {
  const { theme } = getThemeContext();
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      <View style={styles.infoContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Text
            style={[styles.chip, { backgroundColor: theme.colors.playPrimary }]}
          >
            {name}
          </Text>
          <Text
            style={[styles.chip, { backgroundColor: theme.colors.playPrimary }]}
          >
            {breed}
          </Text>
          <Text
            style={[styles.chip, { backgroundColor: theme.colors.playPrimary }]}
          >
            {age}
          </Text>
          <Text
            style={[styles.chip, { backgroundColor: theme.colors.playPrimary }]}
          >
            {weight} kg
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {},
  image: {
    width: '100%',
    height: 250,
    borderRadius: 30,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
    overflow: 'scroll',
  },
  chip: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 100,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white',
  },
});

export default PetCardPlay;
