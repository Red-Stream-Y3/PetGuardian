import React, { useContext } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import getThemeContext from '../../context/ThemeContext';

const CardWithProfile = ({
  image,
  profileImage,
  name,
  location,
  icon,
  onPress
}) => {
  const { theme } = getThemeContext();
  return (
    <Animated.View
      style={[
        styles.cardContainer,
        { shadowColor: theme.colors.shadow },
        { backgroundColor: theme.colors.surface }
      ]}
    >
      <Pressable onPress={onPress}>
        <View>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.contentContainer}>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profileImage}
                source={{ uri: profileImage }}
              />
              <View
                style={[styles.textContainer, { color: theme.colors.text }]}
              >
                <Text style={[styles.name, { color: theme.colors.text }]}>
                  {name}
                </Text>
                <Text style={[styles.location, { color: theme.colors.text }]}>
                  {location}
                </Text>
              </View>
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={icon}
                size={40}
                color={theme.colors.icon}
              />
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '97%',
    maxWidth: 500,
    margin: 5,
    elevation: 3,
    borderRadius: 10,
    marginBottom: 15
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  location: {
    fontSize: 14
  },
  iconContainer: {
    justifyContent: 'center'
  }
});

export default CardWithProfile;
