import React, { Suspense, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from '../common/ImagePicker';
import Header from '../common/Header';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import ThemeTextInput from '../common/ThemeTextInput';
import { createPet } from '../../services/PetServices';
import { useNavigation } from '@react-navigation/native';

const CreatePet = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petdescription, setPetDescription] = useState('');
  const [petUserId, setPetUserId] = useState('');
  const [input, setInput] = useState({
    name: petName,
    type: petType,
    breed: petBreed,
    age: petAge,
    weight: petWeight,
    description: petdescription,
    userId: petUserId,
  });

  const pet = {
    name: input.name,
    type: input.type,
    breed: input.breed,
    age: input.age,
    weight: input.weight,
    description: input.description,
    user: user._id,
  };

  const handleSave = async () => {
    console.log('pet', pet);
    try {
      const response = await createPet(pet, images, user.token);
      if (response) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error creating pet:', error);
    }
  };

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Header
          title="Create Pet"
          leftIcon="menu"
          rightIcon="check"
          onPressLeft={() => navigation.openDrawer()}
          onPressRight={handleSave}
        />
        <ScrollView>
          <View style={styles.scrollView}>
            <ImagePicker images={images} setImages={setImages} />
            <ThemeTextInput
              placeholder={'Pet Name'}
              value={input.name}
              onChange={(text) => {
                setInput({ ...input, name: text });
              }}
            />
            <ThemeTextInput
              placeholder={'Pet Type'}
              value={input.type}
              onChange={(text) => {
                setInput({ ...input, type: text });
              }}
            />
            <ThemeTextInput
              placeholder={'Pet Breed'}
              value={input.breed}
              onChange={(text) => {
                setInput({ ...input, breed: text });
              }}
            />
            <ThemeTextInput
              placeholder={'Pet Age'}
              value={input.age}
              onChange={(text) => {
                setInput({ ...input, age: text });
              }}
            />
            <ThemeTextInput
              placeholder={'Pet Weight'}
              value={input.weight}
              onChange={(text) => {
                setInput({ ...input, weight: text });
              }}
            />
            <ThemeTextInput
              placeholder={'Pet Description'}
              value={input.description}
              onChange={(text) => {
                setInput({ ...input, description: text });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.nearMeButton,
                { backgroundColor: theme.colors.homePrimary },
              ]}
              onPress={handleSave}
            >
              <Text style={styles.nearMeText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default CreatePet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  details: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
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
});
