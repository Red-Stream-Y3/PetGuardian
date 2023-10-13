import React from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import getThemeContext from '../../context/ThemeContext';
import { FontAwesome5 } from '@expo/vector-icons';

const Search = ({ navigation, profile, image }) => {
  const { theme } = getThemeContext();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 10,
      marginLeft: 2,
    },
    searchIcon: {
      marginRight: 15,
    },
    searchBar: {
      flex: 1,
      height: 40,
      backgroundColor: theme.colors.surface,
      color: theme.colors.text,
      borderRadius: 10,
      paddingVertical: 0,
      paddingHorizontal: 16,
      elevation: 5,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F2F2F2',
      borderRadius: 10,
      paddingHorizontal: 16,
    },
    userProfileImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 20,
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.inputContainer}>
        <FontAwesome5
          name="search"
          size={17}
          color="grey"
          style={styles.searchIcon}
        />
        <TextInput
          placeholderTextColor={theme.colors.text}
          placeholder="Search"
          style={styles.searchBar}
        />
      </View>
      {profile ? (
        <TouchableOpacity
          onPress={() => navigation.getParent().getParent().openDrawer()}
        >
          >
          <Image
            style={styles.userProfileImage}
            source={{
              uri: image
                ? uri
                : 'https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg',
            }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Search;
