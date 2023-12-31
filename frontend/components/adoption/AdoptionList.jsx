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

  const fetchCats = async () => {
    try {
      setLoading(true);
      const response = await getCats();
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

  const fetchOther = async () => {
    try {
      setLoading(true);
      const response = await getOtherAnimals();
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    header: {
      marginTop: 18,
      color: theme.colors.text,
      fontSize: 22,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Available Pets</Text>
      </View>

      <ThemebackButton navigation={navigation} />
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
            <ThemeChip
              text="All"
              active={true}
              clickable={true}
              onClick={getPets}
            />
            <ThemeChip
              text="Dogs"
              active={true}
              clickable={true}
              onClick={fetchDogs}
            />
            <ThemeChip
              text="Cats"
              active={true}
              clickable={true}
              onClick={fetchCats}
            />
            <ThemeChip
              text="Other"
              active={true}
              clickable={true}
              onClick={fetchOther}
            />
          </View>

          <PetsContainer2
            pairs={allPets}
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

export default AdoptionList;

const styles = StyleSheet.create({});
