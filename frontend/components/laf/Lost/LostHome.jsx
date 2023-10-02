import React, { Suspense, useState } from 'react';
import { ActivityIndicator, View, ScrollView } from 'react-native';
import getThemeContext from '../../../context/ThemeContext';
import { Header, HomeContainer } from '../../../components';
import { lostPetsData } from '../pets';

const LostHome = () => {
  const { theme } = getThemeContext();
  const [filter, setFilter] = useState('All');

  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };

  const petTypes = [...new Set(lostPetsData.map((pet) => pet.petType))]; // Get unique pet types

  const filteredLostPetsData = lostPetsData.filter((pet) => {
    if (filter === 'All') {
      return true;
    }
    return pet.petType === filter;
  });

  const lostPetsPairs = groupIntoPairs(filteredLostPetsData);

  const handleFilterPress = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title="Lost Pets"
        petTypes={petTypes}
        onFilterPress={handleFilterPress}
      />
      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView>
          <HomeContainer Pairs={lostPetsPairs} Page="LostHome" />
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default LostHome;
