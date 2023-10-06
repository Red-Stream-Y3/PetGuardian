import React, { Suspense } from 'react';
import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import getThemeContext from '../../../context/ThemeContext';

import Header from '../../common/Header';
import { lostPetsData } from '../pets';
import SelectPets from '../../common/SelectPets';
import Details from './Details';

const LostPost = () => {
  const { theme } = getThemeContext();
  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };
  const lostPetsPairs = groupIntoPairs(lostPetsData);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title="New Post" />

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView>
          <SelectPets
            header="Select your pets"
            pairs={lostPetsPairs}
            component="LostPost"
            screen="Post"
            fontSize={14}
          />
        </ScrollView>

        <Details />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default LostPost;
