import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getRequesters,
  getPetById,
  approveAdoptionRequest,
  rejectAdoptionRequest,
} from '../../services/AdoptionServices';
import { getAppContext } from '../../context/AppContext';
import getThemeContext from '../../context/ThemeContext';
import Toast from 'react-native-toast-message';
import { RequesterCard } from '../../components';
import { ThemeButton, ThemeCard, ThemeOverlay } from '../../components';

const ApplicantList = ({ navigation, route }) => {
  const { theme } = getThemeContext();
  const { tabColor, user } = getAppContext();
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const { petId } = route.params;
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState({});
  const [delConfirm, setDelConfirm] = useState(false);

  const viewApplicant = async () => {
    if (!delConfirm) {
      setDelConfirm(true);
      return;
    }
  };
  const getRequestersFunc = async () => {
    try {
      const data = await getRequesters(petId);
      setAdoptionRequests(data);
    } catch (error) {
      console.error('Error fetching requesters:', error);
    }
  };

  const getPetFunc = async () => {
    try {
      const data = await getPetById(petId);
      setPet(data);
    } catch (error) {
      console.error('Error fetching pet:', error);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await approveAdoptionRequest(requestId);
      setDelConfirm(false);
      Toast.show({
        type: 'success',
        text1: 'Adoption request approved',
        text2: 'The requester has been notified.',
        visibilityTime: 3000,
      });
      getRequestersFunc();
    } catch (error) {
      console.error('Error approving adoption request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectAdoptionRequest(requestId);
      setDelConfirm(false);
      Toast.show({
        type: 'success',
        text1: 'Adoption request rejected',
        text2: 'The requester has been notified.',
        visibilityTime: 3000,
      });
      getRequestersFunc();
    } catch (error) {
      console.error('Error rejecting adoption request:', error);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong.',
        visibilityTime: 3000,
      });
    }
  };

  useEffect(() => {
    getPetFunc();
    getRequestersFunc(); // Call the async function
  }, [petId]); // Run effect whenever petId changes

  console.log('Requests', adoptionRequests);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //arginTop: StatusBar.currentHeight,
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
      fontSize: 14,
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
      {/* <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      /> */}

      <View style={styles.container}>
        {/* <FloatingMenuButton /> */}

        <View style={styles.titleContainer}>
          {/* <ThemebackButton navigation={navigation} /> */}
          <Text style={styles.titleText}>Requests for {pet.name}</Text>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={adoptionRequests}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.container2}
                onPress={viewApplicant}
              >
                <Image
                  source={{ uri: item.requester.profilePic }}
                  style={styles.image}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.userName}>{item.requester.username}</Text>
                  <Text
                    style={[
                      styles.petStatus,
                      {
                        color:
                          item.status === 'rejected'
                            ? 'red'
                            : item.status === 'pending'
                            ? tabColor
                            : 'green',
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
                <View style={styles.buttonContainer}></View>

                <ThemeOverlay
                  visible={delConfirm}
                  onPressBg={() => setDelConfirm(false)}
                >
                  <ThemeCard>
                    <Text
                      style={{
                        fontSize: 26,
                        fontWeight: 'bold',
                        marginVertical: 15,
                        marginHorizontal: 10,
                        color: theme.colors.text,
                      }}
                    >
                      {item.requester.firstName} {item.requester.lastName}{' '}
                    </Text>
                    <Image
                      source={{ uri: item.requester.profilePic }}
                      style={[
                        styles.image,
                        {
                          marginVertical: 10,
                          width: 150,
                          height: 150,
                          borderRadius: 80,
                        },
                      ]}
                    />
                    <View
                      style={{
                        borderColor: tabColor,
                        borderWidth: 1,
                        marginVertical: 10,
                        borderRadius: 10,
                        borderWidth: 2,
                        padding: 10,
                        width: 300,
                        flexDirection: 'column',
                      }}
                    >
                      <Text
                        style={[
                          styles.titleText,
                          { marginStart: 10, marginTop: 10 },
                        ]}
                      >
                        House Hold Type
                      </Text>
                      <Text style={styles.titleText2}>
                        {item.houseHoldType}
                      </Text>
                      <Text
                        style={[
                          styles.titleText,
                          { marginStart: 10, marginTop: 20 },
                        ]}
                      >
                        Phone Number
                      </Text>
                      <Text style={styles.titleText2}>
                        {' +'} {item.requester.phone}
                      </Text>
                      <Text
                        style={[
                          styles.titleText,
                          { marginStart: 10, marginTop: 20 },
                        ]}
                      >
                        Experienced Pet Owner:{' '}
                      </Text>
                      <Text style={styles.titleText2}>
                        {item.experiencedPetOwner ? 'Yes' : 'No'}
                      </Text>
                      <Text
                        style={[
                          styles.titleText,
                          { marginStart: 10, marginTop: 20 },
                        ]}
                      >
                        Requested Date
                      </Text>
                      <Text style={[styles.titleText2, { marginBottom: 10 }]}>
                        {formatDate(item.createdAt)}
                      </Text>
                    </View>

                    <View style={styles.buttonGroup}>
                      <ThemeButton
                        title="  Reject  "
                        textSize={16}
                        onPress={() => handleReject(item._id.toString())}
                      />
                      <ThemeButton
                        title=" Close  "
                        textSize={16}
                        onPress={() => setDelConfirm(false)}
                      />
                      <ThemeButton
                        title="   Approve   "
                        textSize={16}
                        onPress={() => handleApprove(item._id.toString())}
                      />
                    </View>
                  </ThemeCard>
                </ThemeOverlay>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id.toString()}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getRequestersFunc}
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ApplicantList;
