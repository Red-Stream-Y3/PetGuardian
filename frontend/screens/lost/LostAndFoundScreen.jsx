import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeContainer, Search, ThemeButton } from '../../components';

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

  // Helper function to group data into pairs
  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };

  const lostPetsPairs = groupIntoPairs(lostPetsData.slice(0, 4));
  const foundPetsPairs = groupIntoPairs(lostPetsData.slice(0, 4));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />

      <Search />

      <ScrollView>
        <HomeContainer Header="Lost Pets" Pairs={lostPetsPairs} />
        <HomeContainer Header="Found Pets" Pairs={foundPetsPairs} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LostAndFoundScreen;
