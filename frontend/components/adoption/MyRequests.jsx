import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAppContext } from '../../context/AppContext';
import getThemeContext from '../../context/ThemeContext';
import {
  getAdoptionRequestsByUser,
  deleteAdoptionRequest,
} from '../../services/AdoptionServices';
import FloatingMenuButton from '../common/FloatingMenuButton';
import { ThemeButton, ThemeCard, ThemeOverlay } from '../../components';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyRequests = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { tabColor, user } = getAppContext();
  const [myRequests, setMyRequests] = useState([]);
  const [delConfirm, setDelConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMyRequests = async () => {
    try {
      const response = await getAdoptionRequestsByUser(user._id);
      if (response.length === 0) {
        Toast.show({
          type: 'info',
          text1: 'No Requests',
          text2: 'You do not have any adoption requests',
        });
      }
      setMyRequests(response);
    } catch (error) {
      console.error(error);
    }
  };
  //console.log(myRequests);

  useEffect(() => {
    getMyRequests();
  }, []);

  const deleteFunction = async (requestId) => {
    try {
      await deleteAdoptionRequest(requestId);
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

  const handleDelete = async (requestId) => {
    if (!delConfirm) {
      setDelConfirm(true);
      return;
    }

    await deleteFunction(requestId);
    await getMyRequests();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      arginTop: StatusBar.currentHeight,
      backgroundColor: theme.colors.background,
    },
    titleText: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    titleText2: {
      color: '#666666',
      fontSize: 18,
      marginTop: 2,
      marginStart: 15,
    },

    titleContainer: {
      alignItems: 'center',
      width: '100%',
    },
    text: {
      color: theme.colors.text,
      fontSize: 16,
      marginTop: 30,
    },
    flatListContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    button: {
      marginHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    container2: {
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
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    petStatus: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'gray',
    },

    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      marginVertical: 30,
      gap: 20,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />

      <View style={styles.container}>
        <FloatingMenuButton />

        <View style={styles.titleContainer}>
          {/* <ThemebackButton navigation={navigation} /> */}
          <Text style={styles.titleText}>My Requests</Text>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={myRequests}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.container2}
                //onPress={() => viewPet(item._id.toString())}
              >
                <Image source={{ uri: item.image[0] }} style={styles.image} />
                <View style={styles.detailsContainer}>
                  <Text style={styles.userName}>{item.name}</Text>
                  {item.adoptionRequests.map((request) => (
                    <View key={request._id}>
                      <Text
                        style={[
                          styles.petStatus,
                          {
                            color:
                              request.status === 'rejected'
                                ? 'red'
                                : request.status === 'pending'
                                ? '#6688cb'
                                : 'green',
                          },
                        ]}
                      >
                        {request.status}
                      </Text>
                    </View>
                  ))}
                </View>
                {item.adoptionRequests.map((request) => (
                  <View key={request._id}>
                    {(request.status === 'pending' ||
                      request.status === 'rejected') && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleDelete(request._id)}
                      >
                        <MaterialIcons name="delete" size={24} color="red" />
                      </TouchableOpacity>
                    )}

                    <ThemeOverlay
                      visible={delConfirm}
                      onPressBg={() => setDelConfirm(false)}
                    >
                      <ThemeCard>
                        <Text style={styles.text}>
                          Are you sure you want to delete the request?
                        </Text>
                        <View style={styles.buttonGroup}>
                          <ThemeButton
                            title="  Yes  "
                            textSize={16}
                            onPress={() => handleDelete(request._id)}
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
                ))}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.adoptionRequests._id}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getMyRequests} />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyRequests;

const styles = StyleSheet.create({});
