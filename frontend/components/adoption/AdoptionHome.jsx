import axios from 'axios';
import React, { useState, Suspense } from 'react';
import Search from '../common/Search';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import ImageItemCard from '../common/ImageItemCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import PetsContainer from '../common/PetsContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { lostPetsData } from '../laf/pets';

const AdoptionHome = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { SERVER_URL } = getAppContext();
  const [loading, setLoading] = useState(false);

  // Helper function to group data into pairs
  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };

  const featuredPets = groupIntoPairs(lostPetsData.slice(0, 6));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <Search navigation={navigation} />

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {loading && (
            <ActivityIndicator size={50} color={theme.colors.servicesPrimary} />
          )}
          <ImageItemCard
            width={Dimensions.get('window').width * 0.9}
            uri={'https://wallpapercave.com/wp/wp4928162.jpg'}
          />

          <PetsContainer
            header="Find Your Next Buddy"
            btnText="See All"
            pairs={featuredPets}
            component="AdoptionList"
            screen="AdoptionList"
            fontSize={18}
          />
        </ScrollView>
      </Suspense>
    </SafeAreaView>
  );
};

export default AdoptionHome;
