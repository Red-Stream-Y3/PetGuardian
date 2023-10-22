import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getAppContext } from '../../context/AppContext';
import getThemeContext from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const PetCard = ({ petData, onDelete, onToggleVisibility }) => {
  const { theme } = getThemeContext();
  const { tabColor } = getAppContext();
  const navigation = useNavigation();

  let statusColor;

  // Determine the color based on the pet's status
  if (petData.status === 'rejected') {
    statusColor = 'red';
  } else if (petData.status === 'approved') {
    statusColor = 'green';
  } else {
    statusColor = 'blue';
  }
  const handleNavigateToApplicants = () => {
    navigation.navigate('ApplicantList'); // Use the navigation object to navigate
  };

  const styles = StyleSheet.create({
    button: {
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: tabColor,
      shadowColor: tabColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginVertical: 10,
      width: '90%',
    },

    detailsContainer: {
      flex: 1,
      marginLeft: 10,
      alignItems: 'center',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40, // to make it a circle
    },
    petName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    petStatus: {
      fontSize: 16,
      color: 'gray',
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigateToApplicants}
    >
      <Image source={{ uri: petData.image[0] }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.petName}>{petData.name}</Text>
        <Text style={[styles.petStatus, { color: statusColor }]}>
          {petData.status}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onToggleVisibility}>
          <Text style={{ color: theme.colors.text }}>Toggle</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PetCard;
