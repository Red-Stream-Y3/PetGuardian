import React, { Suspense } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import getThemeContext from '../../../context/ThemeContext';
import Header from '../../common/Header';

const Post = ({ route }) => {
  const { theme } = getThemeContext();
  const { petData } = route.params;

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const getRandomColor = () => {
    const colors = ['#FFCDCD', '#FFEBCD', '#E0CDFF', '#FFCC70', '#F1CCC1'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title={petData.title} />

      <Suspense fallback={<ActivityIndicator />}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={{ uri: petData.images[0].uri }}
              style={styles.image}
            />
            <View style={styles.detailsContainer}>
              <View style={styles.detailsRow}>
                <Text
                  style={[
                    styles.detailText,
                    { backgroundColor: getRandomColor() },
                  ]}
                >
                  {petData.breed}
                </Text>
                <Text
                  style={[
                    styles.detailText,
                    { backgroundColor: getRandomColor() },
                  ]}
                >
                  {petData.age}
                </Text>
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
                  },
                ]}
              >
                {petData.description}
              </Text>
            </View>
          </View>
        </ScrollView>
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
});

export default Post;
