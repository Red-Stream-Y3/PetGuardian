import React, { Suspense } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';

import HomeContainer from './common/HomeContainer';
import Search from '../common/Search';
import { lostPetsData } from './pets';

const LostFoundHome = () => {
  const { theme } = getThemeContext();

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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Search />
      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView>
          <HomeContainer
            Header="Lost Pets"
            Pairs={lostPetsPairs}
            Page="LostHome"
          />
          <HomeContainer
            Header="Found Pets"
            Pairs={foundPetsPairs}
            Page="FoundHome"
          />
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default LostFoundHome;
