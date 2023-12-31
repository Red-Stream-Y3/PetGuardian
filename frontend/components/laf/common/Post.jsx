import React, { Suspense, useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import getThemeContext from '../../../context/ThemeContext';
import Header from '../../common/Header';
import UserBox from '../../common/UserBox';

const Post = ({ route }) => {
  const { theme } = getThemeContext();
  const { petData } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const petImages = petData.images.map((image) => image);

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getRandomColor = () => {
    const colors = ['#FFCDCD', '#FFEBCD', '#E0CDFF', '#FFCC70', '#F1CCC1'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === petImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const findTitle = (content) => {
    const petTypeRegex = /dog|cat|rabbit/gi;

    const petTypeMatch = content.match(petTypeRegex);

    const title = petTypeMatch ? `Found ${petTypeMatch[0]}` : 'New Post';

    return title;
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
      marginLeft: petData.type === 'Found' ? 120 : 0,
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
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header
        title={
          petData.pet?.name ? petData.pet?.name : findTitle(petData.content)
        }
      />

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView>
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
                {petData.type === 'Lost' && (
                  <>
                    <Text
                      style={[
                        styles.detailText,
                        { backgroundColor: getRandomColor() },
                      ]}
                    >
                      {petData.pet?.breed ? `${petData.pet?.breed}` : ''}
                    </Text>
                    <Text
                      style={[
                        styles.detailText,
                        { backgroundColor: getRandomColor() },
                      ]}
                    >
                      {petData.pet?.age ? `${petData.pet?.age}` : ''}
                    </Text>
                  </>
                )}
                <Text
                  style={[
                    styles.detailText,
                    {
                      backgroundColor: getRandomColor(),
                    },
                  ]}
                >
                  {formatDate(petData.date)}
                </Text>
              </View>
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
                {petData.content}
              </Text>
              <UserBox
                name={`${petData.user.firstName} ${petData.user.lastName}`}
                profilePic={petData.user.profilePic}
                phone={petData.user.phone}
              />
            </View>
          </View>
        </ScrollView>
      </Suspense>
    </View>
  );
};

export default Post;
