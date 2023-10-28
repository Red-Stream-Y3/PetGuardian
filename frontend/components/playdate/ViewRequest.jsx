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
  getPlayDateByIdFullDetails,
  deleteJoinRequest,
  approveJoinRequest,
  rejectJoinRequest,
} from '../../services/PlayDateServices';
import getThemeContext from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { getAppContext } from '../../context/AppContext';

const ViewRequest = ({ route }) => {
  const { id, requestId } = route.params;
  const { theme } = getThemeContext();
  const navigation = useNavigation();
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = getAppContext();

  useEffect(() => {
    const fetchPlaydate = async () => {
      const data = await getPlayDateByIdFullDetails(id, requestId);
      setRequest(data);
      setLoading(false);
    };
    fetchPlaydate();
  }, []);

  const deleteRequest = async () => {
    try {
      await deleteJoinRequest(id, requestId);
      navigation.goBack();
    } catch (error) {
      console.log('Error deleting request:', error);
    }
  };

  const approveRequest = async () => {
    try {
      await approveJoinRequest(id, requestId);
      navigation.goBack();
    } catch (error) {
      console.log('Error approving request:', error);
    }
  };

  const rejectRequest = async () => {
    try {
      await rejectJoinRequest(id, requestId);
      navigation.goBack();
    } catch (error) {
      console.log('Error rejecting request:', error);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {!loading && (
        <>
          <Text style={[styles.header, { color: theme.colors.text }]}>
            {request.user.name}'s Join Request
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {request.pets.map((pet, index) => (
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
                name={request.user.name}
                location={request.user.country}
                profileImage={request.user.profilePic}
              />
              <View
                style={[
                  styles.textContainer,
                  { backgroundColor: theme.colors.surface },
                ]}
              >
                <Text style={[styles.text, { color: theme.colors.text }]}>
                  {request.description}
                </Text>
              </View>
              {request.userId === user._id && (
                <View
                  style={[
                    styles.textContainer,
                    { backgroundColor: theme.colors.surface },
                  ]}
                >
                  <Text style={[styles.text, { color: theme.colors.text }]}>
                    {request.contactNo}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.buttonContainer}>
              {/* edit, approve delete */}
              {request.user._id == user._id && (
                <View style={styles.editDeleteContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: theme.colors.adoptPrimary },
                    ]}
                    onPress={deleteRequest}
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: theme.colors.playPrimary },
                    ]}
                    onPress={() =>
                      navigation.navigate('UpdateRequest', {
                        id,
                        requestId,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* approve */}
              {request.userId == user._id && (
                <View style={styles.approveContainer}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: theme.colors.adoptPrimary },
                    ]}
                    onPress={rejectRequest}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: theme.colors.playPrimary },
                    ]}
                    onPress={approveRequest}
                  >
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </View>
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
  text: {
    fontSize: 16,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    maxWidth: 500,
  },
  approveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    maxWidth: 500,
  },
});

export default ViewRequest;
