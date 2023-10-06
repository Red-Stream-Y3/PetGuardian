import React, { Suspense } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import getThemeContext from '../../context/ThemeContext';

import Search from '../common/Search';
import PetsContainer from '../common/PetsContainer';
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
      <Search profile={true} />
      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView>
          <PetsContainer
            header="Lost Pets"
            btnText="See All"
            pairs={lostPetsPairs}
            component="LostHome"
            screen="Post"
            fontSize={16}
          />
          <PetsContainer
            header="Found Pets"
            btnText="See All"
            pairs={foundPetsPairs}
            component="FoundHome"
            screen="Post"
            fontSize={16}
          />
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default LostFoundHome;
