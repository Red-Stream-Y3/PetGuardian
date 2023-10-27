import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { Suspense, useState, useEffect } from 'react';
import ThemeTextInput from '../common/ThemeTextInput';
import { getAppContext } from '../../context/AppContext';
import { ScrollView } from 'react-native-gesture-handler';
import getThemeContext from '../../context/ThemeContext';
import ThemebackButton from '../common/ThemeBackButton';
import ThemeDropDownInput from '../common/ThemeDropDownInput';
import { createRequestForAdoption } from '../../services/AdoptionServices';
import ImageSlider from './ImageSlider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Toast from 'react-native-toast-message';

const AdoptionApplication = ({ route, navigation }) => {
  const { petData } = route.params;
  const { theme } = getThemeContext();
  const { user, tabColor } = getAppContext();
  const [isExperiencedPetOwner, setIsExperiencedPetOwner] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [houseType, setHouseType] = useState('');

  // useEffect(() => {
  //   console.log(isChecked);
  //   console.log(isExperiencedPetOwner);
  // }, [isChecked, isExperiencedPetOwner]);

  const id = petData._id;

  const createRequest = async () => {
    try {
      const adoptRequest = {
        pet: petData._id,
        requester: user._id,
        experiencedPetOwner: isExperiencedPetOwner,
        houseHoldType: 'Apartment',
      };

      const response = await createRequestForAdoption(id, adoptRequest);

      // Check if the request was successfully created
      if (response) {
        // Show the toast message
        Toast.show({
          type: 'success',
          text1: 'Adoption Request Sent for Approval',
        });

        // Wait for 2 seconds (or any desired duration) before navigating
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigation.navigate('MyRequests');
      } else {
        // Handle the case where the response is empty or not as expected
        console.error('Error creating request: Invalid response');
        Toast.show({
          type: 'error',
          text1: 'Sorry, something went wrong. Please try again.',
        });
      }
    } catch (error) {
      // Handle other errors (e.g., network errors, server errors)
      console.error('Error creating request:', error);
    }
  };

  const handleRadioButtonClick = (value) => {
    setIsExperiencedPetOwner(value);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleDropDownItenPress = (value) => {
    if (houseTypes.find((item) => item.name === value.name)) {
      setHouseType(value.name);
      return;
    }
    setHouseType('');
  };

  //create full name
  const fullNames = `${user?.firstName} ${user?.lastName}`;

  // Extract address properties
  const { city, country, state, street, zip } = user.address;

  // Create address string
  const addressString = `${street ? street + ', ' : ''}${
    city ? city + ', ' : ''
  }${state ? state + ', ' : ''}${country ? country : ''}`;

  const houseTypes = [
    { name: 'Apartment' },
    { name: 'Condominium' },
    { name: 'House' },
    { name: 'Townhouse' },
    { name: 'Mobile Home' },
    { name: 'Other' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    pageHeader: {
      marginTop: 20,
      color: theme.colors.text,
      fontSize: 22,
      fontWeight: 'bold',
    },
    imageContainer: {
      marginTop: 20,
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 5,
    },
    imageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
      marginBottom: 10,
    },
    smallImage: {
      width: 80,
      height: 80,
      marginHorizontal: 5,
      borderRadius: 10,
    },
    formContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 100,
      height: 30,
    },

    radioCircle: {
      width: 22,
      height: 22,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: tabColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    radioText: {
      fontSize: 20,
      color: theme.colors.text,
    },
    radioButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginLeft: 40,
      marginTop: 10,
    },
    radioLabel: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 20,
      width: '80%',
      marginLeft: 20,
    },
    checkBoxText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    button: {
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      width: '50%',
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,

      textAlign: 'center',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.pageHeader}>Adoption Application</Text>
      </View>

      <ThemebackButton navigation={navigation} />

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.imageContainer}>
            <ImageSlider images={petData?.image} widthX={0.8} />
          </View>

          {/* Form */}
          <KeyboardAvoidingView
            style={styles.formContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
          >
            <ThemeTextInput
              title="Selected Pet"
              value={petData?.name}
              width="80%"
              disabled={true}
            />
            <ThemeTextInput
              title="Requester's Name"
              value={fullNames}
              width="80%"
            />
            <ThemeTextInput
              title="Contact Number"
              value={user?.phone}
              width="80%"
              editable={true}
            />
            <View style={{ width: '80%' }}>
              <ThemeDropDownInput
                title="Household Information"
                placeholder="Select type of residence"
                value={houseType}
                options={houseTypes}
                onPressItem={handleDropDownItenPress}
                loading={false}
              />
            </View>
            <ThemeTextInput
              title="Address"
              value={addressString}
              width="80%"
              editable={true}
            />

            {/* Radio Button */}
            <Text style={styles.radioLabel}>Have you owned a pet before?</Text>
            <View style={styles.radioButtonContainer}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleRadioButtonClick(true)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    {
                      backgroundColor:
                        isExperiencedPetOwner === true ? tabColor : '#fff',
                    },
                  ]}
                />
                <Text style={styles.radioText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleRadioButtonClick(false)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    {
                      backgroundColor:
                        isExperiencedPetOwner === false ? tabColor : '#fff',
                    },
                  ]}
                />
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>

            {/* Agree */}
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={tabColor}
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: 'red' }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={handleCheckboxChange}
              />
              <View
                style={{
                  flexDirection: 'column',
                }}
              >
                <Text style={styles.checkBoxText}>
                  Agreement to comply with the organization's or current owner's
                  {'\n'}
                  adoption policies and procedures
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isChecked ? tabColor : '#ccc' },
              ]}
              disabled={!isChecked}
              onPress={createRequest}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default AdoptionApplication;
