import React, { Suspense } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import getThemeContext from '../../context/ThemeContext';

const UserBox = ({ name, profilePic, phone }) => {
  const { theme } = getThemeContext();

  const getRandomColor = () => {
    const colors = ['#FFCDCD', '#FFEBCD', '#E0CDFF', '#FFCC70', '#F1CCC1'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <View
        style={[
          styles.rowContainer,
          {
            borderColor: getRandomColor(),
          },
        ]}
      >
        <Image source={{ uri: profilePic }} style={styles.rowImage} />
        <View style={styles.rowDetails}>
          <Text
            style={{
              color: theme.colors.text,
              ...styles.name,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              ...styles.phone,
            }}
          >
            {phone}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.phoneIcon}
          onPress={() => {
            const phoneNumber = { phone };
            const url = `tel:${phoneNumber}`;
            Linking.canOpenURL(url)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(url);
                } else {
                  console.error(
                    `Cannot open phone dialer for phone number: ${phoneNumber}`
                  );
                }
              })
              .catch((error) =>
                console.error(`Error opening phone dialer: ${error}`)
              );
          }}
        >
          <FontAwesome name="phone" size={22} color="blue" />
        </TouchableOpacity>
      </View>
    </Suspense>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 15,
  },
  rowImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  rowDetails: {
    flex: 1,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  phone: {
    fontSize: 14,
    color: 'grey',
  },
  phoneIcon: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'blue',
  },
});

export default UserBox;
