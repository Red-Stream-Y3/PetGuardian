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
import {
  getAvailablePets,
  getDogs,
  getCats,
  getOtherAnimals,
} from '../../services/AdoptionServices';
import Toast from 'react-native-toast-message';
import ThemebackButton from '../common/ThemeBackButton';
import ThemeChip from '../common/ThemeChip';

const AdoptionList = ({ navigation }) => {
  const { user } = getAppContext();
  const { theme } = getThemeContext();
  const [pets, setPets] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  const [otherAnimals, setOtherAnimals] = useState([]);
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
      });
      setLoading(false);
    }
  };

  const fetchDogs = async () => {
    try {
      setLoading(true);
      const response = await getDogs();
      setDogs(response);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
      });
      setLoading(false);
    }
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
  const allPets = groupIntoPairs(pets.slice(0, 6));
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
    // headerContainer: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   paddingHorizontal: 16,
    //   height: 60, // Adjust the height according to your design

    //   elevation: 4, // Add elevation/shadow if needed
    // },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <ThemebackButton navigation={navigation} /> */}
        <Search
          navigation={navigation}
          text={searchText}
          onChangeText={handleSearch}
        />
        <FloatingMenuButton navigation={navigation} />
      </View>

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {loading && (
            <ActivityIndicator size={50} color={theme.colors.servicesPrimary} />
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}
          >
            <ThemeChip text="All" active={true} />
            <ThemeChip text="Dogs" />
            <ThemeChip text="Cats" />
            <ThemeChip text="Other" />
          </View>

          <PetsContainer2
            pairs={allPets}
            component="AdoptionList"
            screen="AdoptionList"
            fontSize={20}
            loading={loading}
          />
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default AdoptionList;

const styles = StyleSheet.create({});
