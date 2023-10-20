import axios from 'axios';
import React, { useState, Suspense, useEffect } from 'react';
import Search from '../common/Search';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import ImageItemCard from '../common/ImageItemCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import PetsContainer2 from './PetContainer2';
import { ScrollView } from 'react-native-gesture-handler';
import FloatingMenuButton from '../common/FloatingMenuButton';
import { getAvailablePets } from '../../services/AdoptionServices';
import Toast from 'react-native-toast-message';

const AdoptionHome = ({ navigation }) => {
  const { user } = getAppContext();
  const { theme } = getThemeContext();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);

  const getPets = async () => {
    try {
      setLoading(true);
      const response = await getAvailablePets();
      setPets(response);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error?.response?.data?.message || //axios error
          error.message || //js error
          'Could not get service providers', //default
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  // Helper function to group data into pairs
  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };

  const featuredPets = groupIntoPairs(pets.slice(0, 6));

  const handleSearch = async (text) => {
    setSearchText(text);

    // if (text === '') {
    //   await getProviders();
    //   return;
    // }

    setSearching(true);
    // try {
    //   const response = await searchServiceProviders(text, user.token);
    //   setProviders(response);
    //   setSearching(false);
    // } catch (error) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Error',
    //     text2: 'Could not get service providers',
    //   });
    // }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <View style={styles.container}>
      <Search
        navigation={navigation}
        text={searchText}
        onChangeText={handleSearch}
      />
      <FloatingMenuButton navigation={navigation} />
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
            uri={
              'https://img.freepik.com/free-photo/beagle-tricolor-puppy-is-posing-cute-white-braun-black-doggy-pet-is-sitting-red-background-looks-attented-sad-studio-photoshot-concept-motion-movement-action-negative-space_155003-33946.jpg?w=1380&t=st=1697734483~exp=1697735083~hmac=359055be5b822303fef51a2ba9c385ef6088e3e28cb785e404293f30187bcdf3'
            }
          />
          <PetsContainer2
            header="Find Your New Buddy"
            btnText="See All"
            pairs={featuredPets}
            component="AdoptionList"
            screen="AdoptionDetails"
            fontSize={20}
            loading={loading}
          />
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default AdoptionHome;
