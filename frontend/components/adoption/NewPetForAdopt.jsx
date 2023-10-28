import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { Suspense, useState, useEffect } from 'react';
import ThemeTextInput from '../common/ThemeTextInput';
import { getAppContext } from '../../context/AppContext';
import { ScrollView } from 'react-native-gesture-handler';
import getThemeContext from '../../context/ThemeContext';
import ThemebackButton from '../common/ThemeBackButton';
import ThemeDropDownInput from '../common/ThemeDropDownInput';
import { postPetForAdoption } from '../../services/AdoptionServices';
import Toast from 'react-native-toast-message';
import ImagePicker from '../common/ImagePicker';
import ThemeButton from '../common/ThemeButton';

const NewPetForAdopt = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { user, tabColor } = getAppContext();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [species, setSpecies] = useState('');
  const [vaccinated, setVaccinated] = useState(null);
  const [healthNotes, setHealthNotes] = useState('');
  const [location, setLocation] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [images, setImages] = useState([]);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [description, setDescription] = useState('');

  // const pet = {
  //   name: 'Leo',
  //   species: 'dog',
  //   breed: 'Golden Retriever',
  //   age: 3,
  //   gender: 'male',
  //   description: 'Friendly and playful dog looking for a loving home.',
  //   location: 'Colombo, Sri Lanka',
  //   image: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  //   currentOwner: user._id,
  //   vaccinated: true,
  //   healthStatus: 'healthy',
  //   healthDescription: 'No known health issues.',
  // };
  // name: name,
  // species: speciesOptions,
  // breed: breed,
  // age: age,
  // gender: gender,
  // description: description,
  // location: location,
  // image: images,
  // currentOwner: user._id,
  // vaccinated: vaccinated,
  // healthStatus: healthStatus,
  // healthDescription: healthNotes,
  const createPet = async () => {
    try {
      const pet = {
        name: 'Leo',
        species: 'dog',
        breed: 'Golden Retriever',
        age: 3,
        gender: 'male',
        description: 'Friendly dog',
        location: 'Colombo',
        image: images,
        currentOwner: user._id,
        vaccinated: true,
        healthStatus: 'healthy',
        healthDescription: 'No issues.',
      };
      console.log(pet);
      const response = await postPetForAdoption(pet);
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Pet Saved Successfully!',
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigation.navigate('MyAdoptionListings');
      } else {
        console.error('Error creating request: Invalid response');
        Toast.show({
          type: 'error',
          text1: 'Error creating request: Invalid response',
        });
      }
    } catch (error) {
      console.error('Error creating request: ', error);
      Toast.show({
        type: 'error',
        text1: 'Error creating request: ' + error,
      });
    }
  };

  const genderOptions = [{ name: 'male' }, { name: 'female' }];

  const speciesOptions = [
    { name: 'dog' },
    { name: 'cat' },
    { name: 'bird' },
    { name: 'rabbit' },
    { name: 'turtle' },
    { name: 'other' },
  ];

  const healthStatusOptions = [
    { name: 'healthy' },
    { name: 'sick' },
    { name: 'injured' },
  ];

  const handleDropDownItemPressGender = (value) => {
    if (genderOptions.find((item) => item.name === value.name)) {
      setGender(value.name);
      return;
    }
    setGender('');
  };

  const handleDropDownItemPressHealth = (value) => {
    if (healthStatusOptions.find((item) => item.name === value.name)) {
      setHealthStatus(value.name);
      return;
    }
    setHealthStatus('');
  };

  const handleDropDownItemPressSpecies = (value) => {
    if (speciesOptions.find((item) => item.name === value.name)) {
      setSpecies(value.name);
      return;
    }
    setSpecies('');
  };

  const handleRadioButtonClick = (value) => {
    setVaccinated(value);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
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
    inputContainer: {
      width: '80%',
      marginTop: 20,
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
      borderColor: tabColor,
      borderWidth: 1,
      backgroundColor: theme.colors.surface,
      height: 50,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 10,
      alignSelf: 'center',
    },
    radioLabel: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
    },
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.container}>
            {/* <FloatingMenuButton /> */}
            <View style={styles.titleContainer}>
              {/* <ThemebackButton navigation={navigation} /> */}
              <Text style={styles.titleText}>New Pet</Text>
            </View>
            <View style={styles.inputContainer}>
              <ImagePicker
                images={images}
                title="Pet Images"
                setImages={setImages}
              />

              <ThemeTextInput
                title={'Pet Name'}
                placeholder="Enter Name"
                value={name}
                onChange={(text) => setName(text)}
              />

              <ThemeDropDownInput
                title="Species"
                placeholder="Species"
                value={species}
                options={speciesOptions}
                onPressItem={handleDropDownItemPressSpecies}
                loading={false}
              />

              <ThemeTextInput
                title={'Breed'}
                placeholder="Enter Breed"
                value={breed}
                onChange={(text) => setBreed(text)}
              />

              <ThemeTextInput
                title={'Describe the pet'}
                placeholder="Enter Description"
                value={description}
                onChange={(text) => setDescription(text)}
              />

              <ThemeTextInput
                title={'Age'}
                placeholder="Age"
                value={age}
                keyboardType={'numeric'}
                onChange={(text) => setAge(text)}
              />

              <ThemeDropDownInput
                title="Gender"
                placeholder="Gender"
                options={genderOptions}
                onPressItem={handleDropDownItemPressGender}
                loading={false}
                value={gender}
              />

              <ThemeDropDownInput
                title="Health Status"
                placeholder="Health Status"
                options={healthStatusOptions}
                onPressItem={handleDropDownItemPressHealth}
                loading={false}
                value={healthStatus}
                onChange={(value) => {
                  setHealthStatus(value);
                }}
              />

              {/* Health Status */}
              {/* Radio Button */}
              <Text style={styles.radioLabel}>Is the pet is vaccinated?</Text>
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
                          vaccinated === true ? tabColor : '#fff',
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
                          vaccinated === false ? tabColor : '#fff',
                      },
                    ]}
                  />
                  <Text style={styles.radioText}>No</Text>
                </TouchableOpacity>
              </View>
              <ThemeTextInput
                title={''}
                placeholder="Special Health Requirements"
                value={healthNotes}
                multiline={true}
                onChange={(text) => setHealthNotes(text)}
              />

              <ThemeTextInput
                title={'Location'}
                placeholder="Enter Location"
                value={location}
                multiline={true}
                onChange={(text) => setLocation(text)}
              />
            </View>
            <ThemeButton
              title={'        Save        '}
              padding={12}
              textSize={16}
              onPress={createPet}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default NewPetForAdopt;
