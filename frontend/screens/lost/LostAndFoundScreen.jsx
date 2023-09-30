import React from 'react';
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageItemCard, Search, ThemeButton } from '../../components';

const LostAndFoundScreen = () => {
  const { theme } = getThemeContext();

  const lostPetsData = [
    {
      _id: '1',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 1',
      age: '1 year',
      location: 'Lost Center A',
    },
    {
      _id: '2',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 2',
      age: '2 years',
      location: 'Central Park',
    },
    {
      _id: '3',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 3',
      age: '2 days',
      location: 'Central Park',
    },
    {
      _id: '4',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 4',
      age: '2 months',
      location: 'Central Park',
    },
    {
      _id: '5',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 5',
      age: '2',
      location: 'Central Park',
    },
  ];

  const foundPetsData = [
    {
      _id: '1',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 1',
      age: '2 years',
      location: 'Central Park',
    },
    {
      _id: '2',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 2',
      age: '2 years',
      location: 'Central Park',
    },
    {
      _id: '3',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 3',
      age: '2 days',
      location: 'Central Park',
    },
    {
      _id: '4',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 4',
      age: '2 months',
      location: 'Central Park',
    },
    {
      _id: '5',
      uri: 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
      title: 'Pet 5',
      age: '2',
      location: 'Central Park',
    },
  ];

  // Helper function to group data into pairs
  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };

  const limitItems = (data) => {
    return data.slice(0, 4);
  };

  const limitedLostPetsData = limitItems(lostPetsData);
  const limitedFoundPetsData = limitItems(foundPetsData);

  const lostPetsPairs = groupIntoPairs(limitedLostPetsData);
  const foundPetsPairs = groupIntoPairs(limitedFoundPetsData);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />

      <Search />

      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionHeader}>Lost Pets</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.cardContainer}>
            {lostPetsPairs.map((pair, index) => (
              <View style={styles.rowContainer} key={index}>
                {pair.map((item) => (
                  <ImageItemCard
                    key={item._id}
                    uri={item.uri}
                    title={item.title}
                    width="45%"
                    age={item.age}
                    location={item.location}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.sectionHeader}>Found Pets</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.cardContainer}>
            {foundPetsPairs.map((pair, index) => (
              <View style={styles.rowContainer} key={index}>
                {pair.map((item) => (
                  <ImageItemCard
                    key={item._id}
                    uri={item.uri}
                    title={item.title}
                    width="45%"
                    age={item.age}
                    location={item.location}
                  />
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  seeAllButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  seeAllText: {
    fontWeight: 'bold',
    color: '#808080',
  },
  cardContainer: {
    width: '100%',
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default LostAndFoundScreen;
