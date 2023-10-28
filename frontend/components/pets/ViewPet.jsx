import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PetCardPlay from '../common/PetCardPlay';
import { getPetById } from '../../services/PetServices';
import getThemeContext from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { getAppContext } from '../../context/AppContext';

const ViewPet = ({ route }) => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const navigation = useNavigation();
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = route.params;
  console.log(id);

  useEffect(() => {
    const fetchPet = async () => {
      const data = await getPetById(id);
      setPet(data);
      setLoading(false);
    };
    fetchPet();
    console.log(pet);
  }, []);

  // reload pet when returning from update
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchPet = async () => {
        const data = await getPetById(id);
        setPet(data);
        setLoading(false);
        console.log(pet);
      };
      fetchPet();
    });

    return unsubscribe;
  }, [navigation]);

  const deletePetHandler = async () => {
    try {
      await deletePet(id);
      navigation.goBack();
    } catch (error) {
      console.log('Error deleting pet:', error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: theme.background }}>
      {!loading && (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Pet Profile</Text>
          </View>
          <View style={styles.profileCard}>
            <PetCardPlay
              image={pet.image[0]}
              name={pet.name}
              breed={pet.breed}
              age={pet.age}
              weight={pet.weight}
            />
          </View>
          <View
            style={[
              styles.textContainer,
              { backgroundColor: theme.colors.surface },
            ]}
          >
            <Text style={[styles.text, { color: theme.colors.text }]}>
              {pet.description}
            </Text>
          </View>

          <View style={styles.editDeleteContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.colors.adoptPrimary },
              ]}
              onPress={deletePetHandler}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: theme.colors.playPrimary },
              ]}
              onPress={() => {
                navigation.navigate('UpdatePet', { id: id });
              }}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileCard: {
    marginVertical: 20,
  },
  textContainer: {
    width: '100%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: '#71a5de',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
  },
  editDeleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '48%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});

export default ViewPet;
