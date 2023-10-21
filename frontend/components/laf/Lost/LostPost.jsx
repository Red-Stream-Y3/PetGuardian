import React, { Suspense, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Entypo } from '@expo/vector-icons';
import getThemeContext from '../../../context/ThemeContext';
import { getAppContext } from '../../../context/AppContext';

import Header from '../../common/Header';
import SelectPets from '../../common/SelectPets';
import MapLocation from '../../common/MapLocation';
import { getPetsByUser, getPetById } from '../../../services/PetServices';
import { createLost } from '../../../services/PostServices';
import ThemeTextInput from '../../common/ThemeTextInput';

const LostPost = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPetId, setSelectedPetId] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState({
    show: false,
    mode: 'date',
    date: new Date(Date.now()),
    inputCallback: () => {},
  });
  const [input, setInput] = useState({
    startDate: selectedDate,
    notes: specialNotes,
  });
  const [markerTitle, setMarkerTitle] = useState('');
  const [images, setImages] = useState([]);

  const handleMarkerChange = (title) => {
    setMarkerTitle(title);
  };

  const getPets = async () => {
    try {
      const response = await getPetsByUser(user._id, user.token);
      setPets(response);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  const getPetImages = async (petId) => {
    try {
      const response = await getPetById(petId, user.token);
      setImages(response.image);
    } catch (error) {
      console.log('Error fetching pet images:', error);
    }
  };

  const groupIntoPairs = (data) => {
    const pairs = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = [data[i], data[i + 1]].filter(Boolean);
      pairs.push(pair);
    }
    return pairs;
  };

  const petsPairs = groupIntoPairs(pets);

  useEffect(() => {
    getPetImages(selectedPetId);
  }, [selectedPetId]);

  const lostPost = {
    user: user._id,
    pet: selectedPetId,
    type: 'Lost',
    content: input.notes,
    images: images,
    date: input.startDate,
    location: markerTitle,
  };

  const handleSave = async () => {
    try {
      await createLost(lostPost, user.token);
    } catch (error) {
      console.log('Error creating post:', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ flex: 1 }}>
        <Header title="New Post" onSavePress={handleSave} />

        <Suspense fallback={<ActivityIndicator />}>
          {loading && <ActivityIndicator />}
          <SelectPets
            header="Select your pet"
            pairs={petsPairs}
            // component="LostPost"
            // screen="PetProfile"
            fontSize={14}
            onSelectPet={setSelectedPetId}
          />

          <View style={styles.container}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  ...styles.details,
                }}
              >
                {'Details'}
              </Text>
              <ThemeTextInput
                editable={false}
                onPressIcon={() => {
                  setDatePicker({
                    show: true,
                    mode: 'date',
                    inputCallback: (date) => {
                      setInput({ ...input, startDate: date });
                    },
                  });
                }}
                value={input.startDate.toLocaleDateString()}
                icon={
                  <Entypo name="calendar" size={24} color={theme.colors.icon} />
                }
              />

              <ThemeTextInput
                placeholder={'Special notes...'}
                value={input.notes}
                multiline={true}
                numOfLines={3}
                maxLength={200}
                onChange={(text) => {
                  setInput({ ...input, notes: text });
                }}
              />

              <DateTimePickerModal
                isVisible={datePicker.show}
                mode={datePicker.mode}
                themeVariant={theme.mode}
                onConfirm={(date) => {
                  datePicker.inputCallback(date);
                  setDatePicker({ ...datePicker, show: false });
                }}
                date={datePicker.date}
                onCancel={() => setDatePicker({ ...datePicker, show: false })}
              />
            </View>
          </View>

          <MapLocation onMarkerChange={handleMarkerChange} />
        </Suspense>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  details: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LostPost;
