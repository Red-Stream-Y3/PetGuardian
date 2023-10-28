import React, { Suspense, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ThemeTextInput from '../common/ThemeTextInput';
import SelectPets from '../common/SelectPets';
import { createPlayDate } from '../../services/PlayDateServices';
import { getPetsByUser, getPetById } from '../../services/PetServices';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Entypo } from '@expo/vector-icons';

const CreatePlaydate = () => {
  const { theme } = getThemeContext();
  const navigation = useNavigation();
  const { user } = getAppContext();
  const [pets, setPets] = useState([]);
  const [selectedPetIds, setSelectedPetIds] = useState('');
  const [playdate, setPlaydate] = useState({});
  const [loading, setLoading] = useState(true);
  const [specialNotes, setSpecialNotes] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [datePicker, setDatePicker] = useState({
    show: false,
    mode: 'date',
    date: new Date(),
    inputCallback: () => {},
  });

  const [input, setInput] = useState({
    notes: specialNotes,
    date: date,
    time: time,
    location: location,
  });

  const [images, setImages] = useState([]);

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
    getPetImages(selectedPetIds);
  }, [selectedPetIds]);

  const playdateData = {
    user: user._id,
    pets: selectedPetIds,
    location: location,
    date: input.date,
    time: input.time,
    description: specialNotes,
  };

  const handleSave = async () => {
    console.log('playdateData', playdateData);
    try {
      const response = await createPlayDate(playdateData);
      if (response) {
        navigation.navigate('PlaydateHome');
      } else {
        console.log('Error creating playdate');
      }
    } catch (error) {
      console.log('Error creating playdate:', error);
    }
  };

  return (
    <>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.headerContainer}>
          <Text style={[styles.header, { color: theme.colors.text }]}>
            Create Playdate
          </Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Suspense fallback={<ActivityIndicator />}>
            {loading && <ActivityIndicator />}
            <View style={{ flex: 1 }}>
              <View style={styles.selectContainer}>
                <SelectPets
                  header="Select your pet"
                  pairs={petsPairs}
                  fontSize={14}
                  onSelectPet={setSelectedPetIds}
                  component="create"
                />
              </View>
              <ThemeTextInput
                editable={false}
                onPressIcon={() => {
                  setDatePicker({
                    show: true,
                    mode: 'date',
                    inputCallback: (date) => {
                      setInput({ ...input, date: date });
                    },
                  });
                  setDate(input.date);
                }}
                value={input.date.toLocaleDateString()}
                icon={
                  <Entypo name="calendar" size={24} color={theme.colors.icon} />
                }
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

              <ThemeTextInput
                editable={false}
                onPressIcon={() => {
                  setDatePicker({
                    show: true,
                    mode: 'time',
                    inputCallback: (time) => {
                      setInput({ ...input, time: time });
                    },
                  });
                  setTime(input.time);
                }}
                value={input.time.toLocaleTimeString()}
                icon={
                  <Entypo name="clock" size={24} color={theme.colors.icon} />
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
                  setSpecialNotes(text);
                }}
              />
              <ThemeTextInput
                placeholder={'Location...'}
                value={input.location}
                multiline={true}
                numOfLines={3}
                maxLength={200}
                onChange={(text) => {
                  setInput({ ...input, location: text });
                  setLocation(text);
                }}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.playPrimary },
                  ]}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Suspense>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectContainer: {
    flexWrap: 'nowrap',
  },
});

export default CreatePlaydate;
