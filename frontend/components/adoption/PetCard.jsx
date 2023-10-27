import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getAppContext } from '../../context/AppContext';
import getThemeContext from '../../context/ThemeContext';
import {
  deletePetForAdoption,
  getPetByOwner,
} from '../../services/AdoptionServices';
import Toast from 'react-native-toast-message';
import { ThemeButton, ThemeCard, ThemeOverlay } from '../../components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PetCard = ({ petData, handleView, refreshFunc, handleEdit }) => {
  const { theme } = getThemeContext();
  const { tabColor } = getAppContext();
  const [delConfirm, setDelConfirm] = useState(false);

  let statusColor;
  let petId = petData._id;

  // Determine the color based on the pet's status
  if (petData.status === 'rejected') {
    statusColor = 'red';
  } else if (petData.status === 'approved') {
    statusColor = 'green';
  } else {
    statusColor = tabColor;
  }

  const deleteFunction = async () => {
    try {
      await deletePetForAdoption(petId);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Pet has been deleted',
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          error.response?.data?.message || //axios error
          error.message || //js error
          'Error deleting pet', //fallback
      });
    }
  };

  const handleDelete = async () => {
    if (!delConfirm) {
      setDelConfirm(true);
      return;
    }

    await deleteFunction();
    await refreshFunc();
  };

  const onViewRequests = () => {
    handleView(petId);
  };

  const handleNavigateToEdit = () => {
    handleEdit(petId);
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
      backgroundColor: theme.colors.surface,
      //borderWidth: 1,
      //borderColor: tabColor,
      shadowColor: tabColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 1.84,
      elevation: 5,
      marginVertical: 10,
      width: 330,
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
    text: {
      color: theme.colors.text,
      fontSize: 18,
      marginVertical: 10,
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigateToEdit}>
      <Image source={{ uri: petData.image[0] }} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.petName}>{petData.name}</Text>
        <Text style={[styles.petStatus, { color: statusColor }]}>
          {petData.status}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onViewRequests}>
        <Text style={{ color: theme.colors.text, fontWeight: 'bold' }}>
          Requests
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>

        <ThemeOverlay
          visible={delConfirm}
          onPressBg={() => setDelConfirm(false)}
        >
          <ThemeCard>
            <Text style={styles.text}>
              Are you sure you want to delete {petData.name}?
            </Text>
            <View style={styles.buttonGroup}>
              <ThemeButton
                title="  Yes  "
                textSize={16}
                onPress={handleDelete}
              />
              <ThemeButton
                title="   No   "
                textSize={16}
                onPress={() => setDelConfirm(false)}
              />
            </View>
          </ThemeCard>
        </ThemeOverlay>
      </View>
    </TouchableOpacity>
  );
};

export default PetCard;
