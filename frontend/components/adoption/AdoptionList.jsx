import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import getThemeContext from '../../context/ThemeContext';
import AllPets from '../laf/common/AllPets';
import { lostPetsData } from '../laf/pets';

const AdoptionList = () => {
  const { theme } = getThemeContext();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AllPets title="Take us with You" data={lostPetsData} />
    </View>
  );
};

export default AdoptionList;

const styles = StyleSheet.create({});
