import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import getThemeContext from '../../context/ThemeContext';

const ProfileCard = ({ profileImage, name, location }) => {
  const { theme } = getThemeContext();

  return (
    <View
      style={[
        styles.cardContainer,
        { backgroundColor: theme.colors.surface },
        { borderColor: theme.colors.playPrimary },
      ]}
    >
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{ uri: profileImage }} />
        <View style={[styles.textContainer, { color: theme.colors.text }]}>
          <Text style={[styles.name, { color: theme.colors.text }]}>
            {name}
          </Text>
          <Text style={[styles.location, { color: theme.colors.text }]}>
            {location}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    maxWidth: 500,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  location: {
    fontSize: 16,
  },
  iconContainer: {
    justifyContent: 'center',
  },
});

export default ProfileCard;
