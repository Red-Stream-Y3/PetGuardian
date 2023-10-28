import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ProfileCard from '../common/ProfileCard';
import PetCard from '../common/PetCard';
import {
  getPlayDateById,
  deletePlayDate,
} from '../../services/PlayDateServices';
import getThemeContext from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { getAppContext } from '../../context/AppContext';

const ViewPlaydate = ({ route }) => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const navigation = useNavigation();
  const [playdate, setPlaydate] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = route.params;

  useEffect(() => {
    const fetchPlaydate = async () => {
      const data = await getPlayDateById(id);
      setPlaydate(data);
      setLoading(false);
    };
    fetchPlaydate();
  }, []);

  // reload playdate when returning from update
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchPlaydate = async () => {
        const data = await getPlayDateById(id);
        setPlaydate(data);
        setLoading(false);
      };
      fetchPlaydate();
    });

    return unsubscribe;
  }, [navigation]);

  const deletePlaydateHandler = async () => {
    try {
      await deletePlayDate(id);
      navigation.goBack();
    } catch (error) {
      console.log('Error deleting playdate:', error);
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
              {playdate.pets.map((pet, index) => (
                <PetCard
                  key={index}
                  image={pet.image}
                  name={pet.name}
                  breed={pet.breed}
                  age={pet.age}
                  weight={pet.weight}
                />
              ))}

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
                <Text style={[styles.text, { color: theme.colors.text }]}>
                  {playdate.description}
                </Text>
              </View>
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
            <View style={styles.requestContainer}>
              {playdate.requests.length > 0 && (
                <Text style={[styles.subheader, { color: theme.colors.text }]}>
                  Join Requests
                </Text>
              )}
              {playdate.requests.map((request, index) => (
                <TouchableOpacity
                  style={[
                    styles.contentContainer,
                    { backgroundColor: theme.colors.surface },
                  ]}
                  key={index}
                  onPress={() => {
                    navigation.navigate('ViewRequest', {
                      id: id,
                      requestId: request._id,
                    });
                  }}
                >
                  <View style={styles.profileContainer}>
                    <Image
                      style={styles.profileImage}
                      source={{ uri: request.user.profilePic }}
                    />
                    <View
                      style={[
                        styles.requestTextContainer,
                        { color: theme.colors.text },
                      ]}
                    >
                      <Text style={[styles.name, { color: theme.colors.text }]}>
                        {request.user.name}
                      </Text>
                      <Text
                        style={[styles.location, { color: theme.colors.text }]}
                      >
                        {request.user.country}
                      </Text>
                    </View>
                    <View style={styles.statusContainer}>
                      <Text
                        style={[
                          styles.status,
                          { backgroundColor: theme.colors.playPrimary },
                        ]}
                      >
                        {request.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {user._id !== playdate.user._id && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.playPrimary },
                  ]}
                  onPress={() => {
                    navigation.navigate('CreateRequest', { id: id });
                  }}
                >
                  <Text style={styles.buttonText}>Meet</Text>
                </TouchableOpacity>
              </View>
            )}

            {user._id === playdate.user._id && (
              <View style={styles.editDeleteContainer}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.adoptPrimary },
                  ]}
                  onPress={deletePlaydateHandler}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.playPrimary },
                  ]}
                  onPress={() => {
                    navigation.navigate('UpdatePlaydate', { id: id });
                  }}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ViewPlaydate;

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
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
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
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 2,
    borderColor: '#71a5de',
    borderRadius: 10,
    marginBottom: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    flex: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  requestTextContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  status: {
    padding: 8,
    borderRadius: 50,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  buttonContainer: {
    alignItems: 'center',
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
  editDeleteContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    maxWidth: 500,
  },
});
