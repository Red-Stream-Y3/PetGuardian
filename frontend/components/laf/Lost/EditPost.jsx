import React, { Suspense, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome } from '@expo/vector-icons';
import getThemeContext from '../../../context/ThemeContext';
import { getAppContext } from '../../../context/AppContext';
import Header from '../../common/Header';
import UserBox from '../../common/UserBox';
import { getPostById, updatePost } from '../../../services/PostServices';

const EditPost = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const navigation = useNavigation();
  const route = useRoute();
  const { postId } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [posts, setPosts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLocation, setEditedLocation] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const getPostDetails = async () => {
    try {
      const response = await getPostById(postId, user.token);
      setPosts(response);
      setLoading(false);
      setEditedLocation(response.location);
      setEditedContent(response.content);
      setEditedDate(response.date);
    } catch (error) {
      console.log('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  const handleSave = () => {
    const updatedPost = {
      ...posts,
      location: editedLocation,
      content: editedContent,
      date: editedDate,
      status: 'open',
    };
    updatePost(updatedPost, user.token);

    setIsEditing(false);
  };

  const handleClosePost = () => {
    const updatedPost = {
      ...posts,
      location: editedLocation,
      content: editedContent,
      date: editedDate,
      status: 'closed',
    };
    updatePost(updatedPost, user.token);
    navigation.navigate('Profile');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setEditedDate(date);
    hideDatePicker();
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  const petImages = posts.images.map((image) => image);

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getRandomColor = () => {
    const colors = ['#E0CDFF'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === petImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const findTitle = (content) => {
    const petTypeRegex = /dog|cat|rabbit/gi;

    const petTypeMatch = content.match(petTypeRegex);

    const title = petTypeMatch ? `Found ${petTypeMatch[0]}` : 'New Post';

    return title;
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title={posts.pet?.name ? posts.pet?.name : findTitle(posts.content)}
        onSavePress={handleSave}
      />
      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: petImages[currentImageIndex] }}
                style={styles.image}
              />
              {petImages.length > 1 && (
                <TouchableOpacity
                  style={styles.carouselIcon}
                  onPress={goToNextImage}
                >
                  <FontAwesome name="angle-right" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                {isEditing ? (
                  <TextInput
                    style={[
                      styles.detailText,
                      { backgroundColor: getRandomColor() },
                    ]}
                    value={editedLocation}
                    onChangeText={setEditedLocation}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={toggleEditing}
                    style={[
                      styles.detailText,
                      { backgroundColor: getRandomColor() },
                    ]}
                  >
                    <Text>
                      {posts.location.split(' ').length > 4
                        ? `${posts.location
                            .split(' ')
                            .slice(0, 1.5)
                            .join(' ')} ...`
                        : posts.location}
                    </Text>
                  </TouchableOpacity>
                )}
                {posts?.type === 'Lost' && (
                  <Text
                    style={[
                      styles.detailText,
                      { backgroundColor: getRandomColor() },
                    ]}
                  >
                    {posts.pet.age}
                  </Text>
                )}
                {isEditing ? (
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={[
                      styles.detailText,
                      {
                        backgroundColor: getRandomColor(),
                      },
                    ]}
                  >
                    <Text>{formatDate(editedDate)}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={toggleEditing}
                    style={[
                      styles.detailText,
                      {
                        backgroundColor: getRandomColor(),
                      },
                    ]}
                  >
                    <Text>{formatDate(posts.date)}</Text>
                  </TouchableOpacity>
                )}
              </View>
              {isEditing ? (
                <TextInput
                  style={[
                    styles.description,
                    {
                      borderWidth: 3,
                      borderColor: getRandomColor(),
                      color: theme.colors.text,
                    },
                  ]}
                  multiline
                  value={editedContent}
                  onChangeText={setEditedContent}
                />
              ) : (
                <TouchableOpacity onPress={toggleEditing}>
                  <Text
                    style={[
                      styles.description,
                      {
                        borderWidth: 3,
                        borderColor: getRandomColor(),
                        color: theme.colors.text,
                      },
                    ]}
                  >
                    {posts.content}
                  </Text>
                </TouchableOpacity>
              )}
              <UserBox
                name={`${posts.user.firstName} ${posts.user.lastName}`}
                profilePic={posts.user.profilePic}
                phone={posts.user.phone}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePost}
            >
              <Text style={styles.buttonText}>Close Post</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 30,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailText: {
    marginVertical: 15,
    marginRight: 4,
    fontSize: 14,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 15,
    color: '#7D59B8',
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    padding: 10,
    borderRadius: 15,
  },
  imageContainer: {
    position: 'relative',
  },
  carouselIcon: {
    position: 'absolute',
    bottom: 12,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#7D59B8',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditPost;
