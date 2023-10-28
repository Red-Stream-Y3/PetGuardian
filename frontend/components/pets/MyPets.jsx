import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import { getPetsByUser } from '../../services/PetServices';
import CardWithProfile from '../common/CardWithProfile';

import Toast from 'react-native-toast-message';
import FloatingMenuButton from '../common/FloatingMenuButton';
const MyPets = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const navigation = useNavigation();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      const data = await getPetsByUser(user._id);
      console.log(data);
      setPets(data);
      setLoading(false);
    };
    fetchPets();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      const fetchPets = async () => {
        const data = await getPetsByUser(user._id);
        setPets(data);
        setLoading(false);
      };
      fetchPets();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <FloatingMenuButton navigation={navigation} />

        <View style={styles.headerContainer}>
          <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>
            My Pets
          </Text>
        </View>

        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.playPrimary} />
          ) : (
            <View style={styles.scrollView}>
              {pets.map((pet) => (
                <CardWithProfile
                  key={pet._id}
                  image={pet.image[0]}
                  profileImage={pet.image[0]}
                  name={pet.name}
                  location={pet.breed}
                  type={pet.type}
                  onPress={() =>
                    navigation.navigate('ViewPet', {
                      petId: pet._id,
                    })
                  }
                />
              ))}
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.nearMeButton,
                { backgroundColor: theme.colors.playPrimary },
              ]}
              onPress={() => navigation.navigate('CreatePet')}
            >
              <Text style={styles.nearMeText}>Add Pet</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'left',
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nearMeButton: {
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  nearMeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default MyPets;
