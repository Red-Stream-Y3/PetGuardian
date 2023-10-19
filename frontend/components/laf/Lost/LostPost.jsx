import React, { Suspense, useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, ScrollView } from 'react-native';
import getThemeContext from '../../../context/ThemeContext';
import { getAppContext } from '../../../context/AppContext';

import Header from '../../common/Header';
import SelectPets from '../../common/SelectPets';
import LostDetails from './LostDetails';
import MarkerTitle from '../../common/MarkerTitle';
import { getPetsByUser } from '../../../services/PetServices';

const LostPost = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    const response = await getPetsByUser(user._id, user.token);
    setPets(response);
  };

  useEffect(() => {
    getPets();
  }, []);

  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };

  const petsPairs = groupIntoPairs(pets);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.background
      }}
    >
      <View style={{ flex: 1 }}>
        <Header title="New Post" save={true} />

        <Suspense fallback={<ActivityIndicator />}>
          <SelectPets
            header="Select your pets"
            pairs={petsPairs}
            component="LostPost"
            screen="PetProfile"
            fontSize={14}
          />

          <LostDetails />

          <MarkerTitle />
        </Suspense>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default LostPost;
