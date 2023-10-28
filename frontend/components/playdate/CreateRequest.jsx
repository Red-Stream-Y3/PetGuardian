import React, { Suspense, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ProfileCard from '../common/ProfileCard';
import ThemeTextInput from '../common/ThemeTextInput';
import SelectPets from '../common/SelectPets';
import { getPlayDateById, joinRequest } from '../../services/PlayDateServices';
import { getPetsByUser, getPetById } from '../../services/PetServices';
import getThemeContext from '../../context/ThemeContext';
import { getAppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const CreateRequest = ({ route }) => {
  const { theme } = getThemeContext();
  const navigation = useNavigation();
  const { user } = getAppContext();
  const [pets, setPets] = useState([]);
  const [selectedPetIds, setSelectedPetIds] = useState([]);
  const [playdate, setPlaydate] = useState({});
  const [loading, setLoading] = useState(true);
  const [specialNotes, setSpecialNotes] = useState('');
  const [phone, setPhone] = useState('');

  const [input, setInput] = useState({
    notes: specialNotes,
    phone: phone,
  });
  const [images, setImages] = useState([]);

  const { id } = route.params;
  useEffect(() => {
    const fetchPlaydate = async () => {
      const data = await getPlayDateById(id);
      setPlaydate(data);
      setLoading(false);
    };
    fetchPlaydate();
  }, []);

  const getPets = async () => {
    try {
      const response = await getPetsByUser(user._id, user.token);
      setPets(response);
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

  const request = {
    user: user._id,
    pets: selectedPetIds,
    status: 'Requested',
    description: input.notes,
    contactNo: input.phone,
  };

  const handleSave = async () => {
    try {
      const response = await joinRequest(id, request);
      if (response) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error creating join request', error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {!loading && (
        <>
          <Text style={[styles.header, { color: theme.colors.text }]}>
            {playdate.user.name}'s Playdate
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <ProfileCard
                name={playdate.user.name}
                location={playdate.user.country}
                profileImage={playdate.user.profilePic}
              />
              <View
                style={[
                  styles.textContainer,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <View style={styles.dateContainer}>
                  <Text style={[styles.date, { color: theme.colors.text }]}>
                    {new Date(playdate.date).toDateString()}
                  </Text>
                  <Text style={[styles.date, { color: theme.colors.text }]}>
                    {new Date(playdate.time).toLocaleTimeString().slice(0, 5)}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.textContainer,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <Text style={[styles.text, { color: theme.colors.text }]}>
                  At {playdate.location}
                </Text>
              </View>
            </View>

            <Suspense fallback={<ActivityIndicator />}>
              {loading && <ActivityIndicator />}
              <View style={{ flex: 1 }}>
                <Text style={[styles.header, { color: theme.colors.text }]}>
                  Join Request
                </Text>

                <View style={styles.selectContainer}>
                  <SelectPets
                    header="Select your pet"
                    pairs={petsPairs}
                    fontSize={14}
                    onSelectPet={setSelectedPetIds}
                    component="create"
                  />
                </View>

                <View style={styles.detailsContainer}>
                  <ThemeTextInput
                    placeholder={'Special notes...'}
                    value={input.notes}
                    multiline={true}
                    numOfLines={3}
                    maxLength={200}
                    onChange={(text) => {
                      setInput({ ...input, notes: text }),
                        setSpecialNotes(text);
                    }}
                  />
                  <ThemeTextInput
                    placeholder={'Phone Number'}
                    value={input.phone}
                    maxLength={200}
                    onChange={(text) => {
                      setInput({ ...input, phone: text }), setPhone(text);
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
                      <Text style={styles.buttonText}>Send Request</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Suspense>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default CreateRequest;

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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontWeight: 'bold',
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
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  selectContainer: {
    flexWrap: 'nowrap',
  },
});
