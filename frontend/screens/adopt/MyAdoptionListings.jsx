import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from 'react-native';
import { FloatingMenuButton, ThemeBackButton } from '../../components';
import React, { Suspense, useState, useEffect } from 'react';
import { getAppContext } from '../../context/AppContext';
import getThemeContext from '../../context/ThemeContext';
import ThemebackButton from '../../components/common/ThemeBackButton';
import { getPetByOwner } from '../../services/AdoptionServices';
import PetCard from '../../components/adoption/PetCard';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyAdoptionListings = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { tabColor } = getAppContext();
  const { user } = getAppContext();
  const [loading, setLoading] = useState(false);
  const [myPets, setMyPets] = useState([]);

  const id = user._id;

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await getPetByOwner(id);

      if (response) {
        // Sort the pets based on status
        const sortedPets = response.sort((a, b) => {
          if (a.status === 'approved' && b.status !== 'approved') {
            return 1;
          } else if (a.status !== 'approved' && b.status === 'approved') {
            return -1;
          } else {
            return 0;
          }
        });
        setMyPets(sortedPets);
      } else {
        console.log('No pets found for user');
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error.response?.data?.message || //axios error
          error.message || //js error
          'Error getting profile', //fallback
      });
    } finally {
      setLoading(false);
    }
  };

  //get Users pets
  useEffect(() => {
    setLoading(true);
    const getMyPets = async () => {
      try {
        const response = await getPetByOwner(id);
        //console.log('response', response);
        if (response) {
          // Sort the pets based on status
          const sortedPets = response.sort((a, b) => {
            if (a.status === 'approved' && b.status !== 'approved') {
              return 1;
            } else if (a.status !== 'approved' && b.status === 'approved') {
              return -1;
            } else {
              return 0;
            }
          });
          setMyPets(sortedPets);
        } else {
          console.log('No pets found for user');
        }
      } catch (error) {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            error.response?.data?.message || //axios error
            error.message || //js error
            'Error getting profile', //fallback
        });
      } finally {
        setLoading(false);
      }
    };
    getMyPets();
  }, []);

  //console.log('myPets', myPets);

  const handleViewReqs = (petId) => {
    navigation.navigate('ApplicantList', { petId });
  };

  const handleAddPet = (pet) => {
    navigation.navigate('NewPetForAdopt', { pet });
  };

  //styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //arginTop: StatusBar.currentHeight,
      backgroundColor: theme.colors.background,
    },
    titleText: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    titleContainer: {
      alignItems: 'center',
      width: '100%',
    },
    text: {
      color: theme.colors.text,
      fontSize: 14,
    },
    flatListContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: tabColor,
      borderRadius: 50,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      /> */}

      <View style={styles.container}>
        {/* <FloatingMenuButton /> */}

        <View style={styles.titleContainer}>
          {/* <ThemebackButton navigation={navigation} /> */}
          <Text style={styles.titleText}>My Adoption Listings</Text>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={myPets}
            renderItem={({ item }) => (
              <PetCard
                petData={item}
                handleView={handleViewReqs}
                refreshFunc={handleRefresh}
              />
            )}
            keyExtractor={(item) => item._id.toString()}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
            }
          />
        </View>
        <TouchableOpacity style={styles.floatingButton} onPress={handleAddPet}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyAdoptionListings;
